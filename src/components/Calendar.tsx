import type { Day } from '@prisma/client'
import { format, formatISO, isBefore, parse } from 'date-fns'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { type FC } from 'react'
import { useState, useEffect } from 'react'
import { OPENING_HOURS_INTERVAL, now } from '../constants/config'
import { getOpeningTimes, roundToNearestMinutes } from 'src/utils/helpers'
import type { DateTime } from 'src/utils/types'

const DynamicCalendar = dynamic(() => import('react-calendar'), { ssr: false })

interface CalendarProps {
  days: Day[]
  closedDays: string[] // as ISO strings
}

interface DateType {
  justDate: Date | null
  dateTime: Date | null
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
<<<<<<< HEAD
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
=======
      className='calendar flex flex-col justify-center items-center max-w-full pt-6 bg-gray-900 w-full'
    >
      <h2 className='text-center text-3xl font-montserrat py-8 text-white'>
        Book A Training Session
      </h2>

      <div className='flex flex-col md:flex-row w-full justify-center items-center pb-20'>
        {/* Calendar */}
        <div className='w-1/2 flex flex-col h-full justify-center items-center space-y-4'>
          <p className='text-2xl text-gray-200 text-center flex'>Select A Date</p>
>>>>>>> fc4c2af (env variables updated)
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

<<<<<<< HEAD
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
=======
        {/* TIME SLOTS */}
        <div className='flex flex-col h-full items-center w-1/2'>
          <div className='bg-gray-900 px-28 flex flex-col space-y-4'>
            <p className='text-2xl w-full text-gray-200 text-center'>Select a Timeslot</p>
            <div className='gap-2 flex flex-wrap  h-64 justify-center items-center'>
              {date.justDate &&
                times?.map((time, i) => (
                  <div key={`time-${i}`} className='bg-gray-900'>
                    <button
                      type='button'
                      className='hover:bg-gray-200 w-24 h-10 flex flex-col justify-center items-center bg-gray-200 rounded-full border-2 hover:border-2 hover:border-gray-100 transition-all duration-300 ease-out '
                      onClick={() => setDate((prev) => ({ ...prev, dateTime: time }))}
                    >
                      {format(time, 'hh:mm aa')}
                    </button>
                  </div>
                ))}
            </div>
>>>>>>> fc4c2af (env variables updated)
          </div>
        </div>
      </div>
    </section>
  )
}

export default CalendarComponent
