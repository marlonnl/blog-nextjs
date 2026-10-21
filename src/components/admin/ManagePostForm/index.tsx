"use client"

import { Input } from "@/components/Input"
import { MarkdownEditor } from "@/components/MarkdownEditor"
import { useState } from "react"
import { ImageUploader } from "../ImageUploader"
import { InputCheckbox } from "@/components/InputCheckbox"
import { PublicPost } from "@/dto/post"
import { Button } from "@/components/Button"

type ManagePostFormProps = {
  publicPost?: PublicPost
}

export function ManagePostForm({ publicPost }: ManagePostFormProps) {
  const [contentValue, setContentValue] = useState(publicPost?.content || "")

  return (
    <form action="" className="my-10">
      <div className="flex flex-col gap-6">
        <div className="flex gap-4 justify-between">
          <Input
            labelText="ID"
            title="O ID é gerado automaticamente"
            name="id"
            placeholder="ID gerado automaticamente"
            type="text"
            readOnly
            defaultValue={publicPost?.id || ""}
            className="w-[45%]"
          />

          <Input
            labelText="Slug"
            title="O slug é gerado automaticamente"
            name="slug"
            placeholder="slug"
            type="text"
            readOnly
            defaultValue={publicPost?.slug || ""}
            className="w-[50%]"
          />
        </div>

        <Input
          labelText="Autor"
          name="author"
          type="text"
          placeholder="autor"
          defaultValue={publicPost?.author || ""}
        />

        <Input
          labelText="Título"
          placeholder="título do novo post"
          name="title"
          type="text"
          defaultValue={publicPost?.title || ""}
        />
        <Input
          labelText="Trecho/resumo"
          placeholder="trecho ou resumo"
          name="excerpt"
          type="text"
          defaultValue={publicPost?.excerpt || ""}
        />

        <MarkdownEditor
          labelText="Texto"
          disabled={false}
          textAreaName="content"
          value={contentValue}
          setValue={setContentValue}
        />

        <ImageUploader />

        <div className="flex gap-12 justify-baseline items-end">
          <Input
            labelText="URL da imagem de capa"
            name="coverImageUrl"
            placeholder="coloque a url da imagem para ser usada como capa"
            type="text"
            defaultValue={publicPost?.coverImageUrl || ""}
            className="w-[50%]"
          />

          <InputCheckbox
            labelText="Publicar postagem?"
            type="checkbox"
            name="published"
            defaultChecked={publicPost?.published || false}
          />
        </div>

        <Button>Enviar</Button>
      </div>
    </form>
  )
}

// conteudo do form
// id e slug (gerados automaticamente)
// title, excerpt, content
// cover image
// created at e updated at (gerado automaticamente)
// author
