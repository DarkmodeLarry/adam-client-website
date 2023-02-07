import { motion } from 'framer-motion'
import type { Day } from '@prisma/client'
import { type FC, SetStateAction } from 'react'
import { SelectedPage } from '@/shared/types'
import { useState, useEffect } from 'react'
import ReactCalendar from 'react-calendar'
import { format, formatISO, isBefore, parse } from 'date-fns'
import { OPENING_HOURS_INTERVAL, now } from '../../constants/config'
import type { DateTime } from '@types'
import { useRouter } from 'next/router'
import { getOpeningTimes, roundToNearestMinutes } from 'src/utils/helpers'
import Board from '../../../public/assets/boardt.png'
import DiveT from '../../../public/assets/glassDivet.png'
import StreamT from '../../../public/assets/SteamT.png'
import LadySwim from '../../../public/assets/ladySwim.png'
import Image from 'next/image'

interface CalendarProps {
  days: Day[]
  closedDays: string[] // as ISO strings
  setSelectedPage: (value: SelectedPage) => void
}

const Calendar: FC<CalendarProps> = ({ days, closedDays, setSelectedPage }: CalendarProps) => {
  const router = useRouter()

  // Determine if today is closed
  const today = days.find((d) => d.dayOfWeek === now.getDay())
  const rounded = roundToNearestMinutes(now, OPENING_HOURS_INTERVAL)
  const closing = parse(today!.closeTime, 'hh:mm', now)
  const tooLate = !isBefore(rounded, closing)
  if (tooLate) closedDays.push(formatISO(new Date().setHours(0, 0, 0, 0)))

  const [date, setDate] = useState<DateTime>({
    justDate: null,
    dateTime: null
  })

  useEffect(() => {
    if (date.dateTime) {
      localStorage.setItem('selectedTime', date.dateTime.toISOString())
      router.push('/menu')
    }
  }, [date.dateTime])

  const times = date.justDate && getOpeningTimes(date.justDate, days)

  return (
    <section
      id='calendar'
      className='calendar flex h-screen flex-col items-center justify-center relative'
    >
      <p className='text-2xl pb-5'>Select Appointment</p>
      {date.justDate ? (
        <div className='flex max-w-lg flex-wrap gap-4'>
          {times?.map((time, i) => (
            <div key={`time-${i}`} className=''>
              <button
                type='button'
                className='hover:bg-cyan-400 px-3 py-2 bg-gray-200 rounded-full border-2 hover:border-2 hover:border-gray-100 transition-all duration-300 ease-out '
                onClick={() => setDate((prev) => ({ ...prev, dateTime: time }))}
              >
                {format(time, 'hh:mm')}
              </button>
            </div>
          ))}
        </div>
      ) : (
        <ReactCalendar
          minDate={new Date()}
          className='REACT-CALENDAR p-2'
          view='month'
          tileDisabled={({ date }) => closedDays.includes(formatISO(date))}
          onClickDay={(date) => setDate((prev) => ({ ...prev, justDate: date }))}
        />
      )}
      <motion.div className='h-[150px] w-full  flex my-10 justify-evenly items-center'>
        <div></div>
        <Image
          alt='redbull-sponsor'
          src={DiveT}
          height={200}
          width={300}
          className='top-0 absolute right-0'
        />
        <Image alt='redbull-sponsor' src={StreamT} height={200} width={300} />
      </motion.div>
    </section>
  )
}

export default Calendar
