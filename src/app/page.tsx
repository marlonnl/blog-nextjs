import Link from "next/link"
import Image from "next/image"

import { Container } from "@/components/Container"
import { Header } from "@/components/Header"
import PostsList from "@/components/PostsList"
import { SpinLoader } from "@/components/SpinLoader"
import { Suspense } from "react"
import { Title } from "@/components/Title"
import PostCoverImage from "@/components/PostCoverImage"

export default async function HomePage() {
  return (
    <Container>
      <Header />

      <section
        className="
        grid grid-cols-1 gap-8 mb-16
        sm:grid-cols-2
        group
        "
      >
        <PostCoverImage
          linkProps={{ href: "#" }}
          imageProps={{
            alt: "Ir para a página do post",
            width: 1200,
            height: 720,
            src: "/images/bryen_8.png",
            priority: true,
          }}
        />
        <div className="flex flex-col sm:justify-center">
          <time dateTime="2026-07-09" className="text-slate-500 text-sm/snug">
            10:00 07/09/2026
          </time>
          <Title url="#">Título do post</Title>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore cum
            incidunt facere illo? Eveniet quia nostrum rem, quaerat est deserunt
            obcaecati. Iusto numquam quaerat alias nulla ipsam corporis
            temporibus laudantium!
          </p>
        </div>
      </section>

      <Suspense fallback={<SpinLoader />}>
        <PostsList />
      </Suspense>

      <footer>cpoyright</footer>
    </Container>
  )
}
