import useMediaQuery from '../../hooks/useMediaQuery'
import { SelectedPage } from '../../shared/types'
import AnchorLink from 'react-anchor-link-smooth-scroll'
import HomePageGraphic from '../../../public/dolphins.png'
import HomePageText from '../../../public/assets/HomePageText.png'
import { motion } from 'framer-motion'
import ActionButton from '../../shared/ActionButton'
import Image from 'next/image'

type Props = {
  setSelectedPage: (value: SelectedPage) => void
}

const Home = ({ setSelectedPage }: Props) => {
  const isAboveMediumScreens = useMediaQuery('(min-width:1060px)')

  return (
    <section id='home' className='md:min-h-fit gap-16 flex flex-col justify-between md:pt-36 hero'>
      {/* IMAGE AND MAIN HEADER */}
      <motion.div
        className='mx-auto w-5/6 items-center justify-center md:flex md:h-5/6'
        onViewportEnter={() => setSelectedPage(SelectedPage.Home)}
      >
        {/* MAIN HEADER */}
        <div className='z-10 mt-32 md:mt-16 md:basis-3/5'>
          {/* HEADINGS */}
          <motion.div
            className='md:-mt-20'
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6 }}
            variants={{
              hidden: { opacity: 0, x: -100 },
              visible: { opacity: 1, x: 0 }
            }}
          >
            <div className='relative'>
              <div className='before:absolute before:-top-20 before:-left-20 before:z-[-1] md:before:content-evolvetext bg-transparent'>
                <Image alt='home-page-text' src={HomePageText} className='' />
              </div>
            </div>

            <p className='mt-8 text-md text-white text-center md:text-left'>
              Unrivaled Gym. Unparalleled Training Fitness Classes. World Class Studios to get the
              Body Shapes That you Dream of.. Get Your Dream Body Now.
            </p>
          </motion.div>

          {/* ACTIONS */}
          <motion.div
            className='mt-8 flex items-center gap-8'
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
              className='text-sm font-bold text-gray-200 underline hover:text-secondary-500 hover:rounded-xl hover:border-2 hover:px-4 hover:py-2 transition-all duration-300 '
              onClick={() => setSelectedPage(SelectedPage.ContactUs)}
              href={`#${SelectedPage.ContactUs}`}
            >
              <p>Learn More</p>
            </AnchorLink>
          </motion.div>
        </div>

        {/* IMAGE */}
        <div className='flex basis-3/5 justify-center md:z-10 bg-transparent md:pb-24'>
          <Image
            alt='home-pageGraphic'
            src={HomePageGraphic}
            height={400}
            width={400}
            className='shadow-2xl bg-transparent rounded-full my-10'
          />
        </div>
      </motion.div>
    </section>
  )
}

export default Home
