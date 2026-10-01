import { PostModel } from "@/models/post/post-model"
import { PostRepository } from "./post-repository"
import { drizzleDb } from "@/db/drizzle"
import { logColor } from "@/utils/log-color"

export class DrizzlePostRepository implements PostRepository {
  async findAllPublished(): Promise<PostModel[]> {
    logColor(Date.now(), "findAllPublished")

    const posts = await drizzleDb.query.posts.findMany({
      orderBy: (posts, { desc }) => desc(posts.createdAt),
      where: (posts, { eq }) => eq(posts.published, true),
    })

    return posts
  }

  async findBySlugPublished(slug: string): Promise<PostModel> {
    logColor(Date.now(), "findBySlugPublished")
    const post = await drizzleDb.query.posts.findFirst({
      where: (post, { eq, and }) =>
        and(eq(post.slug, slug), eq(post.published, true)),
    })

    if (!post) throw new Error("Slug de post não encontrado")

    return post
  }

  async findAll(): Promise<PostModel[]> {
    logColor(Date.now(), "findAll")

    const posts = await drizzleDb.query.posts.findMany({
      orderBy: (posts, { desc }) => desc(posts.createdAt),
    })

    return posts
  }

  async findById(id: string): Promise<PostModel> {
    logColor(Date.now(), "findById")

    const post = await drizzleDb.query.posts.findFirst({
      where: (post, { eq }) => eq(post.id, id),
    })

    if (!post) throw new Error("ID de post não encontrado")

    return post
  }
}

// ;(async () => {
//   const repo = new DrizzlePostRepository()
//   // const posts = await repo.findAll()
//   // posts.forEach(post => console.log(post.id, post.published))

//   const post = await repo.findBySlugPublished(
//     "10-habitos-para-aumentar-sua-produtividade",
//   )
//   console.log(post.id, post.author)
// })()

// organizacao-pessoal-por-onde-comecar true
// 10-habitos-para-aumentar-sua-produtividade false

// 3993fcf7-2490-48ed-be2e-58c2030ee764 true
// be3f14a1-0105-4e2e-bfc9-133a05e7bda6 false
