type DialogButtonProps = {
  children: React.ReactNode
  color: "CONFIRM" | "CANCEL"
} & React.ComponentProps<"button">

export default function DialogButton({
  children,
  color,
  ...rest
}: DialogButtonProps) {
  const buttonColors = {
    CONFIRM: "bg-[#FFD93D] hover:bg-[#FFC800]",
    CANCEL: "bg-[#FF6B9D] hover:bg-[#FF4D8B]",
  }

  return (
    <button
      {...rest}
      className={`
      text-black font-bold
        ${buttonColors[color]}
        cursor-pointer
        transition

        flex items-center justify-center

        py-2 px-4

        border-4 border-black rounded-none
        shadow-[4px_4px_0_0_#000]
        hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_0_#000]
        active:translate-x-1 active:translate-y-1 active:shadow-none

        disabled:bg-slate-500
        disabled:cursor-not-allowed
    `}
    >
      {children}
    </button>
  )
}
