import type { Metadata } from "next"

import "./globals.css"

import { Container } from "@/components/Container"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"

export const metadata: Metadata = {
  title: {
    default: "blogue",
    template: "%s | blogue",
  },
  description: "aplicação criada com next.js",
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-br">
      <body className="min-h-full flex flex-col">
        <Container>
          <Header />
          {children}
          <Footer />
        </Container>
      </body>
    </html>
  )
}
