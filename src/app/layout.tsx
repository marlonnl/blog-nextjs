import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "blog",
  description: "aplicação criada com next.js",
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-br">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  )
}
