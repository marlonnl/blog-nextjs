"use server"

import { logColor } from "@/utils/log-color"

export async function deletePostAction(id: string) {
  logColor("" + id)
  return id
}
