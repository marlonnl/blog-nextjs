"use client"

import { deletePostAction } from "@/actions/post/delete-post-action"
import Dialog from "@/components/Dialog"
import { Trash2Icon } from "lucide-react"
import { useState, useTransition } from "react"

type DeletePostButtonProps = {
  id: string
  title: string
}

export function DeletePostButton({ id, title }: DeletePostButtonProps) {
  const [isPending, startTransition] = useTransition()
  const [showDialog, setShowDialog] = useState(false)

  async function handleClick() {
    setShowDialog(true)
  }

  function handleConfirm() {
    startTransition(async () => {
      const result = await deletePostAction(id)
      setShowDialog(false)
    })
  }

  return (
    <>
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

      {showDialog && (
        <Dialog
          isVisible={true}
          disabled={isPending}
          onCancel={() => setShowDialog(false)}
          onConfirm={handleConfirm}
          title={"Deletar postagem"}
          content={
            <p>
              Você tem certeza de que deseja apagar o post <i>{title}</i>?
            </p>
          }
        />
      )}
    </>
  )
}
