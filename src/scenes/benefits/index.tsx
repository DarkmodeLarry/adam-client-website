import HText from '../../shared/Heading'
import { type BenefitType, SelectedPage } from '../../shared/types'
import { motion } from 'framer-motion'
import BenefitsPageGraphic from '../../../public/assets/teamPhoto.jpeg'
import Benefit from './Benefit'
import { IoFitnessSharp } from 'react-icons/io5'
import { FaSwimmer } from 'react-icons/fa'
import { GiAncientSword } from 'react-icons/gi'
import Image from 'next/image'

const benefits: Array<BenefitType> = [
  {
    icon: <IoFitnessSharp className='h-6 w-6' />,
    title: 'HEALTHY LIFESTYLE',
    description:
      'Neque adipiscing amet amet enim. Feugiat dolor enim fermentum in a in lectus pellentesque. Ullamcorper et.'
  },
  {
    icon: <FaSwimmer className='h-6 w-6' />,
    title: "DEVELOP SKILLS YOU'LL USE FOR LIFE",
    description:
      'Eu ipsum id egestas risus tempus enim semper felis quis. Nec consectetur ac venenatis facilisi est. Eget ac turpis id.'
  },
  {
    icon: <GiAncientSword className='h-6 w-6' />,
    title: 'BUILD CONFIDENCE',
    description:
      'Fusce vestibulum aliquam ut cras. Nisl lectus egestas sapien nisl. Lacus at mi sit pellentesque. Congue parturient.'
  }
]

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.5 }
  }
}

type Props = {
  setSelectedPage: (value: SelectedPage) => void
}

const Benefits = ({ setSelectedPage }: Props) => {
  return (
    <section
      id='benefits'
      className='flex flex-col justify-center min-h-full md:text-center max-w-full px-8 py-16 bg-gradient-to-tr from-gray-100 to-blue-200 shadow-2xl shadow-blue-100'
    >
      <motion.div onViewportEnter={() => setSelectedPage(SelectedPage.Benefits)}>
        {/* HEADER */}
        <motion.div
          className='text-center'
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.3 }}
          variants={{
            hidden: { opacity: 0, x: -50 },
            visible: { opacity: 1, x: 0 }
          }}
        >
          <HText>MORE THAN JUST A SWIM.</HText>
          <div className='flex-col justify-center items-center gap-6 my-4'>
            <p className='my-4 text-gray-700 text-lg'>A wise man once said...</p>
            <p className='font-semibold  text-cyan-900 quotes'>
              &quot;If you can swim, you can win&quot;.
            </p>
          </div>
        </motion.div>

        {/* BENEFITS */}
        <motion.div
          className='flex flex-col md:flex-row items-center justify-between gap-8'
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, amount: 0.5 }}
          variants={container}
        >
          {benefits.map((benefit: BenefitType) => (
            <Benefit
              key={benefit.title}
              icon={benefit.icon}
              title={benefit.title}
              description={benefit.description}
              setSelectedPage={setSelectedPage}
            />
          ))}
        </motion.div>

        {/* GRAPHICS AND DESCRIPTION */}
        <div className='mt-16 items-center justify-center md:mt-28 flex '>
          {/* GRAPHIC */}
          <Image
            className='mx-auto object-cover'
            alt='benefits-page-graphic'
            src={BenefitsPageGraphic}
            height={500}
            width={500}
          />

          {/* DESCRIPTION */}
          <div>
            {/* TITLE */}
            <div className='relative'>
              <div className='text-center my-8'>
                <motion.div
                  initial='hidden'
                  whileInView='visible'
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.5 }}
                  variants={{
                    hidden: { opacity: 0, x: 50 },
                    visible: { opacity: 1, x: 0 }
                  }}
                >
                  <HText>
                    BUILD WITH A <span className='text-cyan-500'>TEAM</span>
                  </HText>
                </motion.div>
              </div>
            </div>

            {/* DESCRIPT */}
            <motion.div
              initial='hidden '
              whileInView='visible'
              className='text-center'
              viewport={{ once: true, amount: 0.5 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              variants={{
                hidden: { opacity: 0, x: 50 },
                visible: { opacity: 1, x: 0 }
              }}
            >
              <p className='my-5 text-xl text-gray-600'>A wise woman once said</p>
              <p className='mb-5 quotes tracking-wide text-cyan-900'>
                &quot;If you build with them, you will remember them.&quot;
              </p>
            </motion.div>

            {/* BUTTON */}
            <div className='relative mt-10'>
              <div className='flex justify-center items-center'>
                <button className=''>Join Now</button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}

export default Benefits
