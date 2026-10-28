import { getZodErrors } from "@/utils/get-zod-errors"
import { isUrlOrRelativePath } from "@/utils/is-url-or-relative-path"
import sanitizeHtml from "sanitize-html"
import z from "zod"

const PostBaseSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, "Título deve ter, no mínimo, 3 caracteres")
    .max(120, "Título deve ter um máximo de 120 caracteres"),
  content: z
    .string()
    .trim()
    .min(3, "Conteúdo é obrigatório")
    .transform(val => sanitizeHtml(val)),
  author: z
    .string()
    .trim()
    .min(4, "Autor precisa de um mínimo de 4 caracteres")
    .max(100, "Nome do autor não deve ter mais que 100 caracteres"),
  excerpt: z
    .string()
    .trim()
    .min(3, "Excerto precisa de um mínimo de 3 caracteres")
    .max(200, "Excerto não deve ter mais que 200 caracteres"),
  coverImageUrl: z.string().trim().refine(isUrlOrRelativePath, {
    message: "URL da capa deve ser uma URL ou caminho para imagem",
  }),
  published: z
    .union([
      z.literal("on"),
      z.literal("true"),
      z.literal("false"),
      z.literal(true),
      z.literal(false),
      z.literal(null),
      z.literal(undefined),
    ])
    .default(false)
    .transform(val => val === "on" || val === "true" || val === true),
})

// PostCreateSchema: igual ao base por enquanto
export const PostCreateSchema = PostBaseSchema

// PostUpdateSchema: pode incluir campos extras no futuro (ex: id)
export const PostUpdateSchema = PostBaseSchema.extend({
  // id: z.string().uuid('ID inválido'),
})

const obj = {
  id: "99f8add4-7684-4c16-a316-616271db199e",
  slug: "rotina-matinal-de-pessoas-altamente-eficazes",
  author: "Isabela Nunes",
  title: "Rotina matinal de pessoas altamente eficazes",
  excerpt:
    "O Next.js também é uma boa escolha para quem quer se preocupar com performance e SEO.",
  content:
    "O Next.js também é uma boa escolha para quem quer se preocupar com performance e SEO.",
  file: {
    size: 0,
    type: "application/octet-stream",
    name: "blob",
    lastModified: 1793210385714,
  },
  coverImageUrl: "/images/bryen_8.png",
  published: "on",
}

const zodParsedObj = PostCreateSchema.safeParse(obj)

if (!zodParsedObj.success) {
  const errors = getZodErrors(zodParsedObj.error.format())
  console.log(errors)
}

console.log(zodParsedObj)
