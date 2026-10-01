import { postRepository } from "@/repositories/post"
import { notFound } from "next/navigation"
import { cacheLife, cacheTag } from "next/cache"

export async function findAllPublishedPostsCached() {
  "use cache"
  cacheTag("posts")
  cacheLife("hours")

  return await postRepository.findAllPublished()
}

export async function findPublishedPostBySlugCached(slug: string) {
  "use cache"
  cacheTag("post", `post-${slug}`)

  const post = await postRepository
    .findBySlugPublished(slug)
    .catch(() => undefined)

  if (!post) notFound()
  return post
}

// export const findPublishedPostBySlugCached = cache(async (slug: string) => {
//   // slug não existe, retorna undefined/notFound
//   const post = await postRepository
//     .findBySlugPublished(slug)
//     .catch(() => undefined)

//   if (!post) notFound()
//   return post
// })
