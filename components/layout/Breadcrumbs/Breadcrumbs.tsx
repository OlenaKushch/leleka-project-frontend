'use client'

import { usePathname, useParams } from 'next/navigation'
import Link from 'next/link'
import { Fragment, useEffect, useState } from 'react'
import axios from 'axios'
import { DiaryEntry } from '@/interfaces/diary'
import styles from './Breadcrumbs.module.scss'

const routeMap: Record<string, string> = {
  '': 'Мій день',
  journey: 'Подорож',
  diary: 'Щоденник',
  profile: 'Профіль',
  auth: 'Авторизація',
  login: 'Вхід',
  register: 'Реєстрація',
  // Add other route mappings as needed
}

const ArrowSeparator = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={styles.separator}
  >
    <path
      d="M9.38721 6.67285C9.48803 6.67285 9.56501 6.70326 9.64307 6.78125L14.5874 11.7256C14.6413 11.7795 14.6665 11.8215 14.6782 11.8496V11.8506C14.693 11.8861 14.7017 11.9259 14.7017 11.9746C14.7017 12.0233 14.693 12.0631 14.6782 12.0986V12.0996C14.6665 12.1277 14.6413 12.1697 14.5874 12.2236L9.61865 17.1924C9.54088 17.2702 9.47374 17.292 9.39307 17.2891C9.29904 17.2856 9.21818 17.2537 9.13232 17.168C9.0542 17.0898 9.02295 17.013 9.02295 16.9121C9.02295 16.8112 9.0542 16.7344 9.13232 16.6562L13.814 11.9746L9.10693 7.26758C9.02927 7.18988 9.00733 7.12357 9.01025 7.04297C9.0137 6.9487 9.04627 6.86731 9.13232 6.78125C9.21025 6.70344 9.28662 6.67293 9.38721 6.67285Z"
      fill="black"
      stroke="black"
    />
  </svg>
)

export const Breadcrumbs = () => {
  const pathname = usePathname()
  const params = useParams()
  const [dynamicTitle, setDynamicTitle] = useState<string | null>(null)
  const entryIdFromUrl = params.entryId as string
  const API_BASE = process.env.NEXT_PUBLIC_API_URL

  useEffect(() => {
    const fetchEntryTitle = async () => {
      if (entryIdFromUrl && pathname?.includes('/diary/')) {
        try {
          const { data } = await axios.get<DiaryEntry[]>(`${API_BASE}/diaries/me`, {
            withCredentials: true,
          })
          const currentEntry = data.find((e: DiaryEntry) => e._id === entryIdFromUrl)
          if (currentEntry) {
            setDynamicTitle(currentEntry.title)
          }
        } catch (error: unknown) {
          console.error('Breadcrumbs: помилка завантаження заголовка', error)
        }
      } else {
        setDynamicTitle(null)
      }
    }

    fetchEntryTitle()
  }, [entryIdFromUrl, pathname, API_BASE])

  const isAuthPage = pathname?.startsWith('/auth')
  if (isAuthPage) return null

  const pathSegments = pathname?.split('/').filter(Boolean) || []

  const breadcrumbs = [
    { label: 'Лелека', href: '/', isHome: true },
    ...pathSegments.map((segment, index) => {
      const href = `/${pathSegments.slice(0, index + 1).join('/')}`
      let label = routeMap[segment] || segment

      if (segment === entryIdFromUrl && dynamicTitle) {
        label = dynamicTitle
      }

      return { label, href, isHome: false }
    }),
  ]

  // If we're on home page, show only current page name
  const displayBreadcrumbs =
    pathSegments.length === 0
      ? [
          { label: 'Лелека', href: '/', isHome: true },
          { label: routeMap[''], href: '/', isHome: false },
        ]
      : breadcrumbs

  return (
    <div className={styles.breadcrumbs}>
      {displayBreadcrumbs.map((crumb, index) => {
        const isLast = index === displayBreadcrumbs.length - 1
        return (
          <Fragment key={crumb.href + index}>
            {index > 0 && <ArrowSeparator />}
            {isLast ? (
              <span className={styles.current}>{crumb.label}</span>
            ) : (
              <Link href={crumb.href} className={styles.link}>
                {crumb.label}
              </Link>
            )}
          </Fragment>
        )
      })}
    </div>
  )
}
