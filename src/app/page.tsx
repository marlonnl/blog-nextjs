import { Footer } from "@/components/Footer"
import PostsList from "@/components/PostsList"
import { SpinLoader } from "@/components/SpinLoader"
import { Suspense } from "react"

export default async function HomePage() {
  return (
    <>
      <Suspense fallback={<SpinLoader />}>
        <PostsList />
      </Suspense>

      <Footer />
    </>
  )
}
