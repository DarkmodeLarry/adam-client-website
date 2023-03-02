import { SelectedPage } from '../../shared/types'
import AnchorLink from 'react-anchor-link-smooth-scroll'
import Adam from '../../../public/Adam.png'
import Waves from '../../../public/waves.png'
import { motion } from 'framer-motion'
import Image from 'next/image'

type Props = {
  setSelectedPage: (value: SelectedPage) => void
}

const Home = ({ setSelectedPage }: Props) => {
  return (
    <section
      id='home'
      className='flex flex-col justify-between items-center scrollbar-hide pt-24 pb-16 hero w-full bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-cyan-500 to-cyan-900'
    >
      {/* IMAGE AND MAIN HEADER */}
      <motion.div
        className='flex flex-col items-center w-full justify-center py-4 px-4 '
        onViewportEnter={() => setSelectedPage(SelectedPage.Home)}
      >
        {/* MAIN HEADER */}

        {/* HEADINGS */}
        <motion.div
          className='w-4/6 md:w-1/2 '
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          variants={{
            hidden: { opacity: 0, x: -100 },
            visible: { opacity: 1, x: 0 }
          }}
        >
          <h1 className='text-center text-2xl md:text-5xl font-bold md:tracking-widest w-full '>
            Keep On Swimming
          </h1>
          {/* IMAGES */}
          <div className='flex gap-5 w-full  sm:min-w-[1/2] md:gap-16 justify-center sm:justify-between'>
            {/* <Image
              src={Waves}
              alt='waves'
              width={100}
              height={100}
              className='absolute -z-10 right-0 top-52'
            /> */}
            <div className='mt-8 '>
              <Image alt='home-pageGraphic' priority src={Adam} className='min-w-[150px]  ' />
            </div>
            <div className='mt-16 py-4 flex w-1/2'>
              <p className='text-2xl sm:text-xl font-dmsans text-amber-500 font-medium tracking-wide w-full'>
                <span className='text-sm md:text-lg text-left  raleway tracking-widest text-gray-400 '>
                  With
                </span>
                <br />
                Coach Adam
              </p>
            </div>
          </div>
          <p className='my-8 text-lg w-full text-gray-300  text-center tracking-widest'>
            Fit | Healthy | Confident |{' '}
            <span className='text-orange-400 font-semibold'>Lifestyle</span>
          </p>
        </motion.div>

        {/* ACTIONS */}
        <motion.div
          className='flex items-center gap-8 w-full justify-center py-8'
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, amount: 0.4 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          variants={{
            hidden: { opacity: 0, x: -100 },
            visible: { opacity: 1, x: 0 }
          }}
        >
          <button className='button'>Join Now</button>
          <AnchorLink className='text-md text-gray-100 hover:text-secondary-500 hover:rounded-xl hover:border-2  hover:px-4 hover:py-2 px-4 py-2 transition-all duration-300 cursor-pointer'>
            <p>Learn More</p>
          </AnchorLink>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Home
