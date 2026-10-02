import { findAllPostsAdmin } from "@/lib/posts/queries/admin"
import { Trash2Icon } from "lucide-react"
import Link from "next/link"

export default async function PostsListAdmin() {
  const posts = await findAllPostsAdmin()

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

            ${!post.published && "text-slate-600"}
          `}
          >
            <Link href={`/admin/post/${post.id}`}>{post.title}</Link>

            {!post.published && (
              <span className="text-xs italic">rascunho</span>
            )}

            <button
              aria-label={`Apagar post: ${post.title}`}
              title={`Apagar post: ${post.title}`}
              className="
              cursor-pointer
              [&_svg]:box-content
              [&_svg]:w-4.5
              [&_svg]:h-4.5
              [&_svg]:px-1 [&_svg]:py-1
            [&_svg]:bg-red-600
              transition-all duration-100
              [&_svg]:text-stone-100
              [&_svg]:stroke-[2.5]

              border-4 border-black rounded-none
              shadow-[2px_2px_0_0_#000]
              hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0_0_#000]
              active:translate-x-[2px] active:translate-y-[2px] active:shadow-none
             "
            >
              <Trash2Icon size={18} />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

// [&_svg]:w-4.5
// [&_svg]:h-4.5
