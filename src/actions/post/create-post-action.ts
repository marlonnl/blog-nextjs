"use server"

import { makePartialPublicPost, PublicPost } from "@/dto/post"
import { PostCreateSchema } from "@/lib/posts/validations"
import { PostModel } from "@/models/post/post-model"
import { postRepository } from "@/repositories/post"
import { getZodErrors } from "@/utils/get-zod-errors"
import { makeSlug } from "@/utils/make-slug"
import { updateTag } from "next/cache"
import { redirect } from "next/navigation"
import { v4 as uuidv4 } from "uuid"

type CreatePostActionState = {
  formState: PublicPost
  errors: string[]
  success?: true
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
  const zodParsedObj = PostCreateSchema.safeParse(formDataObject)

  if (!zodParsedObj.success) {
    const errors = getZodErrors(zodParsedObj.error.format())
    return { errors, formState: makePartialPublicPost(formDataObject) }
  }

  const validPostData = zodParsedObj.data
  const newPost: PostModel = {
    ...validPostData,
    id: uuidv4(),
    slug: makeSlug(validPostData.title),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }

  try {
    await postRepository.create(newPost)
  } catch (e: unknown) {
    if (e instanceof Error) {
      return {
        formState: newPost,
        errors: [e.message],
      }
    }
    return {
      formState: newPost,
      errors: ["Erro desconhecido"],
    }
  }

  updateTag("posts")
  redirect(`/admin/post/${newPost.id}`)

  // return {
  //   formState: newPost,
  //   errors: [],
  // }
}
