"use client"

import { Button } from "@/components/Button"
import { ImageUpIcon } from "lucide-react"
import { useRef } from "react"

export function ImageUploader() {
  const fileInputRef = useRef<HTMLInputElement>(null)

  function handleImageUploadClick() {
    if (!fileInputRef.current) return

    fileInputRef.current.click()
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
      />
    </div>
  )
}
