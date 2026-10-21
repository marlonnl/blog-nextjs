import { ManagePostForm } from "@/components/admin/ManagePostForm"
import { SpinLoader } from "@/components/SpinLoader"
import { makePublicPost } from "@/dto/post"
import { findPostByIdAdmin } from "@/lib/posts/queries/admin"
import { Metadata } from "next"
import { notFound } from "next/navigation"
import { Suspense } from "react"

export const metadata: Metadata = {
  title: "Editar post",
}

type AdminPostIdPageProps = {
  params: Promise<{ id: string }>
}

async function PostContent({ params }: AdminPostIdPageProps) {
  const { id } = await params
  const post = await findPostByIdAdmin(id).catch()

  if (!post) notFound()

  const publicPost = makePublicPost(post)

  return (
    <div>
      <h2 className="font-bold">Editar post</h2>
      <ManagePostForm publicPost={publicPost} />
    </div>
  )
}

export default function AdminPostIdPage({ params }: AdminPostIdPageProps) {
  return (
    <Suspense fallback={<SpinLoader />}>
      <PostContent params={params} />
    </Suspense>
  )
}

// src/app/page.tsx
// import { Suspense } from "react"
// import { connection } from "next/server"

// async function DadosDinamicos() {
//   await connection() // equivalente ao force-dynamic
//   const agora = new Date().toISOString()
//   const res = await fetch("https://api.exemplo.com/dados")
//   const dados = await res.json()

//   return <p>{agora} - {dados.titulo}</p>
// }

// export default function HomePage() {
//   return (
//     <>
//       <h1>Shell estático</h1>
//       <Suspense fallback={<p>Carregando...</p>}>
//         <DadosDinamicos />
//       </Suspense>
//     </>
//   )
// }
