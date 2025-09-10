import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiService } from './api.service';
import { RegistrationDto, UpdateUserDto, UserPayload } from '@app/common/dtos';
import { LoginDto } from '@app/common/dtos/auth/login.dto';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from '@app/common/decorators'; // Import CurrentUser decorator

@Controller({
  version: '1',
  path: 'api',
})
export class ApiController {
  constructor(private readonly apiService: ApiService) {}

  @Post('registration')
  registration(@Body() registrationDto: RegistrationDto) {
    return this.apiService.registration(registrationDto);
  }

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.apiService.login(loginDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  getProfile(@CurrentUser() user: UserPayload) { // Use CurrentUser decorator
    return user;
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('profile')
  updateProfile(@CurrentUser() user: UserPayload, @Body() updateUserDto: UpdateUserDto) { // Use CurrentUser decorator
    return this.apiService.updateProfile(user.id, updateUserDto);
  }
}
