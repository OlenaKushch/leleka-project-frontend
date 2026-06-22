interface CloseButtonProps {
  onClick: () => void
  className?: string
  disabled?: boolean
  label?: string
}

export function CloseButton({
  onClick,
  className,
  disabled = false,
  label = 'Закрити',
}: CloseButtonProps) {
  return (
    <button
      type="button"
      className={className}
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
    >
      ×
    </button>
  )
}
