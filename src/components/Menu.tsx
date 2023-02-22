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
    <div className='rounded-md bg-gradient-to-tr from-gray-100 to-gray-200 m-5 min-h-full'>
      <div className='flex h-2/3 gap-10 '>
        <div className='w-full flex justify-between'>
          <h2 className='mb-10 flex items-center justify-center gap-4 text-3xl font-normal font-sans tracking-wider text-gray-600'>
            <HiArrowLeft className='cursor-pointer' onClick={() => router.push('/')} />
            Our Training Options for :
            <span className='text-md font-bold text-[1.2rem] text-gray-800 '>
              [{format(parseISO(selectedTime), 'MMM do, yyyy')}]
            </span>
          </h2>
        </div>
        <div className='w-full font-bold p-2 tracking-widest text-lg'>
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
      </div>
      <div className='flex flex-col w-full min-h-full'>
        {filteredMenuItems?.map((menuItem) => (
          <div key={menuItem.id} className='flex gap-10'>
            <div className='w-full overflow-hidden rounded-md bg-gray-200 hover:duration-500 ease-linear transition-all'>
              <div className='object-contain object-center'>
                <Image src={menuItem.url} alt={menuItem.name} height={50} width={200} />
              </div>
            </div>
            <div className='mt-4 flex justify-between'>
              <div>
                <h3 className='mt-4 text-lg font-semibold text-gray-700'>
                  <p>{menuItem.name}</p>
                </h3>
                <p className='mt-1 text-sm text-gray-500'>
                  {menuItem.categories.map((c) => capitalize(c)).join(', ')}
                </p>
              </div>
              <p className='text-sm font-medium text-gray-900'>${menuItem.price.toFixed(2)}</p>
            </div>

            <button
              className='btn mt-3'
              onClick={() => {
                addToCart(menuItem.id, 1)
              }}
            >
              Book it
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Menu
