'use client'
import { type NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { type DateTime } from '@types'
import Calendar from '../components/Calendar/'
import Spinner from '../components/Spinner'
import Menu from '../components/Menu'
import { trpc } from 'src/utils/trpc'

const Home: NextPage = () => {
  const [date, setDate] = useState<DateTime>({
    justDate: null,
    dateTime: null
  })

  useEffect(() => {
    if (date.dateTime) checkMenuStatus()
  }, [date])

  // tRPC
  const { mutate: checkMenuStatus, isSuccess } = trpc.menu.checkMenuStatus.useMutation()
  return (
    <>
      <Head>
        <title>Booking Software</title>
        <meta name='description' content='by SpLint3r' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main>
        {!date.dateTime && <Calendar setDate={setDate} date={date} />}
        {date.dateTime && isSuccess ? (
          <Menu />
        ) : (
          <div className='flex h-screen items-center justify-center'>
            <Spinner />
          </div>
        )}
      </main>
    </>
  )
}

export default Home
