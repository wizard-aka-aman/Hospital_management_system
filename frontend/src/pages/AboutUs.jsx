import React from 'react'
import Hero from '../components/Hero'
import Biography from '../components/Biography'

function AboutUs() {
  return (
    <>
    <Hero title={"Learn more about us | ZeeCare Medical Institute "} imageUrl={"/about.png"}></Hero>

    <Biography imageUrl={"/whoweare.png"}></Biography>
    </>
  )
}

export default AboutUs