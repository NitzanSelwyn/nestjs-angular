import { Controller, Get, UseGuards, Request } from "@nestjs/common";
import { JwtAuthGuard } from "src/Auth/jwt-auth.guard";
import { UsersService } from "./users.service";



@Controller('user')
export class UserController {

    constructor(private usersService: UsersService) { }

    @UseGuards(JwtAuthGuard)
    @Get()
    async getUserData(@Request() req) {
        console.log(req.user);
        const user = await this.usersService.findByEmail(req.user.userEmail);
        if (!user) {
            return { message: 'User not found' };
        }

        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }
}







