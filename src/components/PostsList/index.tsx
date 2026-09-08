import { postRepository } from "@/repositories/post"
import PostCoverImage from "../PostCoverImage"
import { Title } from "../Title"

export default async function PostsList() {
  const posts = await postRepository.findAll()

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map(post => {
        const postLink = `/post/${post.slug}`

        return (
          <div key={post.id} className="flex flex-col gap-4 group">
            <PostCoverImage
              linkProps={{ href: postLink }}
              imageProps={{
                alt: `Ler ${post.title}`,
                width: 1200,
                height: 720,
                src: post.coverImageUrl,
              }}
            />
            <div className="flex flex-col sm:justify-center">
              <time
                dateTime={post.createdAt}
                className="text-slate-500 text-sm/snug"
              >
                {post.createdAt}
              </time>
              <Title url={postLink}>{post.title}</Title>
              <p>{post.excerpt}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
