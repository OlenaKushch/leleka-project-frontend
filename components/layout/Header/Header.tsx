'use client'

import Link from 'next/link'
import styles from './Header.module.scss'
import AppLogo from '@/components/auth/AppLogo'
import { useUiStore } from '@/store/ui.store'
import { usePathname } from 'next/navigation'

export const Header = () => {
  const { openBurgerMenu } = useUiStore()
  const pathname = usePathname()

  const isAuthPage = pathname?.startsWith('/auth')
  if (isAuthPage) return null

  return (
    <header className={styles.header}>
      <Link href="/" className={styles.header__logo} aria-label="Мій день">
        <AppLogo className={styles.header__logo_img} />
      </Link>

      <button
        type="button"
        className={styles.header__burger}
        onClick={openBurgerMenu}
        aria-label="Відкрити меню"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M4 7H20M4 12H20M4 17H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>
    </header>
  )
}
