"use server"

import { revalidatePath } from "next/cache"

export async function revalidadeExampleAction(formData: FormData) {
  const path = formData.get("path") || ""
  revalidatePath(`${path}`)
}
