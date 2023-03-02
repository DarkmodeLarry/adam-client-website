import React, { useState } from 'react'
import NavLink from './NavLink'
import { GiDolphin } from 'react-icons/gi'
import Avatar from '../../../public/Adamavatar.png'
import { Menu, User, Calendar } from 'react-feather'
import useMediaQuery from '../../hooks/useMediaQuery'
import { type SelectedPage } from '../../shared/types'
import Link from 'next/link'
import Image from 'next/image'

type Props = {
  isTopOfPage: boolean
  selectedPage: SelectedPage
  setSelectedPage: (value: SelectedPage) => void
}
const Header = ({ isTopOfPage, selectedPage, setSelectedPage }: Props) => {
  const flexBetween = 'flex items-center justify-between'
  const [isMenuToggled, setIsMenuToggled] = useState<boolean>(false)
  const isAboveMediumScreens = useMediaQuery('(min-width: 1060px)')
  const navbarBackground = isTopOfPage
    ? ''
    : 'bg-gray-900 rounded-full w-full flex justify-center items-center mt-4 transition-all duration-300 h-20 text-gray-100'
  return (
    <nav>
      <div
        className={`${navbarBackground} flex flex-nowrap justify-between  fixed top-0 z-30 w-full items-center px-5 h-24`}
      >
        {/* LEFT SIDE */}
        <div className='flex basis-3/12 items-center gap-4 font-montserrat'>
          <GiDolphin className='text-5xl text-gray-400' />
          <p className='font-montserrat font-bold tracking-widest text-gray-400'>Coach Adam</p>
        </div>

        {/* MIDDLE  */}
        {isAboveMediumScreens ? (
          <div className='w-full flex justify-end items-center'>
            <div
              className={`font-md text-md basis-7/12  flex w-full items-center  gap-8   font-dmsans text-gray-300 `}
            >
              <NavLink page='Home' selectedPage={selectedPage} setSelectedPage={setSelectedPage} />
              <NavLink page='About' selectedPage={selectedPage} setSelectedPage={setSelectedPage} />

              <NavLink
                page='Contact Us'
                selectedPage={selectedPage}
                setSelectedPage={setSelectedPage}
              />

              <div className='flex gap-4  font-semibold text-gray-200'>
                <Link href='/login' className={`${flexBetween} gap-8`}>
                  <p className='px-3 py-2 font-semibold transition-all hover:rounded-2xl hover:border-2 hover:text-yellow-400 hover:shadow-2xl'>
                    Sign In
                  </p>
                </Link>

                <div className='flex gap-3 border-2 border-transparent p-2 transition-all duration-150 hover:rounded-xl hover:border-2 hover:border-white hover:text-yellow-400'>
                  <NavLink
                    page='Calendar'
                    selectedPage={selectedPage}
                    setSelectedPage={setSelectedPage}
                  />
                  <Calendar />
                </div>
              </div>
            </div>
            <div className='basis-3/12 w-full justify-end flex'>
              <div className='flex items-center  gap-2 rounded-full bg-gradient-to-br from-teal-500 via-sky-600 to-cyan-500 p-2'>
                <Image
                  src={Avatar}
                  alt='avatar'
                  height={55}
                  width={55}
                  className=' rounded-full bg-yellow-500 border-4 border-cyan-800'
                />
                <p className='bg-gray-00 font-montserrat text-gray-900'>Welcome Back Swimmer!</p>
              </div>
            </div>
          </div>
        ) : (
          <div className='flex items-center justify-center gap-4 rounded-full bg-gradient-to-br from-teal-500 via-sky-600 to-cyan-500 px-2 py-1'>
            <button
              className='rounded-full border-2 border-gray-400 p-2 drop-shadow-lg bg-gray-400 transition-all duration-200 hover:scale-95 '
              onClick={() => setIsMenuToggled(!isMenuToggled)}
            >
              <Menu className='h-8 w-8 rounded-full text-gray-500  ' />
            </button>
            <Image
              src={Avatar}
              alt='avatar'
              height={55}
              width={55}
              className=' rounded-full bg-yellow-500 border-4 border-cyan-800'
            />
          </div>
        )}
      </div>

      {/* MOBILE MENU MODAL */}
      {!isAboveMediumScreens && isMenuToggled && (
        <div className='fixed right-0 bottom-0 z-40 h-full w-[300px] bg-gray-900 text-white  '>
          {/* CLOSE ICON */}
          <div className='flex justify-end mb-10 mr-8'>
            <div className='mt-8'>
              <button
                onClick={() => setIsMenuToggled(!isMenuToggled)}
                className='shadow-md shadow-gray-500 hover:scale-95 hover:border-4 border-4 border-gray-700 hover:border-yellow-400 bg-gray-700 rounded-full p-2 transition-all duration-200 ease-out'
              >
                <Menu className='h-12 w-12 rounded-full text-yellow-400  p-2 ' />
              </button>
            </div>
          </div>

          {/* MENU ITEMS */}
          <div className='raleway ml-[33%] flex flex-col gap-10  text-xl '>
            <NavLink page='Home' selectedPage={selectedPage} setSelectedPage={setSelectedPage} />
            <NavLink page='About' selectedPage={selectedPage} setSelectedPage={setSelectedPage} />
            <NavLink
              page='Calendar'
              selectedPage={selectedPage}
              setSelectedPage={setSelectedPage}
            />
            <NavLink
              page='Contact Us'
              selectedPage={selectedPage}
              setSelectedPage={setSelectedPage}
            />
            <Link href='/login' className={`${flexBetween} `}>
              <p className='px-3 py-2 transition-all hover:rounded-2xl hover:border-2 hover:text-yellow-400'>
                Sign In
              </p>
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Header
