"use client"

import { uploadImageAction } from "@/actions/upload/upload-image-action"
import { Button } from "@/components/Button"
import { IMAGE_UPLOAD_MAX_SIZE } from "@/lib/constants"
import { ImageUpIcon } from "lucide-react"
import { useRef, useTransition } from "react"
import { toast } from "react-toastify"

export function ImageUploader() {
  const [isUploading, startTransition] = useTransition()
  const fileInputRef = useRef<HTMLInputElement>(null)

  function handleImageUploadClick() {
    if (!fileInputRef.current) return

    fileInputRef.current.click()
  }

  function handleChange() {
    if (!fileInputRef.current) return
    const fileInput = fileInputRef.current
    const file = fileInput?.files?.[0]

    if (!file) return
    if (file.size > IMAGE_UPLOAD_MAX_SIZE) {
      const kbSize = IMAGE_UPLOAD_MAX_SIZE / 1024
      toast.error(
        `O tamanho da imagem é maior do que o máximo permitido: ${kbSize} kb.`,
      )
      fileInput.value = ""
      return
    }

    // TODO: action para upload
    const formData = new FormData()
    formData.append("file", file)

    startTransition(async () => {
      const result = await uploadImageAction(formData)

      if (result.error) {
        toast.error(result.error)
        fileInput.value = ""
        return
      }

      // TODO: continuar depois
      toast.success(result.url)
    })

    fileInput.value = ""
  }

  return (
    <div className="py-4">
      <Button
        onClick={handleImageUploadClick}
        variant="default"
        type="button"
        size="sm"
      >
        <ImageUpIcon />
        Enviar imagem
      </Button>
      <input
        type="file"
        name="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        onChange={handleChange}
      />
    </div>
  )
}
