import type { Day } from '@prisma/client'
import { type FC, SetStateAction } from 'react'
import { useState, useEffect } from 'react'
import ReactCalendar from 'react-calendar'
import { format, formatISO, isBefore, parse } from 'date-fns'
import { OPENING_HOURS_INTERVAL, now } from '../../constants/config'
import type { DateTime } from '@types'
import { useRouter } from 'next/router'
import { getOpeningTimes, roundToNearestMinutes } from 'src/utils/helpers'

interface CalendarProps {
  days: Day[]
  closedDays: string[] // as ISO strings
}

const index: FC<CalendarProps> = ({ days, closedDays }) => {
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
    <div className='flex h-screen flex-col items-center justify-center'>
      {date.justDate ? (
        <div className='flex max-w-lg flex-wrap gap-4'>
          {times?.map((time, i) => (
            <div key={`time-${i}`} className='rounded-full border-2 bg-gray-100 px-3 py-2'>
              <button
                type='button'
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
    </div>
  )
}

export default index
