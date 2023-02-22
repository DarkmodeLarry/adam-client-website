import Link from 'next/link'
import type { FC } from 'react'

const dashboard: FC = () => {
  return (
    <div className='flex min-h-screen max-h-screen max-w-full font-medium bg-gradient-to-t from-gray-200 via-gray-300 to-gray-500'>
      <div className='border-2 relative w-full m-6 rounded-md shadow-2xl shadow-gray-800'>
        <h1 className='text-6xl text-white text-center tracking-wider pt-10'>
          ADAM&apos;S DASHBOARD
        </h1>
        <div className='flex flex-col mt-24 items-center gap-16 w-full h-full'>
          <Link className='adminBtn' href='/dashboard/opening'>
            Opening Hours
          </Link>
          <Link className='adminBtn' href='/dashboard/menu'>
            Menu
          </Link>
        </div>
      </div>
    </div>
  )
}

export default dashboard
