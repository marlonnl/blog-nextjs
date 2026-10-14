import MDEditor from "@uiw/react-md-editor"
import { useId, useState } from "react"
import rehypeSanitize from "rehype-sanitize"
import remarkGfm from "remark-gfm"

type MarkdownEditorProps = {
  labelText?: string
  value: string
  textAreaName: string
  disabled?: boolean
  setValue: React.Dispatch<React.SetStateAction<string>>
}

export function MarkdownEditor({
  labelText,
  value,
  textAreaName,
  disabled = false,
  setValue,
}: MarkdownEditorProps) {
  const id = useId()

  // const [value, setValue] = useState("a")

  return (
    <div>
      <MDEditor
        value={value}
        onChange={value => {
          if (value === undefined) return
          setValue(value)
        }}
        height={300}
        extraCommands={[]}
        preview="edit"
        hideToolbar={disabled}
        textareaProps={{
          id,
          name: textAreaName,
          disabled: disabled,
        }}
        previewOptions={{
          rehypePlugins: [[rehypeSanitize]],
          remarkPlugins: [[remarkGfm]],
        }}
        className={`
          bg-stone-200
          placeholder-stone-600
          `}
      />
    </div>
  )
}
