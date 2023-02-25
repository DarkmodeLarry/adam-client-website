import Link from 'next/link'
import type { FC } from 'react'

const dashboard: FC = () => {
  return (
    <div className='flex flex-col items-center min-h-screen max-w-full bg-gray-100 p-5 '>
      <div className='w-full flex flex-col justify-center items-center shadow-2xl bg-gray-200 rounded-lg'>
        <h1 className='text-4xl text-gray-600 font-dmsans font-semibold text-center tracking-wide mt-5'>
          ADAM&apos;S DASHBOARD
        </h1>
        <div className='flex flex-col mt-10 justify-center items-center gap-10 w-full h-full my-44'>
          <Link className='adminBtn' href='/dashboard/opening'>
            Opening Hours
          </Link>
          <Link className='adminBtn adminBtnText' href='/dashboard/menu'>
            Menu
          </Link>
        </div>
      </div>
    </div>
  )
}

export default dashboard
