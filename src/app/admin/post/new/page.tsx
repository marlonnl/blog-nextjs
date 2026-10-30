import { ManagePostForm } from "@/components/admin/ManagePostForm"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Criar post",
}

export default async function AdminPostNewPage() {
  return (
    <div>
      <h2 className="font-bold">Criar novo post</h2>
      <ManagePostForm mode="create" />
    </div>
  )
}
