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
  const { isFetchedAfterMount } = trpc.menu.checkMenuStatus.useQuery(
    undefined,
    {
      onError: () => {
        // Check for validity of selectedTime failed
        // Handle error accordingly (e.g. redirect to home page)
      }
    }
  )
  const [showCart, setShowCart] = useState<boolean>(false)
  const [productsInCart, setProductsInCart] = useState<
    { id: string; quantity: number }[]
  >([])
  const addToCart = (id: string, quantity: number) => {
    setProductsInCart((prev) => {
      const existing = prev.find((item) => item.id === id)
      if (existing) {
        return prev.map((item) => {
          if (item.id === id)
            return { ...item, quantity: item.quantity + quantity }
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
        <div className='flex flex-col justify-center items-center w-full mt-10'>
          {/* Cart Icon */}

          <Menu addToCart={addToCart} selectedTime={selectedTime} />
          <button
            type='button'
            onClick={() => setShowCart((prev) => !prev)}
            className='bg-green-500 px-10 rounded-lg flex gap-4 justify-center items-center border-2 border-gray-600 hover:shadow-lg'
          >
            <BsCart className='m-2 text-4xl text-gray-800' />
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
