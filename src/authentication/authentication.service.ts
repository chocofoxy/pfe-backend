import { HttpException, UnauthorizedException } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Client } from 'src/client/entities/client.entity';
import { Role } from 'src/enums';
import { Store } from 'src/store/entities/store.entity';
import { User } from 'src/user/entities/user.entity';
import { UsersService } from 'src/user/users.service';
import * as bcrypt from 'bcrypt';
import { encrypte } from 'src/storage/encryption';

@Injectable()
export class AuthenticationService {
    
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
    ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    let data = await this.usersService.findOne(username);
    const isMatch = await bcrypt.compare(pass, data.user.password);
    console.log(isMatch)
    if (data && data.user && isMatch && data.user.banned == false) {
      if ( data.role == Store.name && data.user.approved == false )
      throw new HttpException('your account isn\'t verified yet',401) ;
      if ( data.role == Role.admin ) {
        data.role = data.user.role
      }
      return data;
    }
    throw new HttpException('you passed wrong informations',401) ;
  }

  async login(user: any, role:any) {
    const payload = { email: user.email, role: role , id: user._id , banned: user.banned };
    return this.jwtService.sign(payload)
  }

  async validate(username: string, password: string): Promise<any> {
    const payload = await this.validateUser(username, password);
    if (!payload.user) {
      throw new UnauthorizedException();
    }      
  
    return { token: this.login(payload.user,payload.role), role: payload.role , user: payload.user }
  }

  async confirmEmail ( info ) {
    const data = await this.usersService.findOne(info.email)
    const match = await bcrypt.compare(info.email,info.code)
    if ( data && match ) {
    await this.usersService.save({ email: info.email , EmailConfirmation: true})
    return 'Account activated' }
    throw new HttpException('Invalid code or email',400)
  }
}
