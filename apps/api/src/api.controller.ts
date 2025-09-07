import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiService } from './api.service';
import { RegistrationDto } from '@app/common/dtos';
import { LoginDto } from '@app/common/dtos/auth/login.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller({
  version: '1',
  path: 'api',
})
export class ApiController {
  constructor(private readonly apiService: ApiService) {}

  @Post('registration')
  async registration(@Body() registrationDto: RegistrationDto) {
    return await this.apiService.registration(registrationDto);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return await this.apiService.login(loginDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
