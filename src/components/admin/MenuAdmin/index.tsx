"use client"

import {
  CircleXIcon,
  FileTextIcon,
  HouseIcon,
  MenuIcon,
  PlusCircleIcon,
} from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export function MenuAdmin() {
  const [isOpen, setIsOpen] = useState(false)

  const linkStyle = `
    [&>svg]:w-[16px] [&>svg]:h-[16px]
    flex justify-start items-center gap-1.5
    shrink-0

    p-2
    h-10

    cursor-pointer

    hover:bg-stone-300
    transition
  `

  return (
    <nav
      className={`
      flex flex-col
      mb-8

      sm:flex-row
      sm:flex-wrap
      sm:overflow-visible sm:h-auto

      text-stone-700
      bg-stone-200

      ${!isOpen && "overflow-hidden h-10"}
    `}
    >
      <button
        aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
        title={isOpen ? "Fechar menu" : "Abrir menu"}
        onClick={() => setIsOpen(s => !s)}
        className={`${linkStyle} text-amber-800 italic sm:hidden`}
      >
        {!isOpen ? (
          <>
            <MenuIcon /> menu
          </>
        ) : (
          <>
            <CircleXIcon />
            fechar
          </>
        )}
      </button>

      <a
        href="/"
        target="_blank"
        aria-label="Ir para a home"
        title="Ir para a home"
        className={linkStyle}
      >
        <HouseIcon /> home
      </a>

      <Link
        href="/admin/post"
        aria-label="Ir para lista de posts"
        title="Ir para lista de posts"
        className={linkStyle}
      >
        <FileTextIcon /> posts
      </Link>

      <Link
        href="/admin/post/new"
        aria-label="Criar novo post"
        title="Criar novo post"
        className={linkStyle}
      >
        <PlusCircleIcon /> novo post
      </Link>
    </nav>
  )
}
