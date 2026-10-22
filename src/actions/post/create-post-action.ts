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
  console.log({ prevState })

  return {
    formState: prevState.formState,
    errors: [],
  }
}
