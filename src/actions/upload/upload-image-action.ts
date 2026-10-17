"use server"

import {
  IMAGE_SERVER_URL,
  IMAGE_UPLOAD_DIR,
  IMAGE_UPLOAD_MAX_SIZE,
} from "@/lib/constants"
import { asyncDelay } from "@/utils/async-delay"
import { mkdir, writeFile } from "fs/promises"
import { extname, resolve } from "path"

type UploadImageActionResult = {
  url: string
  error: string
}

export async function uploadImageAction(
  formData: FormData,
): Promise<UploadImageActionResult> {
  const doResult = ({ url = "", error = "" }) => {
    return { url, error }
  }

  // checagem do form
  if (!(formData instanceof FormData)) {
    return doResult({ error: "Dados inválidos" })
  }

  // checagem do arquivo
  const file = formData.get("file")
  if (!(file instanceof File)) {
    return doResult({ error: "Arquivo inválido" })
  }

  // checagem do tamanho do arquivo
  if (file.size > IMAGE_UPLOAD_MAX_SIZE) {
    return doResult({ error: "Arquivo grande demais" })
  }

  // checagem do tipo do arquivo
  if (!file.type.startsWith("image/")) {
    return doResult({ error: "Imagem inválida" })
  }

  const imageExtension = extname(file.name)
  const uniqueImageName = `${Date.now()}${imageExtension}`

  const uploadPath = resolve(process.cwd(), "public", IMAGE_UPLOAD_DIR)
  await mkdir(uploadPath, { recursive: true })

  const fileArrayBuffer = await file.arrayBuffer()
  const buffer = Buffer.from(fileArrayBuffer)

  const filePath = resolve(uploadPath, uniqueImageName)

  await writeFile(filePath, buffer)

  const url = `${IMAGE_SERVER_URL}/${uniqueImageName}`

  return doResult({ url })
}
