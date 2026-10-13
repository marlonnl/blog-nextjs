type ButtonVariants = "default" | "ghost" | "danger" | "delete"
type ButtonSizes = "sm" | "md" | "lg" | "full"

type ButtonProps = {
  children: React.ReactNode
  variant: ButtonVariants
  size?: ButtonSizes
} & React.ComponentProps<"button">

export function Button({
  children,
  variant = "default",
  size = "md",
  ...props
}: ButtonProps) {
  const buttonVariants: Record<ButtonVariants, string> = {
    default: "bg-[#FFD93D] hover:bg-[#FFC800]",
    ghost: "bg-slate-300 hover:bg-slate-400",
    danger: "bg-[#FF6B9D] hover:bg-[#FF4D8B]",
    delete: `
      [&_svg]:bg-red-600
      disabled:cursor-not-allowed
      disabled:text-slate-600
      disabled:[&_svg]:bg-red-900
    `,
  }

  const buttonSizes: Record<ButtonSizes, string> = {
    sm: "text-xs/tight py-1.5 px-2.5 [&_svg]:w-4 gap-1",
    md: "text-base/tight py-2 px-4 [&_svg]:w-5 gap-1",
    lg: "text-lg/tight py-3 px-5 [&_svg]:w-5 gap-1",
    full: `
      [&_svg]:box-content
      [&_svg]:w-4.5
      [&_svg]:h-4.5
      [&_svg]:px-1 [&_svg]:py-1
      [&_svg]:text-stone-100
      [&_svg]:stroke-[2.5]`,
  }

  const buttonClasses = `
    ${buttonVariants[variant]}
    ${buttonSizes[size]}

    ${props.className}

    text-black font-bold
    cursor-pointer
    transition


    flex items-center justify-center

    border-4 border-black rounded-none
    shadow-[4px_4px_0_0_#000]
    hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_0_#000]
    active:translate-x-1 active:translate-y-1 active:shadow-none

    disabled:hover:translate-x-0
    disabled:hover:translate-y-0
    disabled:hover:shadow-[4px_4px_0_0_#000]
    disabled:bg-slate-400
    disabled:cursor-not-allowed
  `

  return (
    <button {...props} className={buttonClasses}>
      {children}
    </button>
  )
}
