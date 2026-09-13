type PostSlugPageProps = {
  params: Promise<{ slug: string }>
}

export default async function PostSlugPage({ params }: PostSlugPageProps) {
  const { slug } = await params

  return <p>Dinamico de {slug}</p>
}
