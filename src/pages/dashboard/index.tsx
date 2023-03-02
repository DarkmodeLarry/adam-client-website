import Link from 'next/link'
import type { FC } from 'react'
import Dolphins from '../../../public/dolphins.png'
import Image from 'next/image'
import { AiOutlineSchedule } from 'react-icons/ai'
import { IoMdTimer } from 'react-icons/io'
import { RiDashboardLine } from 'react-icons/ri'

const dashboard: FC = () => {
  return (
    <div className='flex flex-col justify-center items-center h-screen max-w-full bg-gray-300 relative'>
      <div className='fixed top-0 h-16 border-2 w-full flex justify-end items-center'>
        <div className='h-12 w-12 rounded-full border-2 border-blue-400 mr-4'></div>
      </div>
      <div className='flex flex-col items-center w-[300px] h-full fixed left-0 bg-gray-700 text-gray-100 shadow-2xl shadow-gray-600 '>
        <div className='text-center w-full py-2 '>
          <Image src={Dolphins} alt='dolphins' width={100} height={100} className='py-6 pl-2' />

          <div className='w-full flex justify-center items-center gap-1 text-2xl tracking-wide shadow-gray-800 border-2 border-gray-600 shadow-lg py-6  bg-gray-700 rounded-md'>
            <RiDashboardLine />
            <h2 className='text-amber-500 font-bold'>Dashboard</h2>
          </div>
        </div>

        <div className='flex flex-col pl-2  space-y-2 mt-6 w-full h-full font-semibold items-center md:text-center text-lg '>
          <div className='w-full flex gap-6 items-center text-left h-16 hover:scale-105 transition-all duration-200 hover:shadow-lg'>
            <div className='pl-2 h-14 flex justify-end items-center '>
              <IoMdTimer className='text-amber-500 text-2xl text-right' />
            </div>
            <div className='h-14 flex items-center '>
              <Link className='text-left' href='/dashboard/opening'>
                Opening Hours
              </Link>
            </div>
          </div>
          <div className='w-full flex gap-6 items-center text-left h-16 font-semibold hover:scale-105 hover:shadow-lg transition-all duration-200'>
            <div className='pl-2 h-14 flex justify-end items-center '>
              <AiOutlineSchedule className=' text-right text-amber-500 text-2xl ' />
            </div>
            <div className='h-14 flex items-center '>
              <Link className='text-left' href='/dashboard/menu'>
                Menu
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default dashboard
