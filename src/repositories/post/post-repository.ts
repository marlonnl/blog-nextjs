import { PostModel } from "@/models/post/post-model"

// Interface com os métodos que o meu respositório terá/tem
export interface PostRepository {
  findAllPublished(): Promise<PostModel[]>
  findBySlugPublished(slug: string): Promise<PostModel>
  findAll(): Promise<PostModel[]>
  findById(id: string): Promise<PostModel>

  // Mutation
  create(post: PostModel): Promise<PostModel>
  delete(id: string): Promise<PostModel>
  update(
    id: string,
    newPostData: Omit<PostModel, "id" | "slug" | "createdAt" | "updatedAt">,
  ): Promise<PostModel>
}
