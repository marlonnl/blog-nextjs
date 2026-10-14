"use client"

import { Input } from "@/components/Input"

export function ManagePostForm() {
  return (
    <form action="" className="my-10">
      <div className="flex flex-col gap-6">
        <Input labelText="Título" placeholder="título do novo post" />
        <Input labelText="Autor" />
      </div>
    </form>
  )
}
