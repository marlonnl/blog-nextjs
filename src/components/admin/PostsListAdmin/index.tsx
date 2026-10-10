import { findAllPostsAdmin } from "@/lib/posts/queries/admin"
import Link from "next/link"
import { DeletePostButton } from "../admin/DeletePostButton"
import ErrorMessage from "../ErrorMessage"

export default async function PostsListAdmin() {
  const posts = await findAllPostsAdmin()

  if (posts.length <= 0)
    return (
      <ErrorMessage
        contentTitle="Ei... 😅"
        content="Ainda não existem postagens para ser exibida, escreva!"
      />
    )

  return (
    <div className="mb-16">
      <h2 className="mb-16 text-4xl font-bold">Admin Post</h2>
      <div>
        {posts.map(post => (
          <div
            key={post.id}
            className={`
            py-2 px-2
            flex gap-2 items-center justify-between
            border-b-2

            ${!post.published && "text-slate-600 border-b-slate-600 border-dashed"}
          `}
          >
            <Link href={`/admin/post/${post.id}`}>{post.title}</Link>

            {!post.published && (
              <span className="text-xs italic">rascunho</span>
            )}

            <DeletePostButton id={post.id} title={post.title} />
          </div>
        ))}
      </div>
    </div>
  )
}

// [&_svg]:w-4.5
// [&_svg]:h-4.5
