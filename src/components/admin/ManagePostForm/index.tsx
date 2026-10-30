"use client"

import { Input } from "@/components/Input"
import { MarkdownEditor } from "@/components/MarkdownEditor"
import { useActionState, useEffect, useState } from "react"
import { ImageUploader } from "../ImageUploader"
import { InputCheckbox } from "@/components/InputCheckbox"
import { makePartialPublicPost, PublicPost } from "@/dto/post"
import { Button } from "@/components/Button"
import { createPostAction } from "@/actions/post/create-post-action"
import { toast } from "react-toastify"

type ManagePostFormUpdateProps = {
  mode: "update"
  publicPost: PublicPost
}

type ManagePostFormCreateProps = {
  mode: "create"
}

type ManagePostFormProps = ManagePostFormUpdateProps | ManagePostFormCreateProps

export function ManagePostForm(props: ManagePostFormProps) {
  const { mode } = props
  let publicPost

  if (mode === "update") {
    publicPost = props.publicPost
  }

  const initialActionState = {
    formState: makePartialPublicPost(publicPost),
    errors: [],
  }

  const [state, action, isPending] = useActionState(
    createPostAction,
    initialActionState,
  )

  useEffect(() => {
    if (state.errors.length > 0) {
      toast.dismiss()
      state.errors.forEach(error => toast.error(error))
    }
  }, [state.errors])

  const { formState } = state
  const [contentValue, setContentValue] = useState(publicPost?.content || "")

  return (
    <form action={action} className="my-10">
      <div className="flex flex-col gap-6">
        <div className="flex gap-4 justify-between">
          <Input
            labelText="ID"
            title="O ID é gerado automaticamente"
            name="id"
            placeholder="ID gerado automaticamente"
            type="text"
            readOnly
            defaultValue={formState.id}
            className="w-[45%]"
          />

          <Input
            labelText="Slug"
            title="O slug é gerado automaticamente"
            name="slug"
            placeholder="slug"
            type="text"
            readOnly
            defaultValue={formState.slug}
            className="w-[50%]"
          />
        </div>

        <Input
          labelText="Autor"
          name="author"
          type="text"
          placeholder="autor"
          defaultValue={formState.author}
        />

        <Input
          labelText="Título"
          placeholder="título do novo post"
          name="title"
          type="text"
          defaultValue={formState.title}
        />
        <Input
          labelText="Trecho/resumo"
          placeholder="trecho ou resumo"
          name="excerpt"
          type="text"
          defaultValue={formState.excerpt}
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
            defaultValue={formState.coverImageUrl}
            className="w-[50%]"
          />

          <InputCheckbox
            labelText="Publicar postagem?"
            type="checkbox"
            name="published"
            defaultChecked={formState.published}
          />
        </div>

        <Button variant="default" size="lg">
          Enviar
        </Button>
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
