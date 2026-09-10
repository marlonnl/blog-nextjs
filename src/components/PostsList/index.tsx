import PostItem from "../PostItem"
import { toPostModelDTO } from "@/models/post/post-model-mapper"
import { findAllPublishedPosts } from "@/lib/posts/queries"

export default async function PostsList() {
  const posts = await findAllPublishedPosts()
  const [featuredPost, ...otherPosts] = posts

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
