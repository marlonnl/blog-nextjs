"use server"

import { drizzleDb } from "@/db/drizzle"
import { postsTable } from "@/db/drizzle/schemas"
import { postRepository } from "@/repositories/post"
import { logColor } from "@/utils/log-color"
import { eq } from "drizzle-orm"
import { updateTag } from "next/cache"

export async function deletePostAction(id: string) {
  // TODO:  check login

  logColor("" + id)

  if (!id || typeof id != "string") {
    return {
      error: "Dados inválidos",
    }
  }

  const post = await postRepository.findById(id).catch(() => undefined)

  if (!post) {
    return {
      error: "Post inexistente na DB",
    }
  }

  // TODO: mover este método para o repositório
  await drizzleDb.delete(postsTable).where(eq(postsTable.id, id))

  // TODO: revalidar Tag ou Path
  updateTag("posts")
  updateTag(`post-${post.slug}`)

  return { error: "" }
}
