import { resolve } from "path"
import { readFile } from "fs/promises"

import { PostModel } from "@/models/post/post-model"
import { PostRepository } from "./post-repository"

const ROOT_DIR = process.cwd()
const JSON_POSTS_PATH = resolve(ROOT_DIR, "src", "db", "seed", "posts.json")

export class JsonPostRepository implements PostRepository {
  private async readFromDisk(): Promise<PostModel[]> {
    const jsonPostContent = await readFile(JSON_POSTS_PATH, "utf-8")
    const postContentParsed = JSON.parse(jsonPostContent)

    const { posts } = postContentParsed
    return posts
  }

  async findAll(): Promise<PostModel[]> {
    const posts = await this.readFromDisk()
    return posts
  }

  async findById(id: string): Promise<PostModel> {
    const posts = await this.readFromDisk()
    const post = posts.find(post => post.id === id)

    if (!post) throw new Error("ID não encontrado")

    return post
  }
}
