import { format, parseISO } from 'date-fns'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { type FC, useState } from 'react'
import { HiArrowLeft } from 'react-icons/hi'
import Select from 'react-select'
import { capitalize, selectOptions } from 'src/utils/helpers'
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
    <div className='flex flex-col w-full'>
      <h2 className='flex items-center gap-4 text-2xl font-normal font-sans tracking-wider text-gray-900 py-5 px-2'>
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

      <div className='flex flex-col justify-center w-full items-center gap-10 px-2 py-10'>
        {filteredMenuItems?.map((menuItem) => (
          <div
            key={menuItem.id}
            className='h-44 w-full bg-cyan-800 flex  rounded-lg'
          >
            <div className='bg-cyan-600 flex justify-between items-center border-2 w-full border-gray-800 h-full rounded-lg text-left '>
              <div className='flex text-left items-center space-y-1'>
                <Image
                  src={menuItem.url}
                  alt={menuItem.name}
                  height={50}
                  width={150}
                  className='rounded-lg bg-sky-400 mx-2'
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
                </div>
              </div>
              <button
                className='px-8 py-2 mx-2 text-md font-semibold text-white bg-green-500 rounded-md  hover:border-2 border-2 mb-2 border-gray-900 hover:border-gray-600 hover:bg-opacity-50 hover:text-gray-900 transition duration-150'
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
