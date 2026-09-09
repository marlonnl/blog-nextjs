import { PostModel, PostModelDTO } from "./post-model"

export function toPostModelDTO(post: PostModel): PostModelDTO {
  const { title, slug, excerpt, coverImageUrl, createdAt } = post
  return { title, slug, excerpt, coverImageUrl, createdAt }
}
