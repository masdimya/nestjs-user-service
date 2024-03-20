import { UserService } from './user.service';
import { Test, TestingModule } from '@nestjs/testing';
import { User } from './user.entity'
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

describe('UserService', () => {
  let service: UserService;
  let repository: Repository<User>;

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
    repository = module.get<Repository<User>>(getRepositoryToken(User));
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

    it('should create a user', async () => {
      const mockUser = new User();
      mockUser.name = 'John Doe'
      mockUser.email = 'john@example.com'
      mockUser.password = 'password123'
      mockUser.address = '123 Street, City'
      mockUser.phone = '1234567890'

      const userData = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
        address: '123 Street, City',
        phone: '1234567890',
      };

      jest.spyOn(repository, 'save').mockResolvedValueOnce(mockUser);

      const result = await service.create(userData);

      expect(result).toEqual(mockUser);
      expect(result).toHaveProperty('name', userData.name);
      expect(result).toHaveProperty('email', userData.email);

    })


  });
});