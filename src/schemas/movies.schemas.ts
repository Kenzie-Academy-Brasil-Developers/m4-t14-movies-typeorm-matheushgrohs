import { z } from 'zod'

const movieSchema = z.object({
  name: z.string().min(3).max(50),
  description: z.string().nullish(),
  duration: z.number().min(1, {message: 'Number must be greater than 0'}),
  price: z.number().min(1).int({message: 'Expected integer, received float'})

})

const movieUpdateSchema = movieSchema.partial()

const returnMovieSchema = movieSchema.extend({
  id: z.number()

})

const returnMultipleMovieSchema = returnMovieSchema.array()

const returnMovies = z.array(returnMovieSchema)

const allMoviesReturnSchema = z.object({
  prevPage: z.string().nullable(),
  nextPage: z.string().nullable(),
  count: z.number(),
  data: returnMovies
})


export { movieSchema, returnMovieSchema, returnMultipleMovieSchema, movieUpdateSchema, returnMovies, allMoviesReturnSchema }