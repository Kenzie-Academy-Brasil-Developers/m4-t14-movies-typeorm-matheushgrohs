import { Repository } from "typeorm"
import { AppDataSource } from "../../data-source"
import { Movie } from "../../entities"
import { IMovieReturn, IMovieUpdate } from "../../interfaces/movie.interfaces"
import { returnMovieSchema } from "../../schemas/movies.schemas"

const updateMovieService = async(movieData: IMovieUpdate, idMovie: number): Promise<IMovieReturn> => {

  const movieRepository: Repository<Movie> = AppDataSource.getRepository(Movie)

  const oldMovieData = await movieRepository.findOneBy({
    id: idMovie
  })
  

  const movie = movieRepository.create({
    ...oldMovieData,
    ...movieData
  })

  await movieRepository.save(movie)

  const updatedMovie = returnMovieSchema.parse(movie)

  return updatedMovie

}

export default updateMovieService