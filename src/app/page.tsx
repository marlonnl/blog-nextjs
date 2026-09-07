import { Container } from "@/components/Container"
import { Header } from "@/components/Header"
import PostsList from "@/components/PostsList"
import { SpinLoader } from "@/components/SpinLoader"
import { Suspense } from "react"

export default async function HomePage() {
  return (
    <Container>
      <Header />

      <Suspense fallback={<SpinLoader />}>
        <PostsList />
      </Suspense>

      <footer>cpoyright</footer>
    </Container>
  )
}
