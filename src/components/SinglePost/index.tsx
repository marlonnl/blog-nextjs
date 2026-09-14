import { findPostBySlugCached } from "@/lib/posts/queries"

type SinglePostProps = {
  slug: string
}

export default async function SinglePost({ slug }: SinglePostProps) {
  const post = await findPostBySlugCached(slug)

  return <p>{post.content}</p>
}
