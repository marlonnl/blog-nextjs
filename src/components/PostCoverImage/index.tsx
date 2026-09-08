import Image from "next/image"
import Link from "next/link"

type PostCoverImageProps = {
  imageProps: React.ComponentProps<typeof Image>
  linkProps: React.ComponentProps<typeof Link>
}

export default function PostCoverImage({
  imageProps,
  linkProps,
}: PostCoverImageProps) {
  return (
    <Link
      {...linkProps}
      className={`
        w-full
        h-full
        rounded-xl
        overflow-hidden
        ${linkProps.className}
        `}
    >
      <Image
        {...imageProps}
        alt={imageProps.alt}
        className={`
          group-hover:scale-105 transition w-full h-full object-cover
          ${imageProps.className}
          `}
      />
    </Link>
  )
}
