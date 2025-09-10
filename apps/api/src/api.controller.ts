import { Body, Controller, Get, Patch, Post, Request, UseGuards, } from '@nestjs/common';
import { ApiService } from './api.service';
import { RegistrationDto, UpdateUserDto } from '@app/common/dtos';
import { LoginDto } from '@app/common/dtos/auth/login.dto';
import { AuthGuard } from '@nestjs/passport';

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
  getProfile(@Request() req) {
    return req.user;
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('profile')
  updateProfile(@Request() req, @Body() updateUserDto: UpdateUserDto) {
    return this.apiService.updateProfile(req.user.id, updateUserDto);
  }
}
