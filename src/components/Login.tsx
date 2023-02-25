import { useRouter } from 'next/router'
import type { ChangeEvent, FC } from 'react'
import { useState } from 'react'
import { HiLockClosed } from 'react-icons/hi'
import { trpc } from '../utils/trpc'
import Image from 'next/image'
import Dolphin from '../../public/dolphins.png'

const Login: FC = () => {
  const router = useRouter()

  const { mutate: login, isError } = trpc.admin.login.useMutation({
    onSuccess: () => {
      router.push('/dashboard')
    }
  })

  const [input, setInput] = useState({
    email: '',
    password: ''
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target
    setInput((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <div className='loginPage flex flex-col min-h-full items-center justify-center border-cyan-300 z-30 p-5'>
      <Image
        className=''
        src={Dolphin}
        alt='Workflow'
        height={200}
        width={200}
      />
      <div className='w-full h-full max-w-md space-y-10 shadow-2xl border-2 border-transparent rounded-2xl px-10 pb-16'>
        <div>
          <h2 className='mt-6 text-center text-3xl font-bold text-gray-900'>
            Sign in to your account
          </h2>
        </div>
        <form className='mt-8 space-y-6'>
          <input type='hidden' name='remember' defaultValue='true' />
          <div className='-space-y-px rounded-md shadow-sm'>
            <p className='pb-1 text-sm text-red-600'>
              {isError && 'Invalid login credentials'}
            </p>
            <div>
              <label htmlFor='email-address' className='sr-only'>
                Email address
              </label>
              <input
                id='email-address'
                name='email'
                type='email'
                value={input.email}
                onChange={handleChange}
                autoComplete='email'
                required
                className='relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
                placeholder='Email address'
              />
            </div>
            <div>
              <label htmlFor='password' className='sr-only'>
                Password
              </label>
              <input
                id='password'
                name='password'
                type='password'
                value={input.password}
                onChange={handleChange}
                autoComplete='current-password'
                required
                className='relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
                placeholder='Password'
              />
            </div>
          </div>

          <div className='flex items-center justify-between'>
            <div className='flex items-center'>
              <input
                id='remember-me'
                name='remember-me'
                type='checkbox'
                className='h-4 w-4  py-10 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500'
              />
              <label
                htmlFor='remember-me'
                className='ml-2 block text-sm text-gray-900'
              >
                Remember me
              </label>
            </div>

            <div className='text-sm'>
              <a
                href='#'
                className='font-medium text-indigo-600 hover:text-indigo-500'
              >
                Forgot your password?
              </a>
            </div>
          </div>

          <div>
            <button
              type='submit'
              onClick={(e) => {
                e.preventDefault()
                login(input)
              }}
              className='group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
            >
              <span className='absolute inset-y-0 left-0 flex items-center pl-3'>
                <HiLockClosed
                  className='h-5 w-5 text-indigo-500 group-hover:text-indigo-400'
                  aria-hidden='true'
                />
              </span>
              Sign in
            </button>
          </div>
        </form>
        <p className='mt-2 text-center text-sm text-gray-600'>
          Or{' '}
          <a
            href='#'
            className='font-medium text-indigo-600 hover:text-indigo-500'
          >
            Create your account instead
          </a>
        </p>
      </div>
    </div>
  )
}

export default Login
