'use client'
import Header from '../scenes/header'
import Hero from '../scenes/Home'
import OurClasses from '../scenes/ourClasses'
import ContactUs from '../scenes/contactUs'
import Benefits from '../scenes/benefits'
import { useState, useEffect } from 'react'
import { type NextPage } from 'next'
import Calendar from '../components/Calendar'
import { prisma } from '../server/db/client'
import { formatISO } from 'date-fns'
import type { Day } from '@prisma/client'
import { SelectedPage } from '../shared/types'

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

      <main>
        <Hero setSelectedPage={setSelectedPage} />
        <Benefits setSelectedPage={setSelectedPage} />
        <OurClasses setSelectedPage={setSelectedPage} />
        <ContactUs setSelectedPage={setSelectedPage} />
        <Calendar days={days} closedDays={closedDays} />
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
