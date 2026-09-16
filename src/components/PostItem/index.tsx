import { PostModelDTO } from "@/models/post/post-model"
import PostCoverImage from "../PostCoverImage"
import { Title } from "../Title"
import {
  datetimeFormatter,
  relativeDatatimeFormatter,
} from "@/utils/datetime-formatter"
import PostDate from "../PostDate"

type PostItemProps = {
  post: PostModelDTO
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
        <PostDate dateTime={post.createdAt} />
        <Title url={postLink} as={featured ? "h1" : "h2"}>
          {post.title}
        </Title>
        <p>{post.excerpt}</p>
      </div>
    </>
  )
}
