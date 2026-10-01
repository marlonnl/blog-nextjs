import { findAllPostsAdmin } from "@/lib/posts/queries/admin"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Post Admin",
}

export default async function AdminPostPage() {
  const posts = await findAllPostsAdmin()

  return (
    <div>
      <h2 className="py-16 text-4xl font-bold">Admin Post</h2>
      <div>
        {posts.map(post => (
          <p key={post.id}>{post.title}</p>
        ))}
      </div>
    </div>
  )
}
