import Cart from '@components/Cart'
import Menu from '@components/Menu'
import Spinner from '@components/Spinner'
import { parseISO } from 'date-fns'
import { useRouter } from 'next/router'
import { type FC, useEffect, useState } from 'react'
import { now } from 'src/constants/config'
import { trpc } from 'src/utils/trpc'
import { BsCart } from 'react-icons/bs'

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
        <div className='flex min-h-screen max-h-screen max-w-full font-medium bg-gradient-to-t from-gray-200 via-gray-300 to-gray-500 flex-col-reverse w-full '>
          {/* Cart Icon */}
          <div className='flex w-full mb-10 justify-center items-center'>
            <button
              type='button'
              onClick={() => setShowCart((prev) => !prev)}
              className='flex items-center justify-center rounded-lg bg-green-200 px-10 py-4 text-2xl font-medium text-gray-900'
            >
              <BsCart className='mr-2 text-5xl' />

              {productsInCart.reduce((acc, item) => acc + item.quantity, 0)}
            </button>
          </div>

          <Menu addToCart={addToCart} selectedTime={selectedTime} />
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
