import Link from "next/link"

export function Footer() {
  return (
    <footer className="pb-6 text-center mt-16">
      <p>
        copyright &copy; {new Date().getFullYear()} -{" "}
        <Link href="/">blogue</Link>
      </p>
    </footer>
  )
}
