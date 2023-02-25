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
    <section
      id='calendar'
      className='calendar  justify-center w-full bg-gray-900 flex flex-col items-center '
    >
      <h1 className='text-2xl md:text-4xl font-montserrat my-10 text-center text-white'>
        Select an Appointment
      </h1>
      <div className='flex flex-col md:flex-row w-full items-center'>
        <div className='w-1/2 flex flex-col gap-10 justify-center items-center '>
          <p className='text-2xl text-gray-200 w-full text-center font-montserrat'>
            Pick a Date
          </p>
          <DynamicCalendar
            minDate={now}
            className='REACT-CALENDAR p-2 md:mb-10'
            view='month'
            tileDisabled={({ date }) => closedDays.includes(formatISO(date))}
            onClickDay={(date) =>
              setDate((prev) => ({ ...prev, justDate: date }))
            }
          />
        </div>

        <div className='md:w-1/2 w-full mt-10 md:mt-0 px-1'>
          <h3 className='text-white text-center font-montserrat tracking-wider w-full text-2xl'>
            Pick a Time
          </h3>
          <div className='gap-2 flex flex-wrap items-center p-2 mt-5 mb-44'>
            {date.justDate &&
              times?.map((time, i) => (
                <div key={`time-${i}`} className=''>
                  <button
                    type='button'
                    className='flex font-semibold text-md text-black w-28 h-10 justify-center items-center bg-gray-100 shadow-md shadow-gray-500 rounded-lg border-2  transition-all duration-300 ease-in-out hover:scale-95 hover:bg-gray-700 hover:border-white hover:text-gray-100'
                    onClick={() =>
                      setDate((prev) => ({ ...prev, dateTime: time }))
                    }
                  >
                    {format(time, 'hh:mm aa')}
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
