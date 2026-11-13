"use server"

import { verifyLoginSession } from "@/lib/login/manage-login"
import { postRepository } from "@/repositories/post"
import { updateTag } from "next/cache"

export async function deletePostAction(id: string) {
  // verificar login
  const isAuth = await verifyLoginSession()
  if (!isAuth) {
    return {
      errors: ["É necessário estar logado."],
    }
  }

  if (!id || typeof id !== "string") {
    return {
      error: "Dados inválidos",
    }
  }

  let post
  try {
    post = await postRepository.delete(id)
  } catch (e: unknown) {
    if (e instanceof Error) {
      return {
        error: e.message,
      }
    }
    return {
      error: ["Erro desconhecido"],
    }
  }

  updateTag("posts")
  updateTag(`post-${post.slug}`)

  return { error: "" }
}
