import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ClientService } from 'src/client/client.service';
import { UpdateClientInput } from 'src/client/dto/update-client.input';
import { Client } from 'src/client/entities/client.entity';
import { Role } from 'src/enums';
import { NotificationService } from 'src/notification/notification.service';
import { emailtemplate, encrypte } from 'src/storage/encryption';
import { UpdateStoreInput } from 'src/store/dto/update-store.input';
import { Store } from 'src/store/entities/store.entity';
import { StoreService } from 'src/store/store.service';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { Admin } from './entities/admin.entity';
import { User } from './entities/user.entity';
const nodemailer = require("nodemailer");

@Injectable()
export class UsersService {
  
  testAccount
  transporter
  
  constructor(
    @InjectModel(Admin.name) private AdminModel: Model<Admin>,
    private clientService: ClientService,
    private storeService: StoreService,
    private notificationService: NotificationService
  ) {
    
    this.init()
  }

  async init() {
    const admins = await this.AdminModel.countDocuments() == 0
    if (admins) {
      await this.create({ email:"tynassit@gmail.com" , password: "tynassit123456789" } as CreateUserInput)
    }
    this.transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, 
      auth: {
        user: 'tunisia.blackhat@gmail.com',
        pass: '22041998007' 
      },
    });
  }
  
  async create(createUserInput) {
    if ( await this.findOne(createUserInput.email) == null ) {
      createUserInput.password = await encrypte(createUserInput.password)
    return await new this.AdminModel({...createUserInput , notification: (await this.notificationService.create())._id }).save()
    } else
    throw new HttpException('an other account is using this mail',400)
  }

  async findAll(): Promise<User[]> {
    return await this.AdminModel.find()
  }

  async findOne(email: string): Promise<any> {
    const client = await this.clientService.findOne(email)
    const store = await this.storeService.findOne(email)
    const admin = await this.AdminModel.findOne({ email: email}).populate(['conversations'])
    
    if (store != null )
    return { user: store, role: Store.name } 
    else if (client != null )
    return { user: client, role: Client.name }
    else if (admin != null  )
    return { user: admin, role: Admin.name }
    else
    return null
  }

  async save(userdata): Promise<User> {
    const { role , user} = await this.findOne(userdata.email)
    switch ( role ) {
      case 'Client' : { return await this.clientService.update(user._id,userdata) } 
      case 'Store'  : { return await this.storeService.update(user._id,userdata) } 
      case 'Admin'  : { return await this.update(user.email,userdata) } 
    }
  }

  async banToggel( email: string ): Promise<User> {
    let { role , user} = await this.findOne(email)
    user.banned = !user.banned
    switch ( role ) {
      case 'Client' : { return await this.clientService.update(user._id ,user) } 
      case 'Store'  : { return await this.storeService.update(user._id, user) } 
      case 'Admin'  : { return await this.update(user.email,user) } 
    }
  }

  async getMods() {
    return await this.AdminModel.find({ role: Role.moderator })
  }
  
  async update(email: string, updateUserInput): Promise<User> {
    return await this.AdminModel.findOneAndUpdate({ email: email },updateUserInput)
  }

  async remove(email: string): Promise<User> {
    return await this.AdminModel.findOneAndRemove({ email: email })
  }

  async sendEmail( email , code ) {
    console.log('mail sent')
    await this.transporter.sendMail({
      from: 'tynassit@gmail.com' , // sender address
      to: email , // list of receivers
      subject: " Tynass home confirmation ", // Subject line
      text: "Hello world?", // plain text body
      html: emailtemplate(code) // html body
    });
  }

}


