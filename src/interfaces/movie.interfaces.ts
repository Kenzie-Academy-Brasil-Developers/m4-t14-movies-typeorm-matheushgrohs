import { movieSchema, returnMovieSchema, returnMultipleMovieSchema } from '../schemas/movies.schemas'
import { z } from 'zod'
import { DeepPartial, Repository } from 'typeorm'
import { Movie } from '../entities'

type IMovie = z.infer<typeof movieSchema>
type IMovieReturn = z.infer<typeof returnMovieSchema>
type IMoviesReturn = z.infer<typeof returnMultipleMovieSchema>
type IMovieUpdate = DeepPartial<IMovie>
type iMovieRepo = Repository<Movie>;


export { IMovie, IMovieReturn, IMoviesReturn, IMovieUpdate, iMovieRepo }