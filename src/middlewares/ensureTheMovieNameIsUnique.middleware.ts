import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Movie } from "../entities";
import { AppError } from "../errors";
import { IMovieReturn } from "../interfaces/movie.interfaces";

const ensureTheMovieNameIsUnique = async (request:Request, response:Response, next: NextFunction) => {

  const movieRepository: Repository<IMovieReturn> = AppDataSource.getRepository(Movie)
    if(request.body.name) {
      const findMovieName = await movieRepository.findOneBy({
        name: request.body.name
      })
      if(findMovieName) throw new AppError('Movie already exists.', 409)
      }
      return next()
    }

export  { ensureTheMovieNameIsUnique }