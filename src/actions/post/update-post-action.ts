"use server"

import {
  makePartialPublicPost,
  makePublicPostFromDb,
  PublicPost,
} from "@/dto/post"
import { verifyLoginSession } from "@/lib/login/manage-login"
import { PostUpdateSchema } from "@/lib/posts/validations"
import { postRepository } from "@/repositories/post"
import { getZodErrors } from "@/utils/get-zod-errors"
import { makeRndString } from "@/utils/make-rnd-string"
import { updateTag } from "next/cache"

type UpdatePostActionState = {
  formState: PublicPost
  errors: string[]
  success?: string
}

export async function updatePostAction(
  prevState: UpdatePostActionState,
  formData: FormData,
): Promise<UpdatePostActionState> {
  // verificar login
  const isAuth = await verifyLoginSession()

  // formData incorreto
  if (!(formData instanceof FormData)) {
    return {
      formState: prevState.formState,
      errors: ["Dados inválidos"],
    }
  }

  const id = formData.get("id")?.toString() || ""

  if (!id || typeof id !== "string") {
    return {
      formState: prevState.formState,
      errors: ["ID inválido"],
    }
  }

  const formDataObject = Object.fromEntries(formData.entries())
  const zodParsedObj = PostUpdateSchema.safeParse(formDataObject)

  // verifica sessao
  if (!isAuth) {
    return {
      formState: makePartialPublicPost(formDataObject),
      errors: ["É necessário estar logado para salvar."],
    }
  }

  if (!zodParsedObj.success) {
    const errors = getZodErrors(zodParsedObj.error.format())
    return { errors, formState: makePartialPublicPost(formDataObject) }
  }

  const validPostData = zodParsedObj.data
  const newPost = {
    ...validPostData,
  }

  let post
  try {
    post = await postRepository.update(id, newPost)
  } catch (e: unknown) {
    if (e instanceof Error) {
      return {
        formState: makePartialPublicPost(formDataObject),
        errors: [e.message],
      }
    }
    return {
      formState: makePartialPublicPost(formDataObject),
      errors: ["Erro desconhecido"],
    }
  }

  updateTag("posts")
  updateTag(`post-${post.slug}`)

  return {
    formState: makePublicPostFromDb(post),
    errors: [],
    success: makeRndString(),
  }
}
