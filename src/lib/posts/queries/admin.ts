import { postRepository } from "@/repositories/post"

export async function findPostByIdAdmin(id: string) {
  return await postRepository.findById(id)
}

export async function findAllPostsAdmin() {
  return await postRepository.findAll()
}
