"use server"

import { makePartialPublicPost, PublicPost } from "@/dto/post"
import { PostCreateSchema } from "@/lib/posts/validations"
import { PostModel } from "@/models/post/post-model"
import { getZodErrors } from "@/utils/get-zod-errors"
import { makeSlug } from "@/utils/make-slug"
import { v4 as uuidv4 } from "uuid"
import { slugify } from "zod"

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

  return {
    formState: newPost,
    errors: [],
  }
}
