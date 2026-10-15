"use client"

import { Input } from "@/components/Input"
import { MarkdownEditor } from "@/components/MarkdownEditor"
import { useState } from "react"
import { ImageUploader } from "../ImageUploader"

export function ManagePostForm() {
  const [contentValue, setContentValue] = useState("")

  return (
    <form action="" className="my-10">
      <div className="flex flex-col gap-6">
        <Input labelText="Título" placeholder="título do novo post" />

        <Input labelText="Autor" />

        <ImageUploader />

        <MarkdownEditor
          labelText="Texto"
          disabled={false}
          textAreaName="content"
          value={contentValue}
          setValue={setContentValue}
        />
      </div>
    </form>
  )
}
