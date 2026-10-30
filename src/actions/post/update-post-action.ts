"use server"

import {
  makePartialPublicPost,
  makePublicPostFromDb,
  PublicPost,
} from "@/dto/post"
import { PostUpdateSchema } from "@/lib/posts/validations"
import { postRepository } from "@/repositories/post"
import { getZodErrors } from "@/utils/get-zod-errors"
import { updateTag } from "next/cache"

type UpdatePostActionState = {
  formState: PublicPost
  errors: string[]
  success?: true
}

export async function updatePostAction(
  prevState: UpdatePostActionState,
  formData: FormData,
): Promise<UpdatePostActionState> {
  // TODO: verificar login

  // formData incorreto
  if (!(formData instanceof FormData)) {
    return {
      formState: prevState.formState,
      errors: ["Dados inválidos"],
    }
  }

  const id = formData.get("id")?.toString || ""
  if (!id || typeof id !== "string") {
    return {
      formState: prevState.formState,
      errors: ["ID inválido"],
    }
  }

  const formDataObject = Object.fromEntries(formData.entries())
  const zodParsedObj = PostUpdateSchema.safeParse(formDataObject)

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
    success: true,
  }
}
