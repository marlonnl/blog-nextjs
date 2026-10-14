import { useId } from "react"

type InputCheckboxType = {
  labelText?: string
  type?: "checkbox"
} & React.ComponentProps<"input">

export function InputCheckbox({
  labelText,
  type = "checkbox",
  ...props
}: InputCheckboxType) {
  const id = useId()

  return (
    <div className="flex items-center gap-2 my-4">
      <input
        {...props}
        id={id}
        type={type}
        className={`
          peer
          appearance-none
          w-4 h-4
          bg-white border-2
          border-black shadow-[2px_2px_0px_0px_#000000]

          checked:bg-[#FFd23F]
          checked:translate-x-px
          checked:translate-y-px
          checked:shadow-none
          transition-all duration-150
          focus:outline-none
        `}
      />
      {labelText && (
        <label htmlFor={id} className="text-sm font-bold">
          {labelText}
        </label>
      )}
    </div>
  )
}
