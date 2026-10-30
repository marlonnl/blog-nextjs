"use server"

import { postRepository } from "@/repositories/post"
import { logColor } from "@/utils/log-color"
import { updateTag } from "next/cache"

export async function deletePostAction(id: string) {
  // TODO:  check login

  logColor("" + id)

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
