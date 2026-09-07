import Link from "next/link"

type TitleProp = {
  children: React.ReactNode
  url: string
  as?: "h1" | "h2"
}

export function Title({ children, url, as: ElementTitle = "h2" }: TitleProp) {
  const TitleClassesCSS = {
    h1: "text-3xl/normal md:text-4xl/normal",
    h2: "text-2xl/tight md:text-3xl/normal",
  }

  return (
    <ElementTitle
      className={`
        font-extrabold
        md:mb-4
        ${TitleClassesCSS[ElementTitle]}`}
    >
      <Link href={url}>{children}</Link>
    </ElementTitle>
  )
}
