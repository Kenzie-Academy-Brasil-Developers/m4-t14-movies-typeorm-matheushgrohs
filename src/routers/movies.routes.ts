import { Router } from 'express'
import {createMovieController, deleteMovieController, listMoviesController, updateMoviceController} from '../controllers/movies.controllers'
import ensureDataIsValidMiddleware from '../middlewares/ensureDataIsValid.middleware'
import ensureMovieExistsMiddleware from '../middlewares/ensureMovieExists.middleware'
import {ensureTheMovieNameIsUnique} from '../middlewares/ensureTheMovieNameIsUnique.middleware'

import { movieSchema, movieUpdateSchema } from '../schemas/movies.schemas'


const movieRoutes: Router = Router ()

movieRoutes.post('', ensureDataIsValidMiddleware(movieSchema), ensureTheMovieNameIsUnique,  createMovieController)
movieRoutes.get('', listMoviesController)
movieRoutes.delete('/:id', ensureMovieExistsMiddleware, deleteMovieController)
movieRoutes.patch('/:id', ensureDataIsValidMiddleware(movieUpdateSchema),ensureMovieExistsMiddleware,ensureTheMovieNameIsUnique, updateMoviceController )

export default movieRoutes

