import { Body, Controller, Delete, Get, Post, Put, Param } from '@nestjs/common';
import {UserService} from './user.service'
import { User as UserEntity } from './user.entity'
import {userCreateDTO, userUpdateDTO} from './user.dto'
import { DeleteResult } from 'typeorm';




@Controller('users')
export class UserController {
  
  constructor(private userService: UserService) {}

  @Get()
  getAll(): Promise<UserEntity[]> {
    return this.userService.findAll()
  }

  @Post()
  add(@Body() userData: userCreateDTO): Promise<UserEntity> {
    return this.userService.create(userData)
  }

  @Delete(':id')
  deleteTransaction(@Param('id') id: number): Promise<DeleteResult> {
    return this.userService.delete({
      where:{
        id: id
      }
    })
  }

  @Put(':id')
  updateransaction(@Param('id') id: number, @Body() editUserDto: userUpdateDTO): Promise<UserEntity> {
    return this.userService.update({
      where: {
        id: id
      }
    }, editUserDto)
  }

  @Get(':id')
  async getById(@Param('id') id: number): Promise<UserEntity> {

    console.log('sdsd', await this.userService.findOne({
      where: {
        id: 100
      }
    }))
    return this.userService.findOne({
      where: {
        id: id
      }
    })
  }
}
