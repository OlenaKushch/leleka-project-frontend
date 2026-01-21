type AppLogoProps = {
  size?: number
  className?: string
}

export default function AppLogo({ size = 30, className }: AppLogoProps) {
  return (
    <svg width={size} height={size} className={className} role="img" aria-label="Логотип Лелека">
      <use href="/sprite.svg#icon-logo" />
    </svg>
  )
}
