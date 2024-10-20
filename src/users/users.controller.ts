import { Body, Controller, Delete, Get, HttpException, Param, ParseIntPipe, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateUserSettingDto } from './dto/update-user-setting.dto';

@Controller('users')
export class UsersController {
  constructor(private userService : UsersService){}

  @Post()
  @UsePipes(ValidationPipe)
  createUser(@Body() createUserDto : CreateUserDto){
    return this.userService.createUser(createUserDto)
  }

  @Get()
  getAllUsers(){
    return this.userService.getUsers()
  }

  @Get(":id")
  async getById(@Param("id", ParseIntPipe) id :number){
    const user = await this.userService.getUserById(id)
    if(!user) throw new HttpException("User not found!",404)
    return user
  }

  @Patch(":id")
  @UsePipes(ValidationPipe)
  updateUser(@Param("id", ParseIntPipe) id:number, @Body() updateUser : UpdateUserDto){
    return this.userService.updateUser(id,updateUser)
  }

  @Delete(":id")
  delete(@Param("id", ParseIntPipe) id : number){
    return this.userService.delete(id)
  }

  // Update user-setting by userId
  @Patch(":id/settings")
  @UsePipes(ValidationPipe)
  updateSettingById(@Param("id", ParseIntPipe) id:number, @Body() userSettingDto : UpdateUserSettingDto) 
  {
    return this.userService.updateUserSettings(id,userSettingDto)
  }
}
