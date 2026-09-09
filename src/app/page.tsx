import Link from "next/link"
import Image from "next/image"

import { Container } from "@/components/Container"
import { Header } from "@/components/Header"
import PostsList from "@/components/PostsList"
import { SpinLoader } from "@/components/SpinLoader"
import { Suspense } from "react"
import FeaturedPost from "@/components/FeaturedPost"

export default async function HomePage() {
  return (
    <Container>
      <Header />

      {/* <FeaturedPost /> */}

      <Suspense fallback={<SpinLoader />}>
        <PostsList />
      </Suspense>

      <footer>cpoyright</footer>
    </Container>
  )
}
