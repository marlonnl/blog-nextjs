import PostItem from "../PostItem"
import { toPostModelDTO } from "@/models/post/post-model-mapper"
import { findAllPublishedPostsCached } from "@/lib/posts/queries/public"
import ErrorMessage from "../ErrorMessage"

export default async function PostsList() {
  const posts = await findAllPublishedPostsCached()
  const [featuredPost, ...otherPosts] = posts

  if (posts.length <= 0)
    return (
      <ErrorMessage
        contentTitle="Ops... 😅"
        content="Ainda não existem postagens para ser exibida"
      />
    )

  return (
    <>
      {featuredPost && (
        <section className="grid grid-cols-1 gap-8 mb-16 sm:grid-cols-2 group">
          <PostItem post={toPostModelDTO(featuredPost)} featured />
        </section>
      )}

      <div className="grid grid-cols-1 mb-16 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {otherPosts.map(post => (
          <div className="flex flex-col gap-4 group" key={post.id}>
            <PostItem post={toPostModelDTO(post)} key={post.id} />
          </div>
        ))}
      </div>
    </>
  )
}
