import { JsonPostRepository } from "./json-post-repository"
import { PostRepository } from "./post-repository"

export const postRepository: PostRepository = new JsonPostRepository()
;(async () => {
  // const posts = await postRepository.findAll()
  // console.log(posts)
  // const post = await postRepository.findById(
  //   "99f8add4-7684-4c16-a316-616271db199e",
  // )
  // console.log(post)
})()
