import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/user/users.module';
import { AuthenticationService } from './authentication.service';
import { jwtConstants } from './constant';
import { AuthenticationResolver } from './authentication.resolver';
import { JwtStrategy } from './jwt.strategy';
import { StoreModule } from 'src/store/store.module';
import { ClientModule } from 'src/client/client.module';

@Module({
  imports: [
    forwardRef(() => ClientModule),
    forwardRef(() => UsersModule),
    forwardRef(() => StoreModule),
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '24h' },
    })
  ],
  providers: [AuthenticationService,JwtStrategy,AuthenticationResolver],
  exports: [AuthenticationService, JwtModule],
})
export class AuthenticationModule {}
