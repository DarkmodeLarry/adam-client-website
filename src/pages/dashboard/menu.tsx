import dynamic from 'next/dynamic'
import Image from 'next/image'
import { type ChangeEvent, type FC } from 'react'
import type { MultiValue } from 'react-select/dist/declarations/src'
import { useEffect, useState } from 'react'
import { type Categories } from '../../utils/types'
import { MAX_FILE_SIZE } from 'src/constants/config'
import { selectOptions } from '../../utils/helpers'
import { trpc } from 'src/utils/trpc'

const DynamicSelect = dynamic(() => import('react-select'), { ssr: false })

interface Input {
  name: string
  price: number
  categories: MultiValue<{ value: string; label: string }>
  file: undefined | File
}

const initialInput = {
  name: '',
  price: 0,
  categories: [],
  file: undefined
}

const Menu: FC = () => {
  const [input, setInput] = useState<Input>(initialInput)
  const [preview, setPreview] = useState<string>('')
  const [error, setError] = useState<string>('')

  useEffect(() => {
    // create the preview
    if (!input.file) return
    const objectUrl = URL.createObjectURL(input.file)
    setPreview(objectUrl)

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl)
  }, [input.file])

  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setInput((prev) => ({ ...prev, [name]: value }))
  }

  // tRPC
  const { mutateAsync: addItem } = trpc.admin.addMenuItem.useMutation()
  const { mutateAsync: createPresignedUrl } =
    trpc.admin.createPresignedUrl.useMutation()
  const { data: menuItems, refetch } = trpc.menu.getMenuItems.useQuery()
  const { mutateAsync: deleteMenuItem } =
    trpc.admin.deleteMenuItem.useMutation()

  const handleDelete = async (imageKey: string, id: string) => {
    await deleteMenuItem({ id, imageKey })
    refetch()
  }

  const handleImageUpload = async () => {
    const { file } = input
    if (!file) return

    // get url from aws to upload file to:
    const { fields, key, url } = await createPresignedUrl({
      fileType: file.type
    })

    // add all fields to formData
    const data = {
      ...fields,
      'Content-Type': file.type,
      file
    }

    const formData = new FormData()
    // appending to formData
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value as any)
    })
    // Post to the url
    await fetch(url, {
      method: 'POST',
      body: formData
    })
    // return key of image
    return key
  }

  const addMenuItem = async () => {
    const key = await handleImageUpload()
    if (!key) throw new Error('No key')

    await addItem({
      name: input.name,
      imageKey: key,
      categories: input.categories.map(
        (c) => c.value as Exclude<Categories, 'all'>
      ),
      price: input.price
    })

    refetch()

    // Reset input
    setInput(initialInput)
    setPreview('')
  }

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return setError('No file selected')
    if (e.target.files[0].size > MAX_FILE_SIZE) return setError('File too big')
    setInput((prev) => ({ ...prev, file: e.target.files![0] }))
  }

  return (
    <>
      <div className='max-w-full bg-gray-400 min-h-screen'>
        <div className='justify-center flex flex-col py-5 px-5 gap-2 '>
          <h2 className='text-center text-4xl font-semibold my-5'>Menu Edit</h2>
          <input
            name='name'
            className='h-12 rounded-sm bg-gray-600 pl-2'
            type='text'
            placeholder=' Name of Training Type'
            onChange={handleTextChange}
            value={input.name}
          />

          <input
            name='price'
            className='h-12 rounded-sm bg-gray-200 pl-3'
            type='number'
            placeholder='price'
            onChange={(e) =>
              setInput((prev) => ({ ...prev, price: Number(e.target.value) }))
            }
            value={input.price}
          />

          <DynamicSelect
            value={input.categories}
            // @ts-ignore - when using dynamic import, typescript doesn't know about the onChange prop
            onChange={(e) => setInput((prev) => ({ ...prev, categories: e }))}
            isMulti
            className='h-12 '
            options={selectOptions}
          />

          <label
            htmlFor='file'
            className='h-12 relative cursor-pointer rounded-sm font-medium bg-gray-200 text-indigo-600 focus-within:outline-none'
          >
            <span className='sr-only'>File input</span>
            <div className='flex h-full items-center justify-center text-white text-center bg-gray-600'>
              {preview ? (
                <div className='relative w-full h-3/4 bg-gray-600'>
                  <Image
                    alt='preview'
                    style={{ objectFit: 'contain' }}
                    fill
                    src={preview}
                  />
                </div>
              ) : (
                <span>Select image</span>
              )}
            </div>
            <input
              name='file'
              id='file'
              onChange={handleFileSelect}
              accept='image/jpeg image/png image/jpg image/webp'
              type='file'
              className='sr-only '
            />
          </label>

          <button
            className='h-12 disabled:cursor-not-allowed  font-montserrat border-2  border-gray-400 text-gray-100 flex flex-col justify-center items-center font-semibold text-xl bg-gray-600 shadow-xl hover:shadow-lg  whitespace-nowrap hover:shadow-black hover:bg-gray-200 hover:text-gray-900 hover:border-2 hover:border-gray-900 hover:scale-95 active:scale-90 hover:translate-y-2 duration-200 transition-all  rounded-sm'
            disabled={!input.file || !input.name}
            onClick={addMenuItem}
          >
            Add menu item
          </button>

          {error && (
            <p className='text-xs font-bold font-montserrat text-red-600'>
              {error}
            </p>
          )}

          <div className='mx-auto max-w-7xl mt-10'>
            <p className='text-semibold text-center text-2xl'>
              Your Current Menu Items:
            </p>
            <div className='grid grid-cols-3 mb-12 mt-10 gap-4'>
              {menuItems?.map((menuItem) => (
                <div key={menuItem.id} className=''>
                  <p className='font-semibold text-center '>{menuItem.name}</p>
                  <div className='border-2 relative h-28 w-28 border-cyan-900 rounded-lg bg-gray-200'>
                    <Image priority fill alt='' src={menuItem.url} />
                  </div>
                  <button
                    onClick={() => handleDelete(menuItem.imageKey, menuItem.id)}
                    className='text-md text-red-600 mt-2 mx-auto w-full font-md hover:font-extrabold transition-all duration-200'
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default Menu
