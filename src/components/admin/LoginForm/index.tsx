"use client"

import { loginAction } from "@/actions/login/login-action"
import { Button } from "@/components/Button"
import { Input } from "@/components/Input"
import { LogInIcon } from "lucide-react"
import { useActionState, useEffect } from "react"
import { toast } from "react-toastify"

export function LoginForm() {
  const initialState = {
    username: "",
    error: "",
  }

  const [state, action, isPending] = useActionState(loginAction, initialState)

  useEffect(() => {
    if (state.error) {
      toast.dismiss()
      toast.error(state.error)
    }
  }, [state])

  return (
    <div
      className="
      flex items-center flex-col gap-8
      max-w-sm mt-16 mb-32 mx-auto
    "
    >
      <h2 className="font-semibold text-2xl">Login</h2>

      <form action={action} className="flex flex-col gap-6">
        <Input
          type="text"
          name="username"
          labelText="Usuário"
          placeholder="nome de usuário"
          defaultValue={state.username}
          disabled={isPending}
        />

        <Input
          type="password"
          name="password"
          labelText="Senha"
          disabled={isPending}
        />

        <Button
          variant="default"
          type="submit"
          className="mt-4"
          disabled={isPending}
        >
          <LogInIcon />
          Entrar
        </Button>

        {!!state.error && <p className="text-red-700">{state.error}</p>}
      </form>
    </div>
  )
}
