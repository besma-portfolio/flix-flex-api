import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { RegisterUserDto } from './dto/register-user.dto';
import { FilterQuery } from 'mongoose';
import { UserDocument } from './user.entity';
import { CustomHttpException } from 'src/utils/exceptions/custom.exception';
import { EXCEPTIONS } from 'src/utils/exceptions/exceptions';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) { }

  async register(registerUserDto: RegisterUserDto) {
    let user = await this.findOne({
      username: registerUserDto.username,
    });
    if (user) {
      throw new CustomHttpException(EXCEPTIONS.EXISTING_USERNAME);
    }
    user = await this.userRepository.create(registerUserDto);
    return user;
  }

  async findOne(query: FilterQuery<UserDocument>) {
    return this.userRepository.findOne(query);
  }
}
