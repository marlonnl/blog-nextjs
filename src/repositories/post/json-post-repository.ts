import { resolve } from "path"
import { readFile } from "fs/promises"

import { PostModel } from "@/models/post/post-model"
import { PostRepository } from "./post-repository"

const ROOT_DIR = process.cwd()
const JSON_POSTS_PATH = resolve(ROOT_DIR, "src", "db", "seed", "posts.json")

const SIMULATE_LOADING_TIME = 0

export class JsonPostRepository implements PostRepository {
  private async simulateWait() {
    if (SIMULATE_LOADING_TIME <= 0) return
    await new Promise(resolve => setTimeout(resolve, SIMULATE_LOADING_TIME))
  }

  private async readFromDisk(): Promise<PostModel[]> {
    const jsonPostContent = await readFile(JSON_POSTS_PATH, "utf-8")
    const postContentParsed = JSON.parse(jsonPostContent)

    const { posts } = postContentParsed
    return posts
  }

  async findAllPublished(): Promise<PostModel[]> {
    await this.simulateWait()

    console.log("From findAllPublished")

    const posts = await this.readFromDisk()
    return posts.filter(post => post.published)
  }

  async findById(id: string): Promise<PostModel> {
    await this.simulateWait()

    const posts = await this.readFromDisk()
    const post = posts.find(post => post.id === id)

    if (!post) throw new Error("ID não encontrado")

    return post
  }
}
