import ActionButton from '../../shared/ActionButton'
import useMediaQuery from '../../hooks/useMediaQuery'
import HText from '../../shared/HText'
import { BenefitType, SelectedPage } from '../../shared/types'
import { Home, User, Feather } from 'react-feather'
import { motion } from 'framer-motion'
import BenefitsPageGraphic from '../../../public/assets/teamPhoto.jpeg'
import Benefit from './Benefit'
import Image from 'next/image'

const benefits: Array<BenefitType> = [
  {
    icon: <Home className='h-6 w-6' />,
    title: 'State of the Art Facilities',
    description:
      'Neque adipiscing amet amet enim. Feugiat dolor enim fermentum in a in lectus pellentesque. Ullamcorper et.'
  },
  {
    icon: <User className='h-6 w-6' />,
    title: "100's of Diverse Classes",
    description:
      'Eu ipsum id egestas risus tempus enim semper felis quis. Nec consectetur ac venenatis facilisi est. Eget ac turpis id.'
  },
  {
    icon: <Feather className='h-6 w-6' />,
    title: 'Expert and Pro Trainers',
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
  const isAboveMediumScreens = useMediaQuery('(min-width:1060px)')

  return (
    <section
      id='benefits'
      className='flex flex-col justify-center items-center min-h-full w-full p-4'
    >
      <motion.div onViewportEnter={() => setSelectedPage(SelectedPage.Benefits)}>
        {/* HEADER */}
        <motion.div
          className='md:my-5 '
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.3 }}
          variants={{
            hidden: { opacity: 0, x: -50 },
            visible: { opacity: 1, x: 0 }
          }}
        >
          <HText>MORE THAN JUST GYM.</HText>
          <p className='my-5 text-sm'>
            We provide world class fitness equipment, trainers and classes to get you to your
            ultimate fitness goals with ease. We provide true care into each and every member.
          </p>
        </motion.div>

        {/* BENEFITS */}
        <motion.div
          className='mt-5 items-center justify-between gap-8 md:flex'
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
        <div className='mt-16 items-center justify-between gap-20 md:mt-28 md:flex '>
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
            <div className='relative'>
              <div className='before:absolute before:-top-20 before:-left-20 before:z-[1] before:content-abstractwaves'>
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
                    OUR MEMBERS ARE ENJOY THE TEAM COMRADERY WHILE HAPPY MEMBERS GETTING{' '}
                    <span className='text-cyan-500'>FIT</span>
                  </HText>
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
                consectetur adipiscing ultricies enim. Pulvinar fames vitae vitae quis. Quis amet
                vulputate tincidunt at in nulla nec. Consequat sed facilisis dui sit egestas
                ultrices tellus. Ullamcorper arcu id pretium sapien proin integer nisl. Felis orci
                diam odio.
              </p>
              <p className='mb-5'>
                Fringilla a sed at suspendisse ut enim volutpat. Rhoncus vel est tellus quam
                porttitor. Mauris velit euismod elementum arcu neque facilisi. Amet semper tortor
                facilisis metus nibh. Rhoncus sit enim mattis odio in risus nunc.
              </p>
            </motion.div>

            {/* BUTTON */}
            <div className='relative mt-16'>
              <div className='before:absolute before:-bottom-20 before:right-40 before:z-[-1] before:content-sparkles'>
                <ActionButton setSelectedPage={setSelectedPage}>Join Now</ActionButton>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}

export default Benefits
