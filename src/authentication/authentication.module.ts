import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { AuthenticationService } from './authentication.service';
import { jwtConstants } from './constant';
import { LocalStrategy } from './local.strategy';
import { AuthenticationResolver } from './authentication.resolver';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    })
  ],
  providers: [AuthenticationService,LocalStrategy,JwtStrategy,AuthenticationResolver],
  exports: [AuthenticationService, JwtModule],
})
export class AuthenticationModule {}
