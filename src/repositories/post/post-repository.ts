import { PostModel } from "@/models/post/post-model"

// Interface com os métodos que o meu respositório terá/tem
export interface PostRepository {
  findAll(): Promise<PostModel[]>
  findAllPublished(): Promise<PostModel[]>
  findById(id: string): Promise<PostModel>
  findBySlug(slug: string): Promise<PostModel>
}
