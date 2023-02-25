import { useForm } from 'react-hook-form'
import { SelectedPage } from '../../shared/types'
import { motion } from 'framer-motion'

type Props = {
  setSelectedPage: (value: SelectedPage) => void
}

const ContactUs = ({ setSelectedPage }: Props) => {
  const inputStyles = `mb-5 w-full rounded-lg bg-gray-900 shadow-2xl shadow-[#f2f2f2]]
  px-5 py-3 placeholder-gray-400 text-white`

  const {
    register,
    trigger,
    formState: { errors }
  } = useForm()

  const onSubmit = async (e: any) => {
    const isValid = await trigger()
    if (!isValid) {
      e.preventDefault()
    }
  }

  return (
    <section id='contactus' className='mx-auto w-5/6 max-w-full h-full my-8'>
      <motion.div
        onViewportEnter={() => setSelectedPage(SelectedPage.ContactUs)}
      >
        {/* HEADER */}
        <motion.div
          className='md:w-3/5'
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          variants={{
            hidden: { opacity: 0, x: -100 },
            visible: { opacity: 1, x: 0 }
          }}
        >
          <h2 className=''>DO YOU HAVE ANY QUESTIONS?</h2>

          <p className='my-5'>Contact Adam for more information!</p>
        </motion.div>

        {/* FORM AND IMAGE */}
        <div className='mt-10 justify-between gap-8 md:flex '>
          <motion.div
            className='mt-10 basis-3/5 md:mt-0'
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5 }}
            variants={{
              hidden: { opacity: 0, y: 50 },
              visible: { opacity: 1, y: 0 }
            }}
          >
            <form
              target='_blank'
              onSubmit={onSubmit}
              action='https://formsubmit.co/e8a5bdfa807605332f809e5656e27c6e'
              method='POST'
            >
              <input
                className={inputStyles}
                type='text'
                placeholder='Name'
                {...register('name', {
                  required: true,
                  maxLength: 100
                })}
              />
              {errors.name && (
                <p className='mt-1 text-primary-500'>
                  {errors.name.type === 'required' && 'This field is required.'}
                  {errors.name.type === 'maxLength' &&
                    'Max length is 100 char.'}
                </p>
              )}

              <input
                className={inputStyles}
                type='text'
                placeholder='Email'
                {...register('email', {
                  required: true,
                  pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
                })}
              />
              {errors.email && (
                <p className='mt-1 text-primary-500'>
                  {errors.email.type === 'required' &&
                    'This field is required.'}
                  {errors.email.type === 'pattern' && 'Invalid email address.'}
                </p>
              )}

              <textarea
                className={inputStyles}
                placeholder='Message'
                rows={4}
                cols={50}
                {...register('message', {
                  required: true,
                  maxLength: 2000
                })}
              />
              {errors.message && (
                <p className='mt-1 text-primary-500'>
                  {errors.message.type === 'required' &&
                    'This field is required.'}
                  {errors.message.type === 'maxLength' &&
                    'Max length is 2000 char.'}
                </p>
              )}

              <button
                type='submit'
                className='border-2 hover:bg-gray-400 hover:text-gray-900 transition-colors ease-in duration-150 rounded-lg px-3 py-2 bg-gray-900 text-white font-semibold tracking-widest'
              >
                SEND IT
              </button>
            </form>
          </motion.div>

          <motion.div
            className='relative mt-16 basis-2/5 md:mt-0'
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true, amount: 0.5 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            variants={{
              hidden: { opacity: 0, y: 50 },
              visible: { opacity: 1, y: 0 }
            }}
          >
            <div className='w-full before:absolute before:-bottom-20 before:-right-10 before:z-[-1] md:before:content-evolvetext'></div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}

export default ContactUs
