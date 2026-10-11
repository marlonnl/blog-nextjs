import { MenuAdmin } from "@/components/admin/MenuAdmin"

type RootAdminPostLayoutProps = {
  children: React.ReactNode
}

export default function RootAdminPostLayout({
  children,
}: Readonly<RootAdminPostLayoutProps>) {
  return (
    <>
      <MenuAdmin />
      {children}
    </>
  )
}
