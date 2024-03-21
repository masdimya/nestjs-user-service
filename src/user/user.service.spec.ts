import { UserService } from './user.service';
import { Test, TestingModule } from '@nestjs/testing';
import { User } from './user.entity'
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';

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

  describe('findOne', () => {

    it('should get data ', async () => {
      const mockResult = new User();
      mockResult.id = 1
      mockResult.name = 'John Doe'
      mockResult.email = 'john@example.com'
      mockResult.address = '123 Street, City'
      mockResult.phone = '1234567890'
      mockResult.active = true


      jest.spyOn(repository, 'findOne').mockResolvedValueOnce(mockResult);

      const result = await service.findOne({
        where: {
          id: 1
        }
      })
     
      expect(result).toEqual(mockResult);
    });

    it('should not found', async () => {
      const mockResult = null;

      jest.spyOn(repository, 'findOne').mockResolvedValueOnce(mockResult);

      const result = await service.findOne({
        where: {
          id: 100
        }
      })
     
      expect(result).toBeNull();
    });

  });

  describe('findAll', () => {

    it('should get data ', async () => {
      const mockResult = [new User()];
      mockResult[0].id = 1
      mockResult[0].name = 'John Doe'
      mockResult[0].email = 'john@example.com'
      mockResult[0].address = '123 Street, City'
      mockResult[0].phone = '1234567890'
      mockResult[0].active = true


      jest.spyOn(repository, 'find').mockResolvedValueOnce(mockResult);

      const result = await service.findAll()
     
      expect(result).toEqual(mockResult);
      expect(result).toHaveLength(1);

    });

    it('should not found', async () => {
      const mockResult = [];

      jest.spyOn(repository, 'find').mockResolvedValueOnce(mockResult);

      const result = await service.findAll({
        where: {
          id: 100
        }
      })
     
      expect(result).toHaveLength(0);
    });
    
  });

  describe('update', () => {

    it('should updated data ', async () => {
      const mockUser = new User();
      mockUser.id = 2
      mockUser.name = 'John Doe'
      mockUser.email = 'john@example.com'
      mockUser.password = 'password123'
      mockUser.address = '123 Street, City'
      mockUser.phone = '1234567890'

      const userData = {
        name: 'John Doe',
        address: '123 Street, City',
        phone: '1234567890',
      };

      jest.spyOn(service, 'findOne').mockResolvedValueOnce(mockUser);
      jest.spyOn(repository, 'save').mockResolvedValueOnce(mockUser);

      const result = await service.update({
        where: {
          id:2
        }
      },userData);

      expect(result).toEqual(mockUser);
      expect(result).toHaveProperty('name', userData.name);

    });

    it('should throw not found ', async () => {
      const mockFindOne = null

      const userData = {
        name: 'John Doe',
        address: '123 Street, City',
        phone: '1234567890',
      };

      jest.spyOn(service, 'findOne').mockResolvedValueOnce(mockFindOne);

      const result = service.update({
        where: {
          id:2
        }
      },userData);

      expect(result).rejects.toThrow('User Not Found');

    });

  });

  describe('delete', () => {

    it('should deleted data ', async () => {
      const mockResultFindOne = new User();
      mockResultFindOne.id = 1
      mockResultFindOne.name = 'John Doe'
      mockResultFindOne.email = 'john@example.com'
      mockResultFindOne.address = '123 Street, City'
      mockResultFindOne.phone = '1234567890'
      mockResultFindOne.active = true

      const mockResultDelete: UpdateResult = {
        generatedMaps: [],
        raw: [],
        affected: 1
      }


      jest.spyOn(service, 'findOne').mockResolvedValueOnce(mockResultFindOne);
      jest.spyOn(repository, 'softDelete').mockResolvedValueOnce(mockResultDelete);

      const result = await service.delete({
        where: {
          id:2
        }
      });

      expect(result).toEqual(mockResultDelete);

    });

    it('should throw not found ', async () => {
      const mockResultFindOne = null

      jest.spyOn(service, 'findOne').mockResolvedValueOnce(mockResultFindOne);

      const result = service.delete({
        where: {
          id:2
        }
      });

      expect(result).rejects.toThrow('User Not Found');

    });

  });
});