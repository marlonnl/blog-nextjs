import { PostModel } from "@/models/post/post-model"
import PostCoverImage from "../PostCoverImage"
import { Title } from "../Title"
import {
  datetimeFormatter,
  relativeDatatimeFormatter,
} from "@/utils/datetime-formatter"

type PostItemProps = {
  post: PostModel
  featured?: boolean
}

export default function PostItem({ post, featured = false }: PostItemProps) {
  const postLink = `/post/${post.slug}`

  return (
    <>
      <PostCoverImage
        linkProps={{ href: postLink }}
        imageProps={{
          alt: `Ler ${post.title}`,
          width: 1200,
          height: 720,
          src: post.coverImageUrl,
          priority: featured,
        }}
      />
      <div className="flex flex-col sm:justify-center">
        <time
          dateTime={post.createdAt}
          title={relativeDatatimeFormatter(post.createdAt)}
          className="text-slate-500 text-sm/snug"
        >
          {datetimeFormatter(post.createdAt)}
        </time>
        <Title url={postLink} as={featured ? "h1" : "h2"}>
          {post.title}
        </Title>
        <p>{post.excerpt}</p>
      </div>
    </>
  )
}
