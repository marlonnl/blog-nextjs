import Link from "next/link"
import Image from "next/image"

import { Container } from "@/components/Container"
import { Header } from "@/components/Header"
import PostsList from "@/components/PostsList"
import { SpinLoader } from "@/components/SpinLoader"
import { Suspense } from "react"
import { Title } from "@/components/Title"

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
        <Link
          href="#"
          className="
          w-full
          h-full
          rounded-xl
          overflow-hidden
        "
        >
          <Image
            src="/images/bryen_0.png"
            width={1200}
            height={720}
            alt="título do post"
            priority
            className="group-hover:scale-105 transition w-full h-full object-cover"
          />
        </Link>
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
