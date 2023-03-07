import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Movie } from "../../entities";
import { IMoviesReturn } from "../../interfaces/movie.interfaces";
import { returnMultipleMovieSchema } from "../../schemas/movies.schemas";

const listMoviesService = async (): Promise<IMoviesReturn> => {
  
  const movieRepository: Repository<Movie> = AppDataSource.getRepository(Movie)

  const findMovies = await movieRepository.find({
    take: 5, 
    skip: 1,
    order:{
      name: 'ASC'
    }
  })
    
  const movies = returnMultipleMovieSchema.parse(findMovies)

  return movies
}

export default listMoviesService