import ActionButton from '../../shared/ActionButton'
import HText from '../../shared/Heading'
import { type BenefitType, SelectedPage } from '../../shared/types'
import { Home, User, Feather } from 'react-feather'
import { motion } from 'framer-motion'
import BenefitsPageGraphic from '../../../public/assets/teamPhoto.jpeg'
import Benefit from './Benefit'
import Image from 'next/image'

const benefits: Array<BenefitType> = [
  {
    icon: <Home className='h-6 w-6' />,
    title: 'Health',
    description:
      'Neque adipiscing amet amet enim. Feugiat dolor enim fermentum in a in lectus pellentesque. Ullamcorper et.'
  },
  {
    icon: <User className='h-6 w-6' />,
    title: 'Skills and Confidence',
    description:
      'Eu ipsum id egestas risus tempus enim semper felis quis. Nec consectetur ac venenatis facilisi est. Eget ac turpis id.'
  },
  {
    icon: <Feather className='h-6 w-6' />,
    title: 'Teamwork',
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
      className='flex flex-col justify-center min-h-full md:text-center w-full py-10 bg-gradient-to-br from-gray-100 to-gray-300'
    >
      <motion.div onViewportEnter={() => setSelectedPage(SelectedPage.Benefits)}>
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
          <HText>COACH ADAM</HText>
          <div className='flex flex-col bg-[#f2f2f2] items-center md:flex-row justify-center gap-10 space-y-5 md:gap-20 '>
            <div className='text-sm md:w-4/12 '>
              <p className='font-montserrat leading-8 text-left p-5'>
                Adam brings a wealth of over 20 years of experience both as a coach and also as a
                accomplished competitive swimmer. He&apos;s enjoyed many accomplishments during his
                time as a competitive athlete has also set numerous team records. This led to an
                athletic scholarship to UC Santa Barbara where he earned a Bachelors Degree in
                Philosophy with a minor in Athletic Coaching. He now resides back in Fountain Valley
                to give back to the community that has given so much to him.
              </p>
            </div>
            <div className='border-2 border-gray-900 w-5/6 m-10 md:w-4/12 justify-center flex flex-col items-center h-64'>
              <p className='text-xl font-montserrat'>[Insert Badass Photo of our guy Adam]</p>
            </div>
          </div>
        </motion.div>

        {/* BENEFITS */}
        <motion.div
          className='mt-5 flex flex-col items-center justify-between gap-8 md:flex-row'
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
        <div className='mt-16 items-center justify-between gap-20 md:mt-28 md:flex text-center space-y-10 '>
          {/* GRAPHIC */}
          <Image
            className='mx-auto object-cover'
            alt='benefits-page-graphic'
            src={BenefitsPageGraphic}
            height={400}
            width={400}
          />

          {/* DESCRIPTION */}
          <div>
            {/* TITLE */}
            <div className=''>
              <div className=''>
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
                    JOIN THE<span className='text-cyan-500'> FAMILY</span>
                  </HText>
                  <p>ENJOY THE COMRADERY OF A SWIM TEAM WHILE GETTING FIT, SKILLED AND STRONG</p>
                </motion.div>
              </div>
            </div>

            {/* DESCRIPT */}
            <motion.div
              initial='hidden'
              whileInView='visible'
              viewport={{ once: true, amount: 0.5 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              variants={{
                hidden: { opacity: 0, x: 50 },
                visible: { opacity: 1, x: 0 }
              }}
            >
              <p className='my-5'>
                Nascetur aenean massa auctor tincidunt. Iaculis potenti amet egestas ultrices
                consectetur adipiscing ultricies enim. Pulvinar fames vitae vitae quis. Quis amet.
              </p>
              <p className='mb-5'>
                Fringilla a sed at suspendisse ut enim volutpat. Rhoncus vel est tellus quam
                porttitor. Mauris velit euismod elementum arcu neque facilisi. Amet semper tortor
                facilisis metus nibh. Rhoncus sit enim mattis odio in risus nunc.
              </p>
            </motion.div>

            {/* BUTTON */}
            <div className='relative mt-10'>
              <div className=''>
                <button className='button'>Join Now</button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}

export default Benefits
