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

  describe('getAll', ()=> {

    it('should return an array', () => {
      const result = service.getAll();
      expect(result).toBeInstanceOf(Array);
    });
  });

  describe('getOne', ()=> {
    it('should return a movie', ()=> {
      service.create({
        title: 'testmovie',
        year: 2020,
        genres: ['test']
      });
      const movie = service.getOne(1);
      expect(movie).toBeDefined();
      expect(movie.id).toEqual(1);
    });
    it('should throw 404 error', ()=> {
      try{
        service.getOne(999);
      }catch(e){
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual('Movie with ID 999 not found.');
      }
    })
  });
  describe('deleteOne', ()=> {
    it('deletes a service', ()=> {
      service.create({
        title: 'testmovie',
        year: 2020,
        genres: ['test']
      });
      const allMovies = service.getAll().length;
      service.deleteOne(1);
      const afterDelete = service.getAll().length;

      expect(afterDelete).toBeLessThan(allMovies);
    })
    it('should throw 404 error', ()=> {
      try{
        service.deleteOne(999);
      }catch(e){
        expect(e).toBeInstanceOf(NotFoundException);
      }
    })
  })

  describe('create', ()=> {
    it('sholud create a moive', ()=> {
      const beforeCreate = service.getAll().length;
      service.create({
        title: 'testmovie',
        year: 2020,
        genres: ['test']
      });
      const afterCreate = service.getAll().length;
      console.log(beforeCreate, afterCreate);
      expect(beforeCreate).toBeLessThan(afterCreate);
    })
  })

  describe('update', ()=> {
    it('should update movie', ()=> {
      service.create({
        title: 'testmovie',
        year: 2020,
        genres: ['test']
      });
      service.update(1, {title: "updated test"});
      const movie = service.getOne(1);
      expect(movie.title).toEqual('updated test');
    })
    it('should throw a Notfoundexception', ()=> {
      try{
        service.deleteOne(999);
      }catch(e){
        expect(e).toBeInstanceOf(NotFoundException);
      }
    })
  })
});
