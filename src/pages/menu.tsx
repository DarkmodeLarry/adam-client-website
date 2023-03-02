import Cart from '@components/Cart'
import Menu from '@components/Menu'
import Spinner from '@components/Spinner'
import { parseISO } from 'date-fns'
import { useRouter } from 'next/router'
import { FC, useEffect, useState } from 'react'
import { now } from 'src/constants/config'
import { trpc } from 'src/utils/trpc'
import { RiShoppingCartLine } from 'react-icons/ri'

const MenuPage: FC = () => {
  const router = useRouter()

  const [selectedTime, setSelectedTime] = useState<string | null>(null) // as ISO string
  const { isFetchedAfterMount } = trpc.menu.checkMenuStatus.useQuery(undefined, {
    onError: () => {
      // Check for validity of selectedTime failed
      // Handle error accordingly (e.g. redirect to home page)
    }
  })
  const [showCart, setShowCart] = useState<boolean>(false)
  const [productsInCart, setProductsInCart] = useState<{ id: string; quantity: number }[]>([])
  const addToCart = (id: string, quantity: number) => {
    setProductsInCart((prev) => {
      const existing = prev.find((item) => item.id === id)
      if (existing) {
        return prev.map((item) => {
          if (item.id === id) return { ...item, quantity: item.quantity + quantity }
          return item
        })
      }
      return [...prev, { id, quantity }]
    })
  }
  const removeFromCart = (id: string) => {
    setProductsInCart((prev) => prev.filter((item) => item.id !== id))
  }

  useEffect(() => {
    const selectedTime = localStorage.getItem('selectedTime')
    if (!selectedTime) router.push('/')
    else {
      const date = parseISO(selectedTime)
      if (date < now) router.push('/')

      // Date is valid
      setSelectedTime(selectedTime)
    }
  }, [router])

  return (
    <>
      <Cart
        removeFromCart={removeFromCart}
        open={showCart}
        setOpen={setShowCart}
        products={productsInCart}
      />
      {isFetchedAfterMount && selectedTime ? (
        <div className='flex flex-col justify-center items-center w-full min-h-screen bg-gray-900'>
          {/* Cart Icon */}

          <Menu addToCart={addToCart} selectedTime={selectedTime} />
          <button
            type='button'
            onClick={() => setShowCart((prev) => !prev)}
            className='bg-green-400 px-10 rounded-lg flex gap-4 justify-center items-center border-2 border-gray-600 hover:shadow-lg shadow-gray-400 shadow-md text-xl text-gray-900 relative font-bold hover:bg-gray-600 hover:text-gray-100 hover:border-2 hover:border-gray-100 mb-5 transition-all duration-200 '
          >
            <span className='px-6 py-4'>Checkout</span>
            <RiShoppingCartLine className='h-14 w-14 text-gray-900 absolute right-5 bottom-0' />
            {productsInCart.reduce((acc, item) => acc + item.quantity, 0)}
          </button>
        </div>
      ) : (
        <div className='flex h-screen items-center justify-center'>
          <Spinner />
        </div>
      )}
    </>
  )
}

export default MenuPage
