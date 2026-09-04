import { PostModel } from "@/models/post/post-model"

// Interface com os métodos que o meu respositório terá/tem
export interface PostRepository {
  findAll(): Promise<PostModel[]>
  findById(id: string): Promise<PostModel>
}
