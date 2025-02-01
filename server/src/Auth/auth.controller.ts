import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('register')
    async register(
        @Body() body: { userName: string; userEmail: string; address: string; password: string },
    ) {
        const user = await this.authService.register(body);
        return { message: 'Registration successful', userId: user.id };
    }

    @Post('login')
    async login(
        @Body() body: { userEmail: string; password: string },
    ) {
        const user = await this.authService.validateUser(body.userEmail, body.password);
        return this.authService.login(user);
    }
}
