import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { AuthenticationService } from './authentication.service';
import { jwtConstants } from './constant';
import { LocalStrategy } from './local.strategy';
import { AuthenticationResolver } from './authentication/authentication.resolver';
import { AuthenticationResolver } from './authentication.resolver';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    })
  ],
  providers: [AuthenticationService,LocalStrategy, AuthenticationResolver],
  exports: [AuthenticationService, JwtModule],
})
export class AuthenticationModule {}
