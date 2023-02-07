import React from 'react'
import { SelectedPage } from '../shared/types'
import AnchorLink from 'react-anchor-link-smooth-scroll'

type Props = {
  children: React.ReactNode
  setSelectedPage: (value: SelectedPage) => void
}

const ActionButton = ({ children, setSelectedPage }: Props) => {
  return (
    <AnchorLink
      className='btn'
      onClick={() => setSelectedPage(SelectedPage.ContactUs)}
      href={`#${SelectedPage.ContactUs}`}
    >
      {children}
    </AnchorLink>
  )
}

export default ActionButton
