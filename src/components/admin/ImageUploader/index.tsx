"use client"

import { uploadImageAction } from "@/actions/upload/upload-image-action"
import { Button } from "@/components/Button"
import { IMAGE_UPLOAD_MAX_SIZE } from "@/lib/constants"
import { ImageUpIcon } from "lucide-react"
import { useRef, useState, useTransition } from "react"
import { toast } from "react-toastify"

export function ImageUploader() {
  const [isUploading, startTransition] = useTransition()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [imgUrl, setImgUrl] = useState("")

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
        setImgUrl("")
        return
      }

      setImgUrl(result.url)
      toast.success("Imagem enviada")
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
        disabled={isUploading}
      >
        <ImageUpIcon />
        Enviar imagem
      </Button>

      {imgUrl && (
        <div className="my-4 flex flex-col gap-4 items-start">
          {/* eslint-disable-next-line */}
          <img
            src={imgUrl}
            className="transition grow-0 border-4 border-black rounded-none shadow-[4px_4px_0_0_#000]"
          />
          <p>
            <b>URL</b>: {imgUrl}
          </p>
        </div>
      )}

      <input
        type="file"
        name="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        onChange={handleChange}
        disabled={isUploading}
      />
    </div>
  )
}
