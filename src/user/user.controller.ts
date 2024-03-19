import { Body, Controller, Delete, Get, Post, Put, Param } from '@nestjs/common';
import {UserService} from './user.service'
import { User as UserEntity } from './user.entity'


@Controller('users')
export class UserController {
  
  constructor(private userService: UserService) {}

  // @Get()
  // getTransaction(): Promise<TransactionEntity[]> {
  //   return this.transactionService.findAll()
  // }

  @Post()
  add(@Body() userData): Promise<UserEntity> {
    return this.userService.create(userData)
  }

  // @Delete(':id')
  // deleteTransaction(@Param('id') id: number): Promise<String> {
  //   return this.transactionService.delete(id)
  // }

  // @Put(':id')
  // updateransaction(@Param('id') id: number, @Body() editTransactionDto: EditTransactionDto): Promise<String> {
  //   return this.transactionService.update(id, editTransactionDto)
  // }

  // @Get(':id')
  // getTransactionById(@Param('id') id: number): Promise<TransactionEntity> {
  //   return this.transactionService.findOne(id)
  // }
}
