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

  const { data: menuItems } = trpc.menu.getMenuItems.useQuery(undefined, { refetchOnMount: false })
  const [filter, setFilter] = useState<string | undefined>(undefined)

  const filteredMenuItems = menuItems?.filter((menuItem) => {
    if (!filter) return true
    return menuItem.categories.includes(filter)
  })

  return (
    <div className='flex flex-col bg-gray-100'>
      <h2 className='flex items-center justify-start gap-4 text-2xl font-normal font-sans tracking-wider text-gray-100'>
        <HiArrowLeft className='cursor-pointer' onClick={() => router.push('/')} />
        Our Training Options for :
        <span className='text-md font-bold text-[1.2rem] text-gray-800 '>
          [{format(parseISO(selectedTime), 'MMM do, yyyy')}]
        </span>
      </h2>

      <div className='w-full font-bold p-2 tracking-widest text-lg py-5'>
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

      <div className='w-full h-full flex justify-center items-center'>
        {filteredMenuItems?.map((menuItem) => (
          <div key={menuItem.id} className='w-full'>
            <div className='bg-cyan-600 h-96 w-96 flex flex-col items-center justify-between '>
              <Image
                src={menuItem.url}
                alt={menuItem.name}
                height={300}
                width={300}
                className='rounded-lg bg-sky-400 p-2'
              />
              <div className='flex flex-col justify-center text-center items-start w-full rounded-lg '>
                {' '}
                <h3 className='text-xl font-semibold w-full justify-center text-gray-100 text-center'>
                  <p>{menuItem.name}</p>
                </h3>
                <p className='text-center text-md w-full text-gray-100'>
                  {menuItem.categories.map((c) => capitalize(c)).join(', ')}
                </p>
                <p className='text-md font-bold w-full  text-center tracking-wider text-green-500'>
                  ${menuItem.price.toFixed(2)}
                </p>
                <div className='w-full justify-center flex items-center'>
                  <button
                    className='px-4 py-2  text-sm font-semibold text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75'
                    onClick={() => {
                      addToCart(menuItem.id, 1)
                    }}
                  >
                    Book it
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Menu
