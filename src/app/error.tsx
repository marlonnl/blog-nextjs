"use client" // ao definir o componente como client, todos os componentes importados nele também passam a ser client

import ErrorMessage from "@/components/ErrorMessage"
import { useEffect } from "react"

type RootErrorPageType = {
  error: Error
  reset: () => void
}

export default function RootErrorPage({ error }: RootErrorPageType) {
  useEffect(() => {
    console.log(error)
  }, [error])

  return (
    <ErrorMessage
      pageTitle="Internal Server Error"
      contentTitle="501"
      content="Ocorreu um erro inesperado. Tente novamente mais tarde."
    />
  )
}
