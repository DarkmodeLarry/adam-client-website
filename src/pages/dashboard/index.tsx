import Link from 'next/link'
import type { FC } from 'react'
import Book from '../../../public/book.png'
import Image from 'next/image'
import Navbar from './navbar'
import type { Day } from '@prisma/client'

interface dashboardProps {
  days: Day[]
  closedDays: string[]
}

const dashboard: FC<dashboardProps> = ({ days, closedDays }) => {
  return (
    <div className='adminPage flex min-h-screen w-full justify-center font-medium'>
      <div className='border-2 relative w-full m-6 rounded-2xl shadow-2xl'>
        <Navbar days={days} closedDays={closedDays} />
        <Image src={Book} alt='Book' width={200} height={200} className='absolute top-10' />
        <div className='mt-80 block '>
          <Link
            className='rounded-full px-6 py-4 font-semibold text-xl bg-transparent  shadow-2xl mx-10'
            href='/dashboard/opening'
          >
            Opening hours
          </Link>
          <Link
            className='rounded-full px-6 py-4 bg-transparent font-semibold text-xl shadow-2xl'
            href='/dashboard/menu'
          >
            Menu
          </Link>
        </div>
      </div>
    </div>
  )
}

export default dashboard
