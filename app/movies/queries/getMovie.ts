import { resolver } from "blitz"
import { IMovieListResponseItem } from "../models/response/movieListResponseItem"
import * as z from "zod"

const GetMovie = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.number().optional().refine(Boolean, "Required"),
})

export default resolver.pipe(
  resolver.zod(GetMovie),
  resolver.authorize(),
  async ({ id }: IMovieListResponseItem) => {
    const movieRequest = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=d8139585473f518d109a6ab8208f741d`
    )

    const movieResponseData: IMovieListResponseItem = await movieRequest.json()

    return movieResponseData
  }
)
