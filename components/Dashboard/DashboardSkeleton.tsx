import css from './DashboardSkeleton.module.css'

export function DashboardSkeleton() {
  return (
    <div className={css.container}>
      <div className={css.greeting} />
      <div className={css.column}>
        <div className={css.left}>
          <div className={css.block} />
          <div className={css.imageBlock} />
          <div className={css.block} />
        </div>
        <div className={css.right}>
          <div className={css.block} />
          <div className={css.block} />
        </div>
      </div>
    </div>
  )
}
