type AdminPostIdPageProps = {
  params: Promise<{ id: string }>
}

export default async function AdminPostIdPage({
  params,
}: AdminPostIdPageProps) {
  // await connection()

  const { id } = await params
  return <div>admin post id: {id}</div>
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
