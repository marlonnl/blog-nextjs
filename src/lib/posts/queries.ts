import { cache } from "react"
import { postRepository } from "@/repositories/post"

export const findAllPublishedPosts = cache(
  async () => await postRepository.findAllPublished(),
)
