import styles from './Loader.module.css'

interface LoaderProps {
  // 'fullscreen' - для завантаження сторінок
  // 'inline' - для кнопок або невеликих блоків
  variant?: 'fullscreen' | 'inline'
}

export const Loader = ({ variant = 'inline' }: LoaderProps) => {
  return (
    <div className={`${styles.wrapper} ${styles[variant]}`}>
      <div className={styles.spinner}></div>
    </div>
  )
}
