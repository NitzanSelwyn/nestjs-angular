import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/Users/users.service';
import { User } from 'src/Entities/user.entity';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) { }

    async register(userData: {
        userName: string;
        userEmail: string;
        address: string;
        password: string;
    }): Promise<User> {
        const existingUser = await this.usersService.findByEmail(userData.userEmail);
        if (existingUser) {
            throw new Error('User already exists');
        }

        const hashedPassword = await bcrypt.hash(userData.password, 10);
        return this.usersService.create({
            ...userData,
            password: hashedPassword,
        });
    }

    async validateUser(email: string, password: string): Promise<User> {
        const user = await this.usersService.findByEmail(email);
        if (user && (await bcrypt.compare(password, user.password))) {
            return user;
        }
        throw new UnauthorizedException('Invalid credentials');
    }

    async login(user: User) {
        const payload = { email: user.userEmail, sub: user.id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
