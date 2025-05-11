import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class RegisterUserDto {
  @ApiProperty({ type: 'string' })
  @IsString({ message: 'username must be a string' })
  @IsNotEmpty({ message: 'username is required' })
  readonly username: string;

  @ApiProperty({ type: 'string', default: faker.person.firstName() })
  @IsString({ message: 'firstName must be a string' })
  @IsNotEmpty({ message: 'firstName is required' })
  readonly firstName: string;

  @ApiProperty({ type: 'string', default: faker.person.lastName() })
  @IsString({ message: 'lastName must be a string' })
  @IsNotEmpty({ message: 'lastName is required' })
  readonly lastName: string;

  @ApiProperty({ type: 'string' })
  @IsString({ message: 'password must be string' })
  @IsNotEmpty({ message: 'password is required' })
  readonly password: string;
}
