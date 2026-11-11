"use server"

import { verifyPassword } from "@/lib/login/manage-login"
import { asyncDelay } from "@/utils/async-delay"

type LoginActionState = {
  username: string
  error: string
}

export async function loginAction(state: LoginActionState, formData: FormData) {
  await asyncDelay(3000)

  if (!(formData instanceof FormData)) {
    return {
      username: "",
      error: "Dados inválidos",
    }
  }

  const username = formData.get("username")?.toString().trim() || ""
  const password = formData.get("password")?.toString().trim() || ""

  if (!username || !password) {
    return {
      username: username,
      error: "Dados inválidos",
    }
  }

  // usuario valido?
  const isUserValid = username === process.env.LOGIN_USER
  const isPWValid = await verifyPassword(password, process.env.LOGIN_PASS || "")

  if (!isUserValid || !isPWValid) {
    return {
      username,
      error: "Usuário ou senha inválidos",
    }
  }

  // user & pwd válidos
  return {
    username,
    error: "Usuário LOGADO!!!",
  }
}
