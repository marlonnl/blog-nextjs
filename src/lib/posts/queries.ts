import { cache } from "react"
import { postRepository } from "@/repositories/post"
import { notFound } from "next/navigation"

export const findAllPublishedPostsCached = cache(
  async () => await postRepository.findAllPublished(),
)

export const findPostByIdCached = cache(
  async (id: string) => await postRepository.findById(id),
)

export const findPostBySlugCached = cache(async (slug: string) => {
  // slug não existe, retorna undefined/notFound
  const post = await postRepository.findBySlug(slug).catch(() => undefined)

  if (!post) notFound()
  return post
})
