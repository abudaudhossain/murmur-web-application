import { Global, Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { UserModule } from "src/user/user.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

@Global()
@Module({
    imports: [
        JwtModule.register({
            secret: process.env.JWT_SECRET || 'secretKey',
            signOptions: { expiresIn: '30d' }
        }),
        UserModule
    ],
    controllers: [AuthController],
    providers: [AuthService],
    exports: [AuthService],
})

export class AuthModule { }