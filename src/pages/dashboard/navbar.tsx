import { Coffee, Users, Calendar, Clock, CreditCard, Edit } from 'react-feather'
import Opening from './opening'
import { FC } from 'react'
import type { Day } from '@prisma/client'
import { NextPage } from 'next'

type NavbarProps = {
  days: Day[]
  closedDays: string[]
}

const Navbar: FC<NavbarProps> = ({ days }) => {
  return (
    <>
      <nav className='max-w-xs border-2 left-6 rounded-2xl fixed '>
        <div className='text-white p-2 flex flex-col justify-center items-center border-b-2 '>
          <h2 className='text-lg tracking-widest font-bold'>Adam Gonzales</h2>
          <p>Swim Team</p>
        </div>
        <ul className='text-white space-y-10 p-8'>
          <li className='flex gap-3'>
            <Opening days={days} />

            <Coffee />
            <label htmlFor='#'>Good morning Adam</label>
          </li>
          <li className='flex gap-3'>
            <Calendar />
            <label htmlFor='#'>Bookings</label>
          </li>
          <li className='flex gap-3'>
            <Clock />
            <label htmlFor='#'>Availability</label>
          </li>
          <li className='flex gap-3'>
            <Users />
            <label htmlFor='#'>Students</label>
          </li>
          <li className='flex gap-3'>
            <CreditCard />
            <label htmlFor='#'>Business</label>
          </li>
          <li className='flex gap-3'>
            <Edit />
            <label htmlFor='#'>Edit Classes</label>
          </li>
        </ul>
      </nav>
    </>
  )
}

export default Navbar
