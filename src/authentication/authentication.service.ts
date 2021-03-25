import { HttpException, UnauthorizedException } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Client } from 'src/client/entities/client.entity';
import { Store } from 'src/store/entities/store.entity';
import { User } from 'src/user/entities/user.entity';
import { UsersService } from 'src/user/users.service';

@Injectable()
export class AuthenticationService {
    
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
    ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const data = await this.usersService.findOne(username);
    if (data && data.user && data.user.password === pass) {
      if ( data.role == Store.name && data.user.approved == false )
      throw new HttpException('your account isn\'t verified yet',401) ;
      return data;
    }
    throw new HttpException('you passed wrong informations',401) ;
  }

  async login(user: any, role:any) {
    const payload = { email: user.email, role: role , id: user._id };
    return this.jwtService.sign(payload)
  }

  async validate(username: string, password: string): Promise<any> {
    const payload = await this.validateUser(username, password);
    if (!payload.user) {
      throw new UnauthorizedException();
    }      
  
    return { token: this.login(payload.user,payload.role), role: payload.role , user: payload.user }
  }
}
