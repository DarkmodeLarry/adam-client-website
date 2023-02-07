import Link from 'next/link'
import type { FC } from 'react'
import Book from '../../../public/book.png'
import Image from 'next/image'

const dashboard: FC = () => {
  return (
    <div className='adminPage flex h-screen w-full justify-center font-medium relative'>
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
  )
}

export default dashboard
