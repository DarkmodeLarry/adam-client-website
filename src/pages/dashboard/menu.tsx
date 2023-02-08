import { type Categories } from '../../utils/types'
import Image from 'next/image'
import { type ChangeEvent, type FC } from 'react'
import { useEffect, useState } from 'react'
import type { MultiValue } from 'react-select/dist/declarations/src'
import { MAX_FILE_SIZE } from 'src/constants/config'
import { trpc } from 'src/utils/trpc'

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
  const { mutateAsync: createPresignedUrl } = trpc.admin.createPresignedUrl.useMutation()
  const { mutateAsync: addItem } = trpc.admin.addMenuItem.useMutation()
  const { data: menuItems, refetch } = trpc.menu.getMenuItems.useQuery()
  const { mutateAsync: deleteMenuItem } = trpc.admin.deleteMenuItem.useMutation()

  const handleDelete = async (imageKey: string, id: string) => {
    await deleteMenuItem({ id, imageKey })
    refetch()
  }

  const handleImageUpload = async () => {
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
    const key = await handleImageUpload()
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

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return setError('No file selected')
    if (e.target.files[0].size > MAX_FILE_SIZE) return setError('File too big')
    setInput((prev) => ({ ...prev, file: e.target.files![0] }))
  }

  return (
    <>
      <div className='m-5 border-2 border-black rounded-3xl'>
        <div className='mx-auto flex max-w-xl flex-col gap-2 m-2 text-white'>
          <input
            name='name'
            className='h-12 rounded-lg border-2 border-cyan-800 bg-cyan-700 pl-2'
            type='text'
            placeholder=' Name of Training Type'
            onChange={handleTextChange}
            value={input.name}
          />

          <input
            name='price'
            className='h-12 rounded-lg border-2 border-cyan-800 bg-cyan-700 pl-3'
            type='number'
            placeholder='price'
            onChange={(e) => setInput((prev) => ({ ...prev, price: Number(e.target.value) }))}
            value={input.price}
          />

          {/* <DynamicSelect
            value={input.categories}
            // @ts-ignore - when using dynamic import, typescript doesn't know about the onChange prop
            onChange={(e) => setInput((prev) => ({ ...prev, categories: e }))}
            isMulti
            className='h-12 rounded-lg border-2 border-cyan-800 text-black'
            options={selectOptions}
          /> */}

          <label
            htmlFor='file'
            className='relative h-12 cursor-pointer rounded-sm bg-gray-200 font-medium text-indigo-600 focus-within:outline-none'
          >
            <span className='sr-only'>File input</span>
            <div className='flex h-full items-center justify-center rounded-lg border-2 border-cyan-800 bg-cyan-700 text-white text-center'>
              {preview ? (
                <div className='relative h-3/4 w-full rounded-lg'>
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
              accept='image/jpeg image/png image/jpg'
              type='file'
              className='sr-only  rounded-lg border-2 border-cyan-800 bg-cyan-700 pl-3'
            />
          </label>

          <button
            className='h-12 disabled:cursor-not-allowed  rounded-lg border-2 border-cyan-800 bg-cyan-700 pl-3'
            disabled={!input.file || !input.name}
            onClick={addMenuItem}
          >
            Add menu item
          </button>
        </div>
        {error && <p className='text-xs text-red-600'>{error}</p>}

        <div className='mx-auto mt-12 max-w-7xl'>
          <p className='text-lg font-semibold text-center'>Your Menu Items:</p>
          <div className='mt-6 mb-12 flex justify-center text-left'>
            {menuItems?.map((menuItem) => (
              <div key={menuItem.id} className='p-10'>
                <p className='font-semibold p-2'>{menuItem.name}</p>
                <div className='relative h-40 w-40  border-2 border-cyan-900 rounded-xl bg-cyan-700'>
                  <Image
                    priority
                    fill
                    alt=''
                    src={menuItem.url}
                    className='rounded-xl object-fit p-2'
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
