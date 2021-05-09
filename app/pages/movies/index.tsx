import { Suspense, useEffect, useState } from "react"
import { Head, Link, usePaginatedQuery, useRouter, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getMovies from "app/movies/queries/getMovies"
import { Box, Center, Heading, Stack, Text } from "@chakra-ui/layout"
import { Button } from "@chakra-ui/button"
import { Image } from "@chakra-ui/image"

const ITEMS_PER_PAGE = 100

export const MoviesList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 1
  const [{ movies, hasMore }] = usePaginatedQuery(getMovies, {
    skip: page,
    take: ITEMS_PER_PAGE,
  })

  const [showDescriptionForMovie, setShowDescriptionForMovie] = useState<number[]>([])

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  const handleShowDescriptionClick = (movieId: number) => {
    if (showDescriptionForMovie.includes(movieId)) {
      setShowDescriptionForMovie(showDescriptionForMovie.filter((x) => x !== movieId))
    } else {
      setShowDescriptionForMovie([...showDescriptionForMovie, movieId])
    }
  }

  return (
    <div>
      <Stack>
        {movies?.map((movie) => (
          <Box p={5} shadow="md" borderWidth="1px" flex="1" borderRadius="md" key={movie.id}>
            <Center>
              <Heading mb={4} fontSize="xl">
                {movie.original_title}
              </Heading>
            </Center>
            <Center>
              <Image
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt={movie.original_title}
                borderRadius={"10px"}
              />
            </Center>
            <Text mt={4} hidden={!showDescriptionForMovie.includes(movie.id)}>
              {movie.overview}
            </Text>
            <Center>
              <Button colorScheme="teal" size="sm" mt={4} mr={4}>
                <Link href={Routes.ShowMoviePage({ movieId: movie.id })}>View</Link>
              </Button>
              <Button
                colorScheme="gray"
                size="sm"
                mt={4}
                onClick={() => handleShowDescriptionClick(movie.id)}
              >
                Show description
              </Button>
            </Center>
          </Box>
        ))}
      </Stack>

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
