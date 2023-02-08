import { SelectedPage, ClassType } from '../../shared/types'
import image1 from '../../../public/image1.png'
import image2 from '../../../public/image2.png'
import image3 from '../../../public/image3.png'
import image4 from '../../../public/image4.png'
import image5 from '../../../public/image5.png'
import image6 from '../../../public/image6.png'
import { motion } from 'framer-motion'
import HText from '../../shared/HText'
import Class from './Class'

const classes: Array<ClassType> = [
  {
    name: 'Water Training Classes',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, deleniti. Aliquid odit ipsam hic? Eveniet quae blanditiis eos asperiores culpa quo voluptates nobis corporis, ut minus possimus distinctio nulla officia.',
    image: image1
  },
  {
    name: 'Calesthetics and Dynamic MovementClasses',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, deleniti. Aliquid odit ipsam hic? Eveniet quae blanditiis eos asperiores culpa quo voluptates nobis corporis, ut minus possimus distinctio nulla officia.',
    image: image2
  },
  {
    name: 'Weight Training Classes',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, deleniti. Aliquid odit ipsam hic? Eveniet quae blanditiis eos asperiores culpa quo voluptates nobis corporis, ut minus possimus distinctio nulla officia.',
    image: image3
  },
  {
    name: 'Fun and Game Playing Classes',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, deleniti. Aliquid odit ipsam hic? Eveniet quae blanditiis eos asperiores culpa quo voluptates nobis corporis, ut minus possimus distinctio nulla officia.',
    image: image4
  },
  {
    name: 'Creative and Advanced Training Classes',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, deleniti. Aliquid odit ipsam hic? Eveniet quae blanditiis eos asperiores culpa quo voluptates nobis corporis, ut minus possimus distinctio nulla officia.',
    image: image5
  },
  {
    name: 'Speed Classes',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, deleniti. Aliquid odit ipsam hic? Eveniet quae blanditiis eos asperiores culpa quo voluptates nobis corporis, ut minus possimus distinctio nulla officia.',
    image: image6
  }
]

type Props = {
  setSelectedPage: (value: SelectedPage) => void
}

const OurClasses = ({ setSelectedPage }: Props) => {
  return (
    <section id='ourclasses' className='w-full bg-primary-100 py-40'>
      <motion.div onViewportEnter={() => setSelectedPage(SelectedPage.OurClasses)}>
        <motion.div
          className='mx-auto w-5/6'
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          variants={{
            hidden: { opacity: 0, x: -50 },
            visible: { opacity: 1, x: 0 }
          }}
        >
          <div className='md:w-3/5'>
            <HText>OUR CLASSES</HText>
            <p className='py-5'>
              Fringilla a sed at suspendisse ut enim volutpat. Rhoncus vel est tellus quam
              porttitor. Mauris velit euismod elementum arcu neque facilisi. Amet semper tortor
              facilisis metus nibh. Rhoncus sit enim mattis odio in risus nunc.
            </p>
          </div>
        </motion.div>
        <div className='mt-10 h-[353px] w-full overflow-x-auto overflow-y-hidden'>
          <ul className=' whitespace-nowrap'>
            {classes.map((item: ClassType, index) => (
              <Class
                key={`${item.name}-${index}`}
                name={item.name}
                description={item.description}
                image={item.image}
              />
            ))}
          </ul>
        </div>
      </motion.div>
    </section>
  )
}

export default OurClasses
