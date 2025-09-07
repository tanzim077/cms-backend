import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RegistrationDto } from '@app/common/dtos';
import { LoginDto } from '@app/common/dtos/auth/login.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern({ cmd: 'registration' })
  async registration(@Payload() registrationDto: RegistrationDto) {
    return this.authService.registration(registrationDto);
  }

  @MessagePattern({ cmd: 'login' })
  async login(@Payload() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}
