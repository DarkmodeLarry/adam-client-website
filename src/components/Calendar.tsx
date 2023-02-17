import type { Day } from '@prisma/client'
import { type FC } from 'react'
import dynamic from 'next/dynamic'
import { useState, useEffect } from 'react'
import { format, formatISO, isBefore, parse } from 'date-fns'
import { OPENING_HOURS_INTERVAL, now } from '../constants/config'
import type { DateTime } from 'src/utils/types'
import { useRouter } from 'next/router'
import { getOpeningTimes, roundToNearestMinutes } from 'src/utils/helpers'

const DynamicCalendar = dynamic(() => import('react-calendar'), { ssr: false })

interface CalendarProps {
  days: Day[]
  closedDays: string[] // as ISO strings
}

const CalendarComponent: FC<CalendarProps> = ({ days, closedDays }) => {
  const router = useRouter()

  // Determine if today is closed
  const today = days.find((d) => d.dayOfWeek === now.getDay())
  const rounded = roundToNearestMinutes(now, OPENING_HOURS_INTERVAL)
  const closing = parse(today!.closeTime, 'hh:mm aa', now)
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
  }, [date.dateTime, router])

  const times = date.justDate && getOpeningTimes(date.justDate, days)

  return (
    <section id='calendar' className='calendar max-w-full min-h-full bg-gray-900 p-10'>
      <p className='text-2xl text-gray-200 w-full text-center mb-10'>Select Appointment</p>
      <div className='flex'>
        <div className=' '>
          <DynamicCalendar
            minDate={now}
            className='REACT-CALENDAR p-2'
            view='month'
            tileDisabled={({ date }) => closedDays.includes(formatISO(date))}
            onClickDay={(date) => setDate((prev) => ({ ...prev, justDate: date }))}
          />
        </div>
        <div className='md:w-5/12 flex justify-center items-center relative w-full'>
          <div className='md:border-l-2 md:absolute md:right-0 md:top-0 md:border-gray-200 md:h-72'></div>
          <div className='gap-2 flex flex-wrap pl-8 h-64  justify-start items-center'>
            {date.justDate &&
              times?.map((time, i) => (
                <div key={`time-${i}`} className=''>
                  <button
                    type='button'
                    className='hover:bg-gray-200 w-16 h-8 flex flex-col justify-center items-center bg-gray-200 rounded-full border-2 hover:border-2 hover:border-gray-100 transition-all duration-300 ease-out '
                    onClick={() => setDate((prev) => ({ ...prev, dateTime: time }))}
                  >
                    {format(time, 'hh:mm')}
                  </button>
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default CalendarComponent
