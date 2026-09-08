import Link from "next/link"

type TitleProp = {
  children: React.ReactNode
  url: string
  as?: "h1" | "h2"
}

export function Title({ children, url, as: ElementTitle = "h2" }: TitleProp) {
  const TitleClassesCSS = {
    h1: "text-3xl/normal md:text-4xl/normal font-extrabold",
    h2: "text-2xl/tight md:text-2xl/tight font-bold",
  }

  return (
    <ElementTitle
      className={`
        md:mb-4
        ${TitleClassesCSS[ElementTitle]}`}
    >
      <Link href={url} className="group-hover:text-slate-600 transition">
        {children}
      </Link>
    </ElementTitle>
  )
}
