import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './dto/login.dto';
import { compare } from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt.strategy';
import { CustomHttpException } from 'src/utils/exceptions/custom.exception';
import { EXCEPTIONS } from 'src/utils/exceptions/exceptions';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private configService: ConfigService,
    private jwtService: JwtService,
  ) { }

  _createNewAccessToken(payload: JwtPayload): string {
    const accessTokenMinutes: number =
      this.configService.get<number>('ACCESS_TOKEN_MINUTES') ?? 30;
    return this.jwtService.sign(payload, {
      algorithm: 'HS256',
      expiresIn: `${accessTokenMinutes}m`,
    });
  }

  async login(loginDto: LoginDto) {
    const { username, password } = loginDto;

    const user = await this.userService.findOne({ username });
    if (!user) {
      throw new CustomHttpException(
        EXCEPTIONS.BAD_REQUEST,
        'Wrong username or password',
      );
    }
    const passwordMatches = await compare(password, user?.password ?? '');
    if (!passwordMatches) {
      throw new CustomHttpException(
        EXCEPTIONS.BAD_REQUEST,
        'Wrong username or password',
      );
    }

    // Generate JWT token
    const payload: JwtPayload = {
      id: user.id as string,
      username: user.username,
    };

    const token = this._createNewAccessToken(payload);

    return {
      token,
      user: {
        id: user.id,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    };
  }
}
