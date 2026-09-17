import { findPostBySlugCached } from "@/lib/posts/queries"
import Image from "next/image"
import { Title } from "../Title"
import PostDate from "../PostDate"
import SafeMD from "../SafeMD"

type SinglePostProps = {
  slug: string
}

export default async function SinglePost({ slug }: SinglePostProps) {
  const post = await findPostBySlugCached(slug)

  return (
    <article className="mb-16">
      <header className="group flex flex-col gap-4 mb-4">
        <Image
          className="rounded-xl"
          src={post.coverImageUrl}
          alt={post.title}
          width={1200}
          height={720}
          priority
        />

        <Title url={`/post/${post.slug}`}>{post.title}</Title>

        <p>
          {post.author} | <PostDate dateTime={post.createdAt} />
        </p>
      </header>

      <p className="text-xl/tight text-slate-600 mb-8 mx-6">{post.excerpt}</p>

      <SafeMD markdown={post.content} />
    </article>
  )
}
