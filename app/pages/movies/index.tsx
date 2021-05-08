import { Suspense } from "react"
import { Head, Link, usePaginatedQuery, useRouter, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getMovies from "app/movies/queries/getMovies"

const ITEMS_PER_PAGE = 100

export const MoviesList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 1
  const [{ movies, hasMore }] = usePaginatedQuery(getMovies, {
    skip: page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div>
      <ul>
        {movies?.map((movie) => (
          <li key={movie.id}>
            <Link href={Routes.ShowMoviePage({ movieId: movie.id })}>
              <a>{movie.id}</a>
            </Link>
          </li>
        ))}
      </ul>

      <button disabled={page === 0} onClick={goToPreviousPage}>
        Previous
      </button>
      <button disabled={!hasMore} onClick={goToNextPage}>
        Next
      </button>
    </div>
  )
}

const MoviesPage: BlitzPage = () => {
  return (
    <>
      <Head>
        <title>Movies</title>
      </Head>

      <div>
        <p>
          <Link href={Routes.NewMoviePage()}>
            <a>Create Movie</a>
          </Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <MoviesList />
        </Suspense>
      </div>
    </>
  )
}

MoviesPage.authenticate = true
MoviesPage.getLayout = (page) => <Layout>{page}</Layout>

export default MoviesPage
