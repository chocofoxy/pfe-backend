import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/user/users.module';
import { AuthenticationService } from './authentication.service';
import { jwtConstants } from './constant';
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
  providers: [AuthenticationService,JwtStrategy,AuthenticationResolver],
  exports: [AuthenticationService, JwtModule],
})
export class AuthenticationModule {}
