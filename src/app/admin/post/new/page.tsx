import { Button } from "@/components/Button"
import { BoxIcon, Trash2Icon } from "lucide-react"

export default async function AdminPostNewPage() {
  return (
    <>
      <div className="mb-8">
        <h2 className="text-2xl font-bold">Criar novo post</h2>
        <Button variant="default" size="sm">
          <BoxIcon />
          Confirmar
        </Button>
        <Button variant="ghost" size="md">
          <BoxIcon />
          Confirmar
        </Button>
        <Button variant="danger" size="lg">
          <BoxIcon />
          Confirmar
        </Button>
        <Button variant="delete" size="full">
          <Trash2Icon size={18} />
        </Button>
      </div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold">Criar novo post</h2>
        <Button variant="default" size="sm" disabled>
          <BoxIcon />
          Confirmar
        </Button>
        <Button variant="ghost" size="md" disabled>
          <BoxIcon />
          Confirmar
        </Button>
        <Button variant="danger" size="lg" disabled>
          <BoxIcon />
          Confirmar
        </Button>
        <Button variant="delete" size="full" disabled>
          <Trash2Icon size={18} />
        </Button>
      </div>
    </>
  )
}
