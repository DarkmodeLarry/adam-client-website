import CalendarComponent from '@components/Calendar'
import type { Day } from '@prisma/client'
import { formatISO } from 'date-fns'
import type { NextPage } from 'next'
import Hero from '../scenes/Home'
import ContactUs from '../scenes/contactUs'
import About from '../scenes/about'
import { useState, useEffect } from 'react'
import { prisma } from '../server/db/client'
import { SelectedPage } from '../shared/types'
import Header from 'src/scenes/header'

interface HomeProps {
  days: Day[]
  closedDays: string[] // as ISO String
}

const Home: NextPage<HomeProps> = ({ days, closedDays }) => {
  const [selectedPage, setSelectedPage] = useState<SelectedPage>(SelectedPage.Home)
  const [isTopOfPage, setIsTopOfPage] = useState<boolean>(true)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY === 0) {
        setIsTopOfPage(true)
        setSelectedPage(SelectedPage.Home)
      }
      if (window.scrollY !== 0) setIsTopOfPage(false)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <Header
        isTopOfPage={isTopOfPage}
        selectedPage={selectedPage}
        setSelectedPage={setSelectedPage}
      />

      <main className='min-h-screen max-w-full flex flex-col justify-center items-center '>
        <Hero setSelectedPage={setSelectedPage} />
        <About setSelectedPage={setSelectedPage} />
        <CalendarComponent days={days} closedDays={closedDays} />
        <ContactUs setSelectedPage={setSelectedPage} />
      </main>
    </>
  )
}

export async function getServerSideProps() {
  const days = await prisma.day.findMany()
  const closedDays = (await prisma.closedDay.findMany()).map((d) => formatISO(d.date))
  return { props: { days, closedDays } }
}
export default Home
