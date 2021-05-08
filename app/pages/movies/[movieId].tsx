import { Suspense } from "react"
import { Head, Link, useQuery, useParam, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getMovie from "app/movies/queries/getMovie"

export const Movie = () => {
  const movieId = useParam("movieId", "number")
  const [movie] = useQuery(getMovie, { id: movieId })

  return (
    <>
      <Head>
        <title>Movie {movie.id}</title>
      </Head>

      <div>
        <h1>Movie {movie.id}</h1>
        <pre>{JSON.stringify(movie, null, 2)}</pre>
      </div>
    </>
  )
}

const ShowMoviePage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href={Routes.MoviesPage()}>
          <a>Movies</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Movie />
      </Suspense>
    </div>
  )
}

ShowMoviePage.authenticate = true
ShowMoviePage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowMoviePage
