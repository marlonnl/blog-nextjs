"use server"

import { PublicPost } from "@/dto/post"

type CreatePostActionState = {
  formState: PublicPost
  errors: string[]
}

export async function createPostAction(
  prevState: CreatePostActionState,
  formData: FormData,
): Promise<CreatePostActionState> {
  // TODO: verificar login

  // formData incorreto
  if (!(formData instanceof FormData)) {
    return {
      formState: prevState.formState,
      errors: ["Dados inválidos"],
    }
  }

  const formDataObject = Object.fromEntries(formData.entries())

  return {
    formState: prevState.formState,
    errors: [],
  }
}

// {
//   id: '99f8add4-7684-4c16-a316-616271db199e',
//   slug: 'rotina-matinal-de-pessoas-altamente-eficazes',
//   author: 'Isabela Nunes',
//   title: 'Rotina matinal de pessoas altamente eficazes',
//   excerpt: 'O Next.js também é uma boa escolha para quem quer se preocupar com performance e SEO.',
//   content: 'O Next.js também é uma boa escolha para quem quer se preocupar com performance e SEO.',
//   file: File {
//     size: 0,
//     type: 'application/octet-stream',
//     name: 'blob',
//     lastModified: 1793210385714
//   },
//   coverImageUrl: '/images/bryen_8.png',
//   published: 'on'
// }
