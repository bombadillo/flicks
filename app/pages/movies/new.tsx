import { Link, useRouter, useMutation, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import createMovie from "app/movies/mutations/createMovie"
import { MovieForm, FORM_ERROR } from "app/movies/components/MovieForm"

const NewMoviePage: BlitzPage = () => {
  const router = useRouter()
  const [createMovieMutation] = useMutation(createMovie)

  return (
    <div>
      <h1>Create New Movie</h1>

      <MovieForm
        submitText="Create Movie"
        // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        // schema={CreateMovie}
        // initialValues={{}}
        onSubmit={async (values) => {
          try {
            const movie = await createMovieMutation(values)
            router.push(`/movies/${movie.id}`)
          } catch (error) {
            console.error(error)
            return {
              [FORM_ERROR]: error.toString(),
            }
          }
        }}
      />

      <p>
        <Link href={Routes.MoviesPage()}>
          <a>Movies</a>
        </Link>
      </p>
    </div>
  )
}

NewMoviePage.authenticate = true
NewMoviePage.getLayout = (page) => <Layout title={"Create New Movie"}>{page}</Layout>

export default NewMoviePage
