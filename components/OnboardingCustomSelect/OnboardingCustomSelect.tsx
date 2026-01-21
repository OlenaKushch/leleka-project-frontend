'use client'

import { useState, useRef, useEffect } from 'react'
import { useField } from 'formik'
import styles from './OnboardingCustomSelect.module.css'

const options = [
  { value: 'boy', label: 'Хлопчик' },       
  { value: 'girl', label: 'Дівчинка' },     
  { value: 'neutral', label: 'Ще не знаю' },
]

export default function OnboardingCustomSelect() {
  const [isOpen, setIsOpen] = useState(false)
  const [field, meta, helpers] = useField('theme') 
  const ref = useRef<HTMLDivElement>(null)

  const selectedOption = options.find(o => o.value === field.value)

  const handleSelect = (value: string) => {
    helpers.setValue(value)
    setIsOpen(false)
  }

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <div className={styles.wrapper} ref={ref}>
      <label className={styles.label}>Стать дитини</label>

      <button
        type="button"
        className={`${styles.control} ${isOpen ? styles.open : ''}`}
        onClick={() => setIsOpen(prev => !prev)}
      >
        <span className={!selectedOption ? styles.placeholder : ''}>
          {selectedOption?.label || 'Оберіть стать'}
        </span>

        <svg className={styles.arrow} aria-hidden="true">
          <use href="/sprite.svg#icon-keyboard_arrow_down" />
        </svg>
      </button>

      {isOpen && (
        <ul className={styles.dropdown}>
          {options.map(option => (
            <li
              key={option.value}
              className={styles.option}
              onClick={() => handleSelect(option.value)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}

      {meta.touched && meta.error && (
        <div className={styles.error}>{meta.error}</div>
      )}
    </div>
  )
}