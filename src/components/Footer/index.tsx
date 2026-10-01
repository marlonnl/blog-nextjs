import { cacheLife } from "next/cache"
import Link from "next/link"

export async function Footer() {
  "use cache"
  cacheLife("days")

  return (
    <footer className="pb-6 text-center">
      <p>
        copyright &copy; {new Date().getFullYear()} -{" "}
        <Link href="/">blogue</Link>
      </p>
    </footer>
  )
}
