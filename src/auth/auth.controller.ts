import { Body, Controller, Post } from '@nestjs/common';
import { Public } from './public.decorator';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private authSertvice: AuthService) { }

  @Post('login')
  @ApiOperation({
    summary: 'Login a user',
    description: 'Login a user by providing credentials: username and password',
  })
  @ApiBody({
    description: 'Credentials data',
    type: LoginDto,
    required: true,
  })
  @Public()
  login(@Body() loginDto: LoginDto) {
    return this.authSertvice.login(loginDto);
  }
}
