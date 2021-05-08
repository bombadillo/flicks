import { resolver } from "blitz"
import { Prisma } from "db"
import { IMovieListResponse } from "../models/response/movieListResponse"

interface GetMoviesInput
  extends Pick<Prisma.QuestionFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(resolver.authorize(), async ({ skip }: GetMoviesInput) => {
  console.log(skip)
  const movieRequest = await fetch(
    `https://api.themoviedb.org/3/movie/now_playing?api_key=d8139585473f518d109a6ab8208f741d&page=${skip}`
  )

  const movieResponseData: IMovieListResponse = await movieRequest.json()

  console.log(movieResponseData)

  const movies = { page: 1 } as IMovieListResponse
  const hasMore = true

  return { movies: movieResponseData.results, hasMore }
})
