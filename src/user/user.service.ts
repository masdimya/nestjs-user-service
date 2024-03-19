import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User as UserEntity } from './user.entity'

import {userCreateDTO, userCreateValidation } from './user.dto'

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  create(data: userCreateDTO): Promise<UserEntity> {
    userCreateValidation.parse(data)
    return this.userRepository.save(data)
  }

  findOne(id: number): Promise<UserEntity>{
    return UserEntity.findOne({
      where: {
        id: id,
      },
    })
  }


  // findAll(): Promise<TransactionEntity[]>{
  //   return TransactionEntity.find({
  //     select: [
  //       'id',
  //       'trans_name',
  //       'trans_date',
  //       'trans_amount'
  //     ],
  //     order: {
  //       trans_date: "ASC",
  //       created_at: "ASC",
  //     },
  //   })
  // }

  
  // async update(id: number, trans: Transaction): Promise<string>{
  //   const transaction = await TransactionEntity.findOne({
  //     where: {
  //       id: id,
  //     }
  //   })


  //   if(transaction){
  //     transaction.trans_name = trans.trans_name
  //     transaction.trans_date = trans.trans_date 
  //     transaction.trans_amount = trans.trans_amount
  
  //     await transaction.save()

  //   }


  //   return 'success update transaction'
  // }
  

  // async delete(id: number): Promise<string>{
  //   const transaction = await TransactionEntity.findOne({
  //     where: {
  //       id: id,
  //     }
  //   })

  //   transaction.deleted_at = new Date()
  //   await transaction.save()

  //   return 'success delete transaction'
  // }


}
