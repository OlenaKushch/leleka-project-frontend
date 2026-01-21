'use client'

import { useField, useFormikContext } from 'formik'
import styles from './OnboardingCustomDate.module.css'

interface FormValues {
  dueDate: string
}

interface OnboardingCustomDateProps {
  className?: string
}

export default function OnboardingCustomDate({
  className,
}: OnboardingCustomDateProps) {
  const [field, meta] = useField<string>('dueDate')
  const { submitCount } = useFormikContext<FormValues>()

  const today = new Date().toISOString().split('T')[0]

  const showError = submitCount > 0 && Boolean(meta.error)

  return (
    <div className={styles.wrapper}>
      <label className={styles.label}>Очікувана дата пологів</label>

      <input
        type="date"
        {...field}
        min={today}
        className={`${styles.input} ${
          showError ? styles.invalidInput : ''
        } ${className ?? ''}`}
      />

      {showError && <div className={styles.error}>{meta.error}</div>}
    </div>
  )
}