import slugify from "slugify"
import { makeRndString } from "./make-rnd-string"

export const makeSlug = (title: string) => {
  const slug = slugify(title, {
    lower: true,
    strict: true,
    trim: true,
  })

  return `${slug}-${makeRndString()}`
}
