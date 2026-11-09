import { resolve } from "path"
import { readFile, writeFile } from "fs/promises"

import { PostModel } from "@/models/post/post-model"
import { PostRepository } from "./post-repository"

const ROOT_DIR = process.cwd()
const JSON_POSTS_PATH = resolve(ROOT_DIR, "src", "db", "seed", "posts.json")

const simulateWaitMs = Number(process.env.SIMULATE_LOADING_TIME) || 0

export class JsonPostRepository implements PostRepository {
  private async simulateWait() {
    if (simulateWaitMs <= 0) return
    await new Promise(resolve => setTimeout(resolve, simulateWaitMs))
  }

  private async readFromDisk(): Promise<PostModel[]> {
    const jsonPostContent = await readFile(JSON_POSTS_PATH, "utf-8")
    const postContentParsed = JSON.parse(jsonPostContent)

    const { posts } = postContentParsed
    return posts
  }

  private async writeToDisk(posts: PostModel[]): Promise<void> {
    const jsonToString = JSON.stringify({ posts }, null, 2)
    await writeFile(JSON_POSTS_PATH, jsonToString, "utf-8")
  }

  async findAll(): Promise<PostModel[]> {
    await this.simulateWait()

    const posts = await this.readFromDisk()
    return posts
  }

  async findAllPublished(): Promise<PostModel[]> {
    await this.simulateWait()

    // console.log("From findAllPublished")

    const posts = await this.readFromDisk()
    return posts.filter(post => post.published)
  }

  async findById(id: string): Promise<PostModel> {
    const posts = await this.findAllPublished()
    const post = posts.find(post => post.id === id)

    if (!post) throw new Error("Post id não encontrado")

    return post
  }

  async findBySlugPublished(slug: string): Promise<PostModel> {
    const posts = await this.findAllPublished()
    const post = posts.find(post => post.slug === slug)

    if (!post) throw new Error("Slug de post não encontrado")

    return post
  }

  async create(post: PostModel): Promise<PostModel> {
    const posts = await this.findAll()

    if (!post.id || !post.slug) {
      throw new Error("Post sem ID ou slug")
    }

    const idOrSlugExist = posts.find(
      savedPost => savedPost.id === post.id || savedPost.slug === post.slug,
    )

    if (idOrSlugExist) {
      throw new Error("ID ou slug devem ser únicos")
    }

    posts.push(post)
    await this.writeToDisk(posts)

    return post
  }

  async delete(id: string): Promise<PostModel> {
    const posts = await this.findAll()
    const postIndex = posts.findIndex(p => p.id === id)

    if (postIndex < 0) {
      throw new Error("Post não existe")
    }

    const post = posts[postIndex]
    posts.splice(postIndex, 1)
    await this.writeToDisk(posts)

    return post
  }

  async update(
    id: string,
    newPostData: Omit<PostModel, "id" | "slug" | "createdAt" | "updatedAt">,
  ): Promise<PostModel> {
    const posts = await this.findAll()
    const postIndex = posts.findIndex(p => p.id === id)
    const savedPost = posts[postIndex]

    if (postIndex < 0) {
      throw new Error("Post não existe")
    }

    const newPost = {
      ...savedPost,
      ...newPostData,
    }
    posts[postIndex] = newPost
    await this.writeToDisk(posts)
    return newPost
  }
}
