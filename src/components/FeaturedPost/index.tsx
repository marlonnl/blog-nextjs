import PostCoverImage from "../PostCoverImage"
import { Title } from "../Title"

export default function FeaturedPost() {
  const slug = "aaa"
  const postLink = `/post/${slug}`

  return (
    <section
      className="
            grid grid-cols-1 gap-8 mb-16
            sm:grid-cols-2
            group
            "
    >
      <PostCoverImage
        linkProps={{ href: postLink }}
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
        <Title url={postLink} as="h1">
          Título do post
        </Title>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore cum
          incidunt facere illo? Eveniet quia nostrum rem, quaerat est deserunt
          obcaecati. Iusto numquam quaerat alias nulla ipsam corporis temporibus
          laudantium!
        </p>
      </div>
    </section>
  )
}
