import { format, parseISO } from 'date-fns'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { type FC, useState } from 'react'
import { HiArrowLeft } from 'react-icons/hi'
import Select from 'react-select'
import { capitalize, selectOptions } from 'src/utils/helper'
import { trpc } from 'src/utils/trpc'

interface MenuProps {
  selectedTime: string // as ISO String
  addToCart: (id: string, quantity: number) => void
}

const Menu: FC<MenuProps> = ({ selectedTime, addToCart }) => {
  const router = useRouter()

  const { data: menuItems } = trpc.menu.getMenuItems.useQuery(undefined, {
    refetchOnMount: false
  })
  const [filter, setFilter] = useState<string | undefined>(undefined)

  const filteredMenuItems = menuItems?.filter((menuItem) => {
    if (!filter) return true
    return menuItem.categories.includes(filter)
  })

  return (
    <div className='flex flex-col w-full bg-gray-200'>
      <h2 className='flex items-center gap-4 text-2xl font-normal font-sans tracking-wider text-gray-900 px-4'>
        <HiArrowLeft
          className='cursor-pointer'
          onClick={() => router.push('/')}
        />
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
          className='border-2 border-gray-400'
          placeholder='Filter by...'
          options={selectOptions}
        />
      </div>

      <div className='flex flex-col justify-center w-full items-center px-2 py-4 bg-gray-300'>
        {filteredMenuItems?.map((menuItem) => (
          <div
            key={menuItem.id}
            className='h-44 max-w-md w-full flex rounded-lg bg-cyan-600 border-2 border-gray-800 text-center justify-between'
          >
            <Image
              src={menuItem.url}
              alt={menuItem.name}
              height={100}
              width={100}
              className='rounded-lg bg-sky-400 m-4 w-full'
            />
            <div className='flex flex-col w-full gap-2'>
              <h3 className='text-xl font-semibold text-gray-100 text-center'>
                <p>{menuItem.name}</p>
              </h3>
              <p className='text-center text-md w-full text-gray-100'>
                {menuItem.categories.map((c) => capitalize(c)).join(', ')}
              </p>
              <p className='text-md font-bold w-full  text-center tracking-wider text-green-300'>
                ${menuItem.price.toFixed(2)}
              </p>
              <button
                className='px-4 mx-4 py-2 text-md font-semibold text-white bg-green-500 rounded-md  hover:border-2 border-2 mb-2 border-gray-900 hover:border-gray-600 hover:bg-opacity-50 hover:text-gray-900 transition duration-150'
                onClick={() => {
                  addToCart(menuItem.id, 1)
                }}
              >
                Book it
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Menu
