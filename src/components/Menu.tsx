'use client'
import { Button } from '@chakra-ui/react'
import { format, parseISO } from 'date-fns'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { type FC, useState } from 'react'
import { HiArrowLeft } from 'react-icons/hi'
import Select from 'react-select'
import { capitalize, selectOptions } from 'src/utils/helper'
import { trpc } from 'src/utils/trpc'
import Consultation from '../../public/coaching.png'
import Team from '../../public/team.png'

interface MenuProps {
  selectedTime: string // as ISO string
  addToCart: (id: string, quantity: number) => void
}

const Menu: FC<MenuProps> = ({ selectedTime, addToCart }) => {
  const router = useRouter()
  const { data: menuItems } = trpc.menu.getMenuItems.useQuery(undefined, { refetchOnMount: false })

  const [filter, setFilter] = useState<string | undefined>(undefined)

  const filteredMenuItems = menuItems?.filter((menuItem) => {
    if (!filter) return true
    return menuItem.categories.includes(filter)
  })

  return (
    <div className='flex flex-col w-11/12 bg-gray-200 m-10 rounded-lg'>
      <h2 className='flex items-center gap-4 text-xl font-normal font-sans tracking-wider text-gray-700 my-6 px-4'>
        <HiArrowLeft className='cursor-pointer' onClick={() => router.push('/')} />
        Our Training Options for :
        <span className='text-md font-bold text-[1.2rem] text-gray-800 '>
          [{format(parseISO(selectedTime), 'MMM do, yyyy')}]
        </span>
      </h2>
      <div className='w-full font-bold p-2 tracking-widest text-lg '>
        <Select
          onChange={(e) => {
            if (e?.value === 'all') setFilter(undefined)
            else setFilter(e?.value)
          }}
          className='border-none outline-none'
          placeholder='Filter by...'
          options={selectOptions}
        />
      </div>
      <div className='flex'>
        <div className='bg-gray-200 h-[400px] w-full ml-3'>
          <div className='border-2 rounded-md shadow-lg max-w-[400px] h-36 bg-gray-800 my-2  text-gray-200 flex'>
            <Image
              src={Consultation}
              alt='consultation'
              width={180}
              className='p-2 h-auto rounded-lg'
            />

            <div className='font-dmsans flex flex-col p-2 text-gray-200 w-full justify-between'>
              <p className='text-gray-100 text-[14px] font-semibold uppercase text-left tracking-wider'>
                Consultation
              </p>
              <div className='flex justify-between pt-3 w-full'>
                <p className='text-sm raleway text-[12px] text-white  font-semibold'>
                  with Coach Adam
                </p>
                <p className='text-cyan-400 text-sm uppercase my-auto font-extrabold tracking-wide'>
                  Free
                </p>
              </div>
              <button className='bg-cyan-500 w-full h-10 rounded-lg shadow-none hover:shadow-sm hover:-translate-y-0 hover:bg-gray-700 transition-all duration-150 ease-in-out hover:text-cyan-400 hover:font-bold'>
                Book it
              </button>
            </div>
          </div>
          <div className='border-2 rounded-md shadow-lg max-w-[400px] h-36 bg-gray-800 text-gray-200 flex'>
            <Image src={Team} alt='consultation' width={180} className='p-2 h-auto rounded-lg' />

            <div className='font-dmsans flex flex-col p-2 text-gray-200 w-full justify-between'>
              <p className='text-gray-100 text-[14px] font-semibold uppercase text-left tracking-wider'>
                Team Training
              </p>
              <div className='flex justify-between w-full pt-3'>
                <p className='text-xs raleway text-white font-semibold'>with Coach Adam</p>
                <p className='text-cyan-400 text-xs my-auto font-extrabold tracking-wide'>
                  $75/month
                </p>
              </div>
              <button className='bg-cyan-500 w-full h-10 rounded-lg shadow-none hover:shadow-sm hover:-translate-y-0 hover:bg-gray-700 transition-all duration-150 ease-in-out hover:text-cyan-400 hover:font-bold'>
                Book it
              </button>
            </div>
          </div>
        </div>
        <div className='flex flex-col gap-4 justify-evenly items-center w-1/4 h-full bg-gray-300 my-10'>
          {filteredMenuItems?.map((menuItem) => (
            <div
              key={menuItem.id}
              className='group relative h-20 w-36 flex rounded-lg bg-cyan-700 border-2 border-gray-800 text-center justify-between'
            >
              <div className='relative h-full w-full object-cover object-center lg:h-full lg:w-full'>
                <Image src={menuItem.url} alt={menuItem.name} fill style={{ objectFit: 'cover' }} />
              </div>
              <div className='flex flex-col w-full text-xs'>
                <h3 className='text-xs font-semibold text-gray-100 text-center'>
                  <p>{menuItem.name}</p>
                </h3>
                <p className='text-center text-xs w-full text-gray-100'>
                  {menuItem.categories.map((c) => capitalize(c)).join(', ')}
                </p>
                <p className='text-xs font-bold w-full text-center tracking-wider text-green-300'>
                  ${menuItem.price.toFixed(2)}
                </p>
                <Button
                  className='mt-4'
                  onClick={() => {
                    addToCart(menuItem.id, 1)
                  }}
                >
                  Add to cart
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Menu
