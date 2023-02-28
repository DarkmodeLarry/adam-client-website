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
      <h4 className='font-bold'>{title}</h4>
      <p className='my-8 text-gray-300 text-sm px-6'>{description}</p>
      <AnchorLink
        className='text-xs font-bold underline hover:text-secondary-500'
        onClick={() => setSelectedPage(SelectedPage.ContactUs)}
        href={`#${SelectedPage.ContactUs}`}
      >
        <div className='w-full flex justify-center items-center '>
          <p className='w-36 h-10 items-center  justify-center flex font-montserrat text-gray-900 rounded-lg bg-gray-200 hover:shadow-md whitespace-nowrap font-semibold transition-all shadow-2xl shadow-gray-500 hover:shadow-gray-400 hover:bg-gray-700 hover:text-gray-200 hover:border-2 hover:border-gray-200 active:scale-95  hover:translate-y-1'>
            Learn More
          </p>
          <p>
            Swimming has blessed me with a life with I wish I could share with
            everyone. Facing and overcoming challenges this sport has provided
            for me has shaped me to be humble, open-minded, that have carved to
            enjoy my life with great health, , social, and confident. . Swimmers
            know swimmers. We know we are tough.
          </p>
        </div>
      </AnchorLink>
    </motion.div>
  )
}

export default Abouts
