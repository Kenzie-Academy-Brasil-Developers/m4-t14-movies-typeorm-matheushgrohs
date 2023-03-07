import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Movie } from "../../entities";
import { IMoviesReturn, IMoviesReturnAll } from "../../interfaces/movie.interfaces";
import { allMoviesReturnSchema, returnMultipleMovieSchema } from "../../schemas/movies.schemas";

const listMoviesService = async (page:any, perPage:any, order:any, sort:any): Promise<IMoviesReturnAll> => {
  
  const movieRepository: Repository<Movie> = AppDataSource.getRepository(Movie)

  if(!sort) order = "ASC"
  page = parseInt(page) > 0 ? parseInt(page) : 1,
  perPage = parseInt(perPage) > 0 && parseInt(perPage) <= 5 ? parseInt(perPage) : 5
  sort = ["price", "daration", "id"].includes(sort) ? sort : "id" 
  order = ["ASC", "DESC"].includes(order) ? order : "ASC"

  const findMovies = await movieRepository.find({
   take:perPage,
   skip:perPage*(page-1),
   order:
   {
    [sort]:order
   }
  })

  const moviesCounter = await movieRepository.count()
    
  const baseUrl: string = `http://localhost:3000/movies`

  const allMoviesReturn: IMoviesReturnAll = {
    prevPage: page > 1 ? `${baseUrl}?page=${page - 1}&perPage=${perPage}`:null,
    nextPage: moviesCounter > perPage * page ? `${baseUrl}?page=${page+1}&perPage=${perPage}` : null,
    count: moviesCounter,
    data: findMovies
  }

  return allMoviesReturnSchema.parse(allMoviesReturn)
 
}

export default listMoviesService