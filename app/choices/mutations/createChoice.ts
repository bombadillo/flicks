import { resolver } from "blitz"
import db from "db"
import * as z from "zod"

const CreateChoice = z
  .object({
    text: z.string(),
  })
  .nonstrict()

export default resolver.pipe(resolver.zod(CreateChoice), resolver.authorize(), async (input) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const choice = await db.choice.create({
    data: { ...input, text: input.text, question: input.question },
  })

  return choice
})
