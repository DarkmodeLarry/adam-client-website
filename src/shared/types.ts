export enum SelectedPage {
  Home = 'home',
  About = 'about',
  OurClasses = 'ourclasses',
  ContactUs = 'contactUs',
  Calendar = 'calendar'
}

export interface AboutType {
  icon: JSX.Element
  title: string
  description: string
}

export interface ClassType {
  name: string
  description?: string
  image: string
}
