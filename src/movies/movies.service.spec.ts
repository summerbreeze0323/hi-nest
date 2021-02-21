import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a movie', () => {
      const beforeCreate = service.getAll().length;
      service.create({
        title: 'test movie',
        genres: ['test genres'],
        year: 2021
      })
      const afterCreate = service.getAll().length;
      console.log(beforeCreate, afterCreate)
      expect(afterCreate).toBeGreaterThan(beforeCreate);
    })
  })

  describe('getAll', () => {
    it('should return an array', () => {
      const result = service.getAll();
      expect(result).toBeInstanceOf(Array);
    })
  });

  describe('getOne', () => {
    it('should return a movie', () => {
      service.create({
        title: 'test movie',
        genres: ['test genres'],
        year: 2021
      });

      const movie = service.getOne(1);
      expect(movie).toBeDefined();
      expect(movie.id).toEqual(1);
    })

    it('should throw 404 error', () => {
      try {
        service.getOne(999);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toEqual('Movie with ID 999 not found.');
      }
    });
  });

  describe('deleteOne', () => {
    it('delete a movie', () => {
      service.create({
        title: 'test movie',
        genres: ['test genres'],
        year: 2021
      });
      const beforeDelete = service.getAll().length;

      service.deleteOne(1);
      const afterDelete = service.getAll().length;
      expect(afterDelete).toBeLessThan(beforeDelete);
    })

    it('should return a 404', () => {
      try {
        service.deleteOne(999);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    })
  })

  describe('update', () => {
    it('should update a movie', () => {
      service.create({
        title: 'test movie',
        genres: ['test genres'],
        year: 2021
      });
      service.update(1, { title: 'Updated test' });
      const movie = service.getOne(1);
      expect(movie.title).toEqual('Updated test');
    })

    it('should throw a NotFoundException', () => {
      try {
        service.update(999, {});
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    })
  })
  
});
