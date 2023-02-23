import HText from '../../shared/Heading'
import { type BenefitType, SelectedPage } from '../../shared/types'
import { FaSwimmer, FaHeartbeat } from 'react-icons/fa'
import { GiStrong } from 'react-icons/gi'
import { motion } from 'framer-motion'
import BenefitsPageGraphic from '../../../public/assets/teamPhoto.jpeg'
import Benefit from './Benefit'
import Image from 'next/image'

const benefits: Array<BenefitType> = [
  {
    icon: <FaHeartbeat className='h-8 w-8 text-red-800' />,
    title: 'Health',
    description:
      'Neque adipiscing amet amet enim. Feugiat dolor enim fermentum in a in lectus pellentesque. Ullamcorper et.'
  },
  {
    icon: <FaSwimmer className='h-8 w-8' />,
    title: 'Skills for Life',
    description:
      'Eu ipsum id egestas risus tempus enim semper felis quis. Nec consectetur ac venenatis facilisi est. Eget ac turpis id.'
  },
  {
    icon: <GiStrong className='h-8 w-8' />,
    title: 'Confidence',
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
    <section id='benefits' className='flex flex-col justify-center  md:text-center w-full py-10'>
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
          <div className='flex flex-col bg-[#f2f2f2] items-center md:flex-row justify-center  space-y-5 md:gap-20 '>
            <div className='text-sm md:w-4/12 mt-5 mb-16 '>
              <HText>COACH ADAM</HText>
              <p className='font-montserrat leading-8 text-left p-5'>
                Adam brings a wealth of experience both as a coach and as an accomplished
                competitive swimmer to his program. With over 20 years of experience, He&apos;s
                enjoyed many achievements during his time as a competitive athlete has also set
                numerous team records. This led to an athletic scholarship to UC Santa Barbara where
                he earned a Bachelors Degree in Philosophy with a minor in Athletic Coaching. He now
                resides back in Fountain Valley to give back to the community that has given so much
                to him.
              </p>
            </div>
            <div className='border-2 border-gray-900 justify-center flex flex-col items-center w-96 h-64'>
              <p className='text-xl font-montserrat'>[Insert Badass Photo of our guy Adam]</p>
            </div>
          </div>
        </motion.div>

        {/* BENEFITS */}
        <motion.div
          className='flex flex-col items-center justify-evenly mt-16 gap-8 md:flex-row'
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
        <div className='mt-20 md:mt-36 items-center justify-center flex flex-col md:flex-row w-full text-center'>
          {/* GRAPHIC */}
          <Image
            className='mx-auto object-cover'
            alt='benefits-page-graphic'
            src={BenefitsPageGraphic}
            height={400}
            width={400}
          />

          {/* DESCRIPTION */}

          {/* TITLE */}
          <div className='mt-10 md:mt-0 md:w-1/2 px-10'>
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

            <div className='flex justify-center w-full items-center'>
              <button className='button'>Join Now</button>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}

export default Benefits
