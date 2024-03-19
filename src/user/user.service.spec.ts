import { UserService } from './user.service';
import { Test, TestingModule } from '@nestjs/testing';
import { User } from './user.entity'
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  describe('create', () => {

    it('should throw error validation', async () => {
      const data = {
        name: 'name',
        email: 'email',
        password: 'password',
        address: 'address',
        phone: '0890890089',
      }

      const validate = () => {
        return service.create(data)
      }
      expect(validate).toThrow();
    });
  });
});