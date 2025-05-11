import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    description: 'Username',
    required: true,
    default: 'username',
  })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    description: 'Password',
    required: true,
    default: 'password',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
