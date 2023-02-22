import { SelectedPage } from '../../shared/types'
import AnchorLink from 'react-anchor-link-smooth-scroll'
import Adam from '../../../public/Adam.png'
import { motion } from 'framer-motion'
import ActionButton from '../../shared/ActionButton'
import Image from 'next/image'

type Props = {
  setSelectedPage: (value: SelectedPage) => void
}

const Home = ({ setSelectedPage }: Props) => {
  return (
    <section
      id='home'
      className='flex flex-col justify-between items-center scrollbar-hide pt-24 pb-16 hero max-w-full w-full '
    >
      {/* IMAGE AND MAIN HEADER */}
      <motion.div
        className='flex items-center justify-center py-4 px-4'
        onViewportEnter={() => setSelectedPage(SelectedPage.Home)}
      >
        {/* MAIN HEADER */}
        <div className=''>
          {/* HEADINGS */}
          <motion.div
            className=''
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5 }}
            variants={{
              hidden: { opacity: 0, x: -100 },
              visible: { opacity: 1, x: 0 }
            }}
          >
            <div className='flex flex-col'>
              <h1 className='text-center text-5xl font-bold tracking-wide'>Keep Swimming</h1>
              {/* IMAGES */}
              <div className='flex mt-8 '>
                <Image alt='home-pageGraphic' src={Adam} className='' />
                <p className='headings mt-5 text-2xl text-center'>With Coach Adam</p>
              </div>
            </div>
            <p className='mt-8 text-lg w-full font-semibold tracking-widest text-white text-center headings'>
              Fitness. Technique. Confidence. Leadership.
            </p>
          </motion.div>

          {/* ACTIONS */}
          <motion.div
            className='flex items-center gap-8 w-full justify-center py-8'
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true, amount: 0.5 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            variants={{
              hidden: { opacity: 0, x: -100 },
              visible: { opacity: 1, x: 0 }
            }}
          >
            <ActionButton setSelectedPage={setSelectedPage}>Join Now</ActionButton>
            <AnchorLink
              className='text-sm font-bold text-gray-200 underline hover:text-secondary-500 hover:rounded-xl hover:border-2 hover:px-4 hover:py-2 px-4 py-2 transition-all duration-300 '
              onClick={() => setSelectedPage(SelectedPage.ContactUs)}
              href={`#${SelectedPage.ContactUs}`}
            >
              <p>Learn More</p>
            </AnchorLink>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}

export default Home
