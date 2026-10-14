import { useId } from "react"

type InputProps = {
  labelText?: string
} & React.ComponentProps<"input">

export function Input({ labelText, ...props }: InputProps) {
  const id = useId()

  return (
    <div className="flex flex-col gap-2">
      {labelText && (
        <label htmlFor={id} className="text-sm font-bold">
          {labelText}
        </label>
      )}
      <input
        className={`
          bg-stone-200
          placeholder-stone-600
          outline-0
          border-2
          shadow-[2px_2px_0_0_#000]
          p-2
          mb-6 w-full

          text-base/tight

          focus:shadow-[4px_4px_0_0_#000]
          focus:translate-x-0.5 focus:translate-y-0.5

          disabled:cursor-not-allowed
          disabled:shadow-[2px_2px_0_0_#7b3306]
          disabled:placeholder-stone-500
          disabled:border-amber-900

          read-only:bg-stone-300

          transition-all

          ${props.className}
       `}
        {...props}
        id={id}
      />
    </div>
  )
}
