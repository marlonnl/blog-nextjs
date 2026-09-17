import ReactMarkDown from "react-markdown"
import rehypeSanitize from "rehype-sanitize"
import remarkGfm from "remark-gfm"

type SafeMDProps = {
  markdown: string
}

export default function SafeMD({ markdown }: SafeMDProps) {
  return (
    <div
      className="
    prose prose-slate
    w-full max-w-none
    overflow-hidden

    prose-a:no-underline
    prose-a:hover:underline
    prose-a:text-blue-600
    prose-a:hover:text-blue-800
    prose-a:transition

    prose-img:mx-auto

    md:prose-lg
    "
    >
      <ReactMarkDown
        rehypePlugins={[rehypeSanitize]}
        remarkPlugins={[remarkGfm]}
        components={{
          table: ({ node, ...props }) => {
            if (!node?.children) return ""
            return (
              <div className="overflow-x-auto">
                <table className="w-full min-w-150" {...props} />
              </div>
            )
          },
        }}
      >
        {markdown}
      </ReactMarkDown>
    </div>
  )
}
