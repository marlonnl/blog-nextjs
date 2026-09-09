export type PostModel = {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  coverImageUrl: string
  published: boolean
  createdAt: string
  updatedAt: string
  author: string
}

// Model apenas com dados necessários
// para envio a outros elementos via
// props. Nesse caso ao PostItem
// DTO = Data Transfer Object
export type PostModelDTO = {
  title: string
  slug: string
  excerpt: string
  coverImageUrl: string
  createdAt: string
}
