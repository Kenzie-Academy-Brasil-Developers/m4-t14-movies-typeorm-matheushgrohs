import { Request, Response } from 'express'
import { IMovie } from '../interfaces/movie.interfaces'
import createMovieService from '../services/movies/createMovie.service'
import deleteMovieService from '../services/movies/deleteMovie.service'
import listMoviesService from '../services/movies/listMovies.service'
import updateMovieService from '../services/movies/updateMovie.service'
import {IMoviesReturnAll} from '../interfaces/movie.interfaces'

const createMovieController = async (request: Request, response:Response) => {

  const movieData: IMovie = request.body

  const newMovie = await createMovieService(movieData)

  return response.status(201).json(newMovie)

}

const listMoviesController = async (request:Request, response:Response) => {
  const {page, perPage, sort} = request.query

  const order = (request.query.order)?.toString().toUpperCase

  const allMovies: IMoviesReturnAll = await listMoviesService(page, perPage, order, sort)

  return response.status(200).json(allMovies)

}

const deleteMovieController = async (request:Request, response:Response) => {
  
  await deleteMovieService(parseInt(request.params.id))

  return response.status(204).send()
}


const updateMoviceController = async (request:Request, response:Response) => {
  
  const movieData = request.body
  
  const idMovie = parseInt(request.params.id)

  const updatedMovie = await updateMovieService(movieData, idMovie)

  return response.json(updatedMovie)
}


export  { createMovieController, listMoviesController, deleteMovieController, updateMoviceController}