import React from 'react'
import OurServices from './OurServices'
import Testimonials from './Testimonials'
import Categories from './Categories'
import Banner from '../../components/Banner'
import SpecialProduct from './SpecialProduct'

const Home = () => {
  return (
    <div>
        <Banner/>
        <Categories/>
        <SpecialProduct/>
        <Testimonials/>
        <OurServices/>
        
    </div>
  )
}

export default Home