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
  const { mutateAsync: createPresignedUrl } = trpc.admin.createPresignedUrl.useMutation()
  const { data: menuItems, refetch } = trpc.menu.getMenuItems.useQuery()
  const { mutateAsync: deleteMenuItem } = trpc.admin.deleteMenuItem.useMutation()

  const handleDelete = async (imageKey: string, id: string) => {
    await deleteMenuItem({ id, imageKey })
    refetch()
  }

  const handleImgUpload = async () => {
    const { file } = input
    if (!file) return

    // get url from aws to upload file to:
    const { url, fields, key } = await createPresignedUrl({
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
    const key = await handleImgUpload()
    if (!key) throw new Error('No key')

    await addItem({
      name: input.name,
      imageKey: key,
      categories: input.categories.map((c) => c.value as Exclude<Categories, 'all'>),
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
      <div className='mx-auto flex flex-col max-w-xl gap-2 bg-blue-400 '>
        <input
          name='name'
          className='h-12 rounded-lg bg-gray-600 pl-2'
          type='text'
          placeholder=' Name of Training Type'
          onChange={handleTextChange}
          value={input.name}
        />

        <input
          name='price'
          className='h-12 rounded-lg w-full bg-gray-600 pl-3'
          type='number'
          placeholder='price'
          onChange={(e) => setInput((prev) => ({ ...prev, price: Number(e.target.value) }))}
          value={input.price}
        />

        <DynamicSelect
          value={input.categories}
          // @ts-ignore - when using dynamic import, typescript doesn't know about the onChange prop
          onChange={(e) => setInput((prev) => ({ ...prev, categories: e }))}
          isMulti
          className='rounded-lg w-full'
          options={selectOptions}
        />

        <label htmlFor='file' className='h-12 cursor-pointer rounded-sm font-medium'>
          <span className='sr-only'>File input</span>
          <div className='flex w-full p-2 h-full items-center justify-center rounded-lg border-gray-800 bg-gray-700 text-white text-center'>
            {preview ? (
              <div className='relative w-full rounded-lg'>
                <Image alt='preview' style={{ objectFit: 'contain' }} fill src={preview} />
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
            className='mx-auto  flex w-full border-2 border-gray-800 justify-center items-center rounded-lg'
          />
        </label>

        <button
          className='h-12 disabled:cursor-not-allowed  adminBtn rounded-lg pl-3'
          disabled={!input.file || !input.name}
          onClick={addMenuItem}
        >
          Add menu item
        </button>

        {error && <p className='text-xs font-bold font-montserrat text-red-600'>{error}</p>}

        <div className='mx-auto max-w-7xl mt-16'>
          <p className='text-semibold text-center text-lg'>Your Current Menu Items:</p>
          <div className='flex'>
            {menuItems?.map((menuItem) => (
              <div key={menuItem.id} className='m-5'>
                <p className='font-semibold '>{menuItem.name}</p>
                <div className='border-2 border-cyan-900 rounded-xl bg-gray-200'>
                  <Image
                    priority
                    height={200}
                    width={200}
                    alt=''
                    src={menuItem.url}
                    className='rounded-xl object-fit'
                  />
                </div>
                <button
                  onClick={() => handleDelete(menuItem.imageKey, menuItem.id)}
                  className='text-xs text-red-600 pl-2 font-semibold hover:font-extrabold transition-all duration-150'
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
export default Menu
