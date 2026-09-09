import { format, formatDistanceToNow } from "date-fns"
import { ptBR } from "date-fns/locale"

export function datetimeFormatter(rawDatetime: string): string {
  const date = new Date(rawDatetime)
  return format(date, "dd/MM/yyyy - HH:mm", { locale: ptBR })
}

export function relativeDatatimeFormatter(rawDatetime: string): string {
  const date = new Date(rawDatetime)
  return formatDistanceToNow(date, { locale: ptBR, addSuffix: true })
}
