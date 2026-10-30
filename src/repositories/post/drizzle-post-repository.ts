import { PostModel } from "@/models/post/post-model"
import { PostRepository } from "./post-repository"
import { drizzleDb } from "@/db/drizzle"
import { logColor } from "@/utils/log-color"
import { asyncDelay } from "@/utils/async-delay"
import { SIMULATE_LOADING_TIME } from "@/lib/constants"
import { postsTable } from "@/db/drizzle/schemas"
import { eq } from "drizzle-orm"

export class DrizzlePostRepository implements PostRepository {
  async findAllPublished(): Promise<PostModel[]> {
    await asyncDelay(SIMULATE_LOADING_TIME, true)
    logColor(Date.now(), "findAllPublished")

    const posts = await drizzleDb.query.posts.findMany({
      orderBy: (posts, { desc }) => desc(posts.createdAt),
      where: (posts, { eq }) => eq(posts.published, true),
    })

    return posts
  }

  async findBySlugPublished(slug: string): Promise<PostModel> {
    await asyncDelay(SIMULATE_LOADING_TIME, true)
    logColor(Date.now(), "findBySlugPublished")
    const post = await drizzleDb.query.posts.findFirst({
      where: (post, { eq, and }) =>
        and(eq(post.slug, slug), eq(post.published, true)),
    })

    if (!post) throw new Error("Slug de post não encontrado")

    return post
  }

  async findAll(): Promise<PostModel[]> {
    await asyncDelay(SIMULATE_LOADING_TIME, true)
    logColor(Date.now(), "findAll")

    const posts = await drizzleDb.query.posts.findMany({
      orderBy: (posts, { desc }) => desc(posts.createdAt),
    })

    return posts
  }

  async findById(id: string): Promise<PostModel> {
    await asyncDelay(SIMULATE_LOADING_TIME, true)
    logColor(Date.now(), "findById")

    const post = await drizzleDb.query.posts.findFirst({
      where: (post, { eq }) => eq(post.id, id),
    })

    if (!post) throw new Error("ID de post não encontrado")

    return post
  }

  async create(post: PostModel): Promise<PostModel> {
    const postExists = await drizzleDb.query.posts.findFirst({
      where: (posts, { or, eq }) =>
        or(eq(posts.id, post.id), eq(posts.slug, post.slug)),
      columns: { id: true },
    })

    if (!!postExists) {
      throw new Error("ID ou slug já existe na base de dados.")
    }

    await drizzleDb.insert(postsTable).values(post)
    return post
  }

  async delete(id: string): Promise<PostModel> {
    const post = await drizzleDb.query.posts.findFirst({
      where: (posts, { eq }) => eq(posts.id, id),
    })

    if (!post) {
      throw new Error("Post não existe.")
    }

    await drizzleDb.delete(postsTable).where(eq(postsTable.id, id))
    return post
  }

  async update(
    id: string,
    newPostData: Omit<PostModel, "id" | "slug" | "createdAt" | "updatedAt">,
  ): Promise<PostModel> {
    const oldPost = await drizzleDb.query.posts.findFirst({
      where: (posts, { eq }) => eq(posts.id, id),
    })

    if (!oldPost) {
      throw new Error("Post não existe.")
    }

    const updatedAt = new Date().toISOString()
    const postData = {
      title: newPostData.title,
      author: newPostData.author,
      content: newPostData.content,
      converImageUrl: newPostData.coverImageUrl,
      excerpt: newPostData.excerpt,
      published: newPostData.published,
      updatedAt: updatedAt,
    }

    await drizzleDb
      .update(postsTable)
      .set(postData)
      .where(eq(postsTable.id, id))

    return {
      ...oldPost,
      ...postData,
    }
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
