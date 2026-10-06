"use client"

import { deletePostAction } from "@/actions/post/delete-post-action"
import { Trash2Icon } from "lucide-react"
import { useTransition } from "react"

type DeletePostButtonProps = {
  id: string
  title: string
}

export function DeletePostButton({ id, title }: DeletePostButtonProps) {
  const [isPending, startTransition] = useTransition()

  async function handleClick() {
    if (!confirm(`Tem certeza que deseja deletar o post de id ${id}?`)) return

    startTransition(async () => {
      const result = await deletePostAction(id)
      alert(`O retorno é: ${result}.`)
    })
  }

  return (
    <button
      aria-label={`Apagar post: ${title}`}
      title={`Apagar post: ${title}`}
      onClick={handleClick}
      disabled={isPending}
      className="
              cursor-pointer
              [&_svg]:box-content
              [&_svg]:w-4.5
              [&_svg]:h-4.5
              [&_svg]:px-1 [&_svg]:py-1
              [&_svg]:bg-red-600
              transition-all duration-100
              [&_svg]:text-stone-100
              [&_svg]:stroke-[2.5]

              border-4 border-black rounded-none
              shadow-[2px_2px_0_0_#000]
              hover:translate-x-px hover:translate-y-px hover:shadow-[1px_1px_0_0_#000]
              active:translate-x-0.5 active:translate-y-0.5 active:shadow-none

              disabled:cursor-not-allowed
              disabled:text-slate-600
              disabled:[&_svg]:bg-red-900
              "
    >
      <Trash2Icon size={18} />
    </button>
  )
}
