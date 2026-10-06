import DialogButton from "../admin/DialogButton"

type DialogProps = {
  isVisible?: boolean
  title: string
  content: React.ReactNode
  disabled: boolean
  onConfirm: () => void
  onCancel: () => void
}

export default function Dialog({
  isVisible = false,
  title,
  content,
  disabled,
  onConfirm,
  onCancel,
}: DialogProps) {
  if (!isVisible) return null

  function handleCancel() {
    if (disabled) return
    onCancel()
  }

  return (
    <div
      onClick={handleCancel}
      className="
              fixed top-0 bottom-0 left-0 right-0
              bg-black/50 backdrop-blur-xs
              flex items-center justify-center
              z-50 inset-0
            "
    >
      <div
        onClick={e => e.stopPropagation()}
        role="dialog"
        aria-modal={true}
        aria-labelledby="dialog-title"
        aria-describedby="dialog-content"
        className="
                p-6 mx-6
                max-w-2xl
                bg-yellow-100 border-4
                flex flex-col gap-6
                shadow-[4px_4px_0_0_#000]
                "
      >
        <h3 id="dialog-title" className="font-bold text-2xl uppercase">
          {title}
        </h3>
        <div id="dialog-content">{content}</div>
        <div
          className="
                  flex justify-around items-center
                "
        >
          <DialogButton color="CONFIRM" disabled={disabled} onClick={onConfirm}>
            Confirmar
          </DialogButton>
          <DialogButton
            color="CANCEL"
            disabled={disabled}
            onClick={handleCancel}
            autoFocus
          >
            Cancelar
          </DialogButton>
        </div>
      </div>
    </div>
  )
}
