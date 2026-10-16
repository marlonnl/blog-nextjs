"use server"

import { IMAGE_UPLOAD_MAX_SIZE } from "@/lib/constants"

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

  // TODO: enviar o arquivo
  return doResult({ url: "URL" })
}
