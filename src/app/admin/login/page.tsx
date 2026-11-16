import { LoginForm } from "@/components/admin/LoginForm"
import ErrorMessage from "@/components/ErrorMessage"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Login",
}

export default async function AdminLoginPage() {
  const allowLogin = Boolean(Number(process.env.ALLOW_LOGIN))

  if (!allowLogin) {
    return (
      <ErrorMessage
        content="ALLOW_LOGIN: sistema de login está desabilitado."
        contentTitle="403"
      />
    )
  }

  return <LoginForm />
}
