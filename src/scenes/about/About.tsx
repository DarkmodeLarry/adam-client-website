import { SelectedPage } from '../../shared/types'
import { motion } from 'framer-motion'
import AnchorLink from 'react-anchor-link-smooth-scroll'

const childVariant = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: { opacity: 1, scale: 1 }
}

type Props = {
  icon: JSX.Element
  title: string
  description: string
  setSelectedPage: (value: SelectedPage) => void
}

const Abouts = ({ icon, title, description, setSelectedPage }: Props) => {
  return (
    <motion.div
      variants={childVariant}
<<<<<<< HEAD:src/scenes/about/About.tsx
      className='mt-5 rounded-md border-2 border-gray-400 px-1 py- text-center max-w-sm bg-[conic-gradient(at_top,_var(--tw-gradient-stops))] from-gray-800 via-cyan-400 to-gray-800'
    >
      <div className='flex justify-center'>
        <div className='rounded-full border-2 border-white bg-gray-300 p-4'>
=======
      className='mt-4 pt-4 rounded-md border-2 bg-opacity-90 text-white bg-gray-700 border-gray-900 w-[450px] h-[300px] text-center flex flex-col  space-y-4'
    >
      <div className='flex justify-center'>
        <div className='my-2 rounded-full border-2 shadow-gray-600  text-gray-900 border-gray-100 bg-blue-100 p-4'>
>>>>>>> fc4c2af (env variables updated):src/scenes/benefits/Benefit.tsx
          {icon}
        </div>
      </div>

      <h4 className='font-bold'>{title}</h4>
      <p className='my-8 text-gray-300 text-sm px-6'>{description}</p>
      <AnchorLink
<<<<<<< HEAD:src/scenes/about/About.tsx
        className='text-xs font-bold underline hover:text-secondary-500'
=======
        className='text-sm font-bold underline hover:text-secondary-500  '
>>>>>>> fc4c2af (env variables updated):src/scenes/benefits/Benefit.tsx
        onClick={() => setSelectedPage(SelectedPage.ContactUs)}
        href={`#${SelectedPage.ContactUs}`}
      >
        <div className='w-full flex justify-center items-center '>
          <p className='w-36 h-10 items-center  justify-center flex font-montserrat text-gray-900 rounded-lg bg-gray-200 hover:shadow-md whitespace-nowrap font-semibold transition-all shadow-2xl shadow-gray-500 hover:shadow-gray-400 hover:bg-gray-700 hover:text-gray-200 hover:border-2 hover:border-gray-200 active:scale-95  hover:translate-y-1'>
            Learn More
          </p>
        </div>
      </AnchorLink>
    </motion.div>
  )
}

export default Abouts
