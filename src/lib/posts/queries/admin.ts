import { postRepository } from "@/repositories/post"

export async function findPostByIdAdmin(id: string) {
  "use cache"
  return await postRepository.findById(id)
}

export async function findAllPostsAdmin() {
  "use cache"
  return await postRepository.findAll()
}
