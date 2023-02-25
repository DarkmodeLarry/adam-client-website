import { SelectedPage } from '../../shared/types'

import { motion } from 'framer-motion'

type Props = {
  setSelectedPage: (value: SelectedPage) => void
}

const About = ({ setSelectedPage }: Props) => {
  return (
    <section
      id='about'
      className='flex flex-col justify-center  md:text-center w-full py-10'
    >
      <motion.div onViewportEnter={() => setSelectedPage(SelectedPage.About)}>
        {/* HEADER */}
        <motion.div
          className='md:my-5 bg-transparent text-center'
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.3 }}
          variants={{
            hidden: { opacity: 0, x: -50 },
            visible: { opacity: 1, x: 0 }
          }}
        >
          <div className='flex flex-col items-center  justify-center  '>
            <div className=' mt-5'>
              <h2 className='text-3xl'>COACH ADAM</h2>
              <p className='leading-8 text-md text-left my-10  px-10'>
                Introducing Adam Gonzales. <br />
                lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqequat.{' '}
                <br />
                Duis aute irure dolor cillum dolore eu fu cupidatat non
                proident, sunt in culpa qui officia deserunt mollit anim id est
                laborum.
              </p>
            </div>
            <div className='border-2 border-gray-900 justify-center flex flex-col items-center w-96 h-64'>
              <p className='text-xl font-montserrat'>
                [Insert Badass Photo of our guy Adam]
              </p>
            </div>
          </div>
        </motion.div>

        {/* GRAPHICS AND DESCRIPTION */}
      </motion.div>
    </section>
  )
}

export default About
