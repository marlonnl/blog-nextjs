import { findAllPostsAdmin } from "@/lib/posts/queries/admin"
import Link from "next/link"
import { DeletePostButton } from "../admin/DeletePostButton"

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

        <div
          className="
          fixed top-0 bottom-0 left-0 right-0
          bg-black/50 backdrop-blur-xs
          flex items-center justify-center
          z-50 inset-0
        "
        >
          <div
            className="
            p-6 mx-6
            max-w-2xl
            bg-yellow-100 border-4
            flex flex-col gap-6
            shadow-[4px_4px_0_0_#000]
            "
          >
            <h3 className="font-bold uppercase">título</h3>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquid
              quos voluptatem consectetur, voluptate dolorem tempore iure esse
              sapiente numquam accusantium architecto facilis inventore minima
              non adipisci! Recusandae officiis repellat nostrum?
            </p>
            <div
              className="
              flex justify-around items-center
            "
            >
              <button
                className="
                text-black font-bold
                bg-[#FFD93D] hover:bg-[#FFC800]
                  cursor-pointer
                  transition

                  flex items-center justify-center

                  py-2 px-4

                  border-4 border-black rounded-none
                  shadow-[4px_4px_0_0_#000]
                  hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_0_#000]
                  active:translate-x-1 active:translate-y-1 active:shadow-none
              "
              >
                Confirmar
              </button>
              <button
                autoFocus
                className="
                text-black font-bold
                bg-[#FF6B9D] hover:bg-[#FF4D8B]
                cursor-pointer
                transition

                flex items-center justify-center

                py-2 px-4

                border-4 border-black rounded-none
                shadow-[4px_4px_0_0_#000]
                hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_0_#000]
                active:translate-x-1 active:translate-y-1 active:shadow-none

                focus:outline-none
              "
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// [&_svg]:w-4.5
// [&_svg]:h-4.5
