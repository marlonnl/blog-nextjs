import {
  relativeDatatimeFormatter,
  datetimeFormatter,
} from "@/utils/datetime-formatter"

type PostDateProps = {
  dateTime: string
}

export default function PostDate({ dateTime }: PostDateProps) {
  return (
    <time
      dateTime={dateTime}
      title={relativeDatatimeFormatter(dateTime)}
      className="text-slate-500 text-sm/snug"
    >
      {datetimeFormatter(dateTime)}
    </time>
  )
}
