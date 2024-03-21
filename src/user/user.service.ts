import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOneOptions, FindManyOptions, DeleteResult } from 'typeorm';

import { User as UserEntity } from './user.entity'

import {userCreateDTO, userUpdateDTO, userUpdateValidation, userCreateValidation } from './user.dto'


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

  findOne(options: FindOneOptions<UserEntity>): Promise<UserEntity>{
    return this.userRepository.findOne(options)
  }


  findAll(options?: FindManyOptions<UserEntity>): Promise<UserEntity[]>{
    return this.userRepository.find(options)
  }

  
  async update(options: FindOneOptions<UserEntity>, data: userUpdateDTO): Promise<UserEntity>{
    const userToUpdate = await this.findOne(options)
    
    if(!userToUpdate){
      throw 'User Not Found'
    }

    userUpdateValidation.parse(data)


    return this.userRepository.save({
      ...userToUpdate,
      ...data
    })
  }
  

  async delete(options: FindOneOptions<UserEntity>): Promise<DeleteResult>{
    const userToDelete = await this.findOne(options)
    
    if(!userToDelete){
      throw 'User Not Found'
    }

    return this.userRepository.softDelete(userToDelete.id);
  }

}
