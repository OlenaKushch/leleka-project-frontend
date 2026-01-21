import CurrentWeek from './CurrentWeek/CurrentWeek'
import Countdown from './Countdown/Countdown'
import css from './StatusBlock.module.css'

interface StatusBlockProps {
  currentWeek: number
  daysLeft: number
}

const StatusBlock = ({ currentWeek, daysLeft }: StatusBlockProps) => {
  return (
    <section className={css.container}>
      <CurrentWeek week={currentWeek} />
      <Countdown daysLeft={daysLeft} />
    </section>
  )
}

export default StatusBlock
