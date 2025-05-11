import { Controller, Post, Body, Request, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { Public } from 'src/auth/public.decorator';
import { RegisterUserDto } from './dto/register-user.dto';

@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(private userService: UserService) { }

  @Post('register')
  @ApiOperation({
    summary: 'Register a new user',
  })
  @ApiBody({
    description: 'Registration data',
    type: RegisterUserDto,
    required: true,
  })
  @Public()
  register(@Body() registerUserDto: RegisterUserDto) {
    return this.userService.register(registerUserDto);
  }

  @Get('me')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Get current user',
  })
  me(@Request() { user: { id } }: { user: { id: string } }) {
    return this.userService.findOne({ _id: id });
  }
}
