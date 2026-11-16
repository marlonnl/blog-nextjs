import { MenuAdmin } from "@/components/admin/MenuAdmin"
import { SpinLoader } from "@/components/SpinLoader"
import { requireLoginSessionOrRedirect } from "@/lib/login/manage-login"
import { Suspense } from "react"

type RootAdminPostLayoutProps = {
  children: React.ReactNode
}

export default function RootAdminPostLayout({
  children,
}: Readonly<RootAdminPostLayoutProps>) {
  return (
    <Suspense fallback={<SpinLoader className="mg-16" />}>
      <AuthGate>{children}</AuthGate>
    </Suspense>
  )
}

async function AuthGate({ children }: Readonly<RootAdminPostLayoutProps>) {
  await requireLoginSessionOrRedirect()

  return (
    <>
      <MenuAdmin />
      {children}
    </>
  )
}
