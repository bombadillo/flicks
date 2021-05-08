import { IMovieListResponseItem } from "./movieListResponseItem"

export interface IMovieListResponse {
  page: number
  results: IMovieListResponseItem[]
}
