import { HttpException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { create } from 'domain';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma : PrismaService){}

  createUser(data : Prisma.UserCreateInput)
  {
    return this.prisma.user.create({
      data:{
      ...data, 
      userSetting:{
        create:{
          smsEnabled : true,
          notificationOn:false
        },
      },
    }
  });
  }

  getUsers(){
    return this.prisma.user.findMany({ include : {userSetting : true} })
  }

  getUserById(id:number){
    return this.prisma.user.findUnique({
      where:{id:id}, include:{userSetting:{
        select:{
          notificationOn:true,
          smsEnabled:true
        }
      }, posts:true, groupPosts : true}
    })
  }

  async updateUser(id:number, data : Prisma.UserUpdateInput)
  {
    const findUser = await this.getUserById(id)
    if(!findUser) throw new HttpException("User not found",404)
    
      if(data.username){
      const findUser = await this.prisma.user.findUnique({where:{username : data.username as string}})
      
      if(findUser) throw new HttpException("Username already taken",500)
    }
    return this.prisma.user.update({where : {id : id}, data : data})
  }

  async delete(id : number){
    const user = await this.getUserById(id)
    if(!user) throw new HttpException("User not found",404)
    
    return this.prisma.user.delete({where:{id}})
  }

  async updateUserSettings(id:number, data : Prisma.UserSettingUpdateInput ){
    const findUser = await this.getUserById(id)
    if(!findUser) throw new HttpException("User not fount",404)
    if(!findUser.userSetting) throw new HttpException("Bad Request",400)
    return this.prisma.userSetting.update({where:{userId : id} , data: data })
  }
}
