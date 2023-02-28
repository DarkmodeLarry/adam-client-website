import { SelectedPage } from '../../shared/types'
import AnchorLink from 'react-anchor-link-smooth-scroll'
import Adam from '../../../public/Adam.png'
import { motion } from 'framer-motion'
import Image from 'next/image'

type Props = {
  setSelectedPage: (value: SelectedPage) => void
}

const Home = ({ setSelectedPage }: Props) => {
  return (
    <section
      id='home'
      className='flex flex-col justify-between items-center scrollbar-hide pt-24 pb-16 hero max-w-full w-full bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-cyan-500 to-cyan-900'
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
              <h1 className='text-center text-5xl font-bold tracking-wide'>
                Keep On Swimming
              </h1>
              {/* IMAGES */}
<<<<<<< HEAD
              <div className='flex mt-8 '>
                <Image
                  alt='home-pageGraphic'
                  priority
                  src={Adam}
                  className='w-[75%]'
                />
                <p className=' mt-5 text-2xl text-center tracking-widest text-gray-100'>
                  With Coach Adam
                </p>
=======
              <div className='flex mt-5'>
                <Image alt='home-pageGraphic' src={Adam} className='' />
                <p className='headingName text-center'>With Coach Adam</p>
>>>>>>> fc4c2af (env variables updated)
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
<<<<<<< HEAD
            <button className='button'>Join Now</button>
            <AnchorLink className='text-md text-gray-100 hover:text-secondary-500 hover:rounded-xl hover:border-2  hover:px-4 hover:py-2 px-4 py-2 transition-all duration-300 cursor-pointer'>
=======
            <button className=''>Join Now</button>
            <AnchorLink
              className='text-sm font-bold text-gray-200 underline hover:text-secondary-500 hover:rounded-xl hover:border-2 hover:px-4 hover:py-2 transition-all duration-300 '
              onClick={() => setSelectedPage(SelectedPage.ContactUs)}
              href={`#${SelectedPage.ContactUs}`}
            >
>>>>>>> fc4c2af (env variables updated)
              <p>Learn More</p>
            </AnchorLink>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}

export default Home
