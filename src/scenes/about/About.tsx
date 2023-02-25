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
      className='mt-5 rounded-md border-2 border-gray-400 px-1 py- text-center max-w-sm bg-[conic-gradient(at_top,_var(--tw-gradient-stops))] from-gray-800 via-cyan-400 to-gray-800'
    >
      <div className='flex justify-center'>
        <div className='rounded-full border-2 border-white bg-gray-300 p-4'>
          {icon}
        </div>
      </div>

      <h4 className='font-bold'>{title}</h4>
      <p className='my-2'>{description}</p>
      <AnchorLink
        className='text-xs font-bold underline hover:text-secondary-500'
        onClick={() => setSelectedPage(SelectedPage.ContactUs)}
        href={`#${SelectedPage.ContactUs}`}
      >
        <p>Learn More</p>
      </AnchorLink>
    </motion.div>
  )
}

export default Abouts
