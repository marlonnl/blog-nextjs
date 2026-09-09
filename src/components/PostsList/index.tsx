import { postRepository } from "@/repositories/post"
import PostItem from "../PostItem"
import { toPostModelDTO } from "@/models/post/post-model-mapper"

export default async function PostsList() {
  const posts = await postRepository.findAll()
  const [featuredPost, ...otherPosts] = posts

  return (
    <>
      {featuredPost && (
        <section className="grid grid-cols-1 gap-8 mb-16 sm:grid-cols-2 group">
          <PostItem post={toPostModelDTO(featuredPost)} featured></PostItem>
        </section>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {otherPosts.map(post => (
          <div className="flex flex-col gap-4 group" key={post.id}>
            <PostItem post={toPostModelDTO(post)} key={post.id} />
          </div>
        ))}
      </div>
    </>
  )
}
