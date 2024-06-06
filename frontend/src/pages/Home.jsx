import React from 'react'
import Hero from '../components/Hero'
import Biography from '../components/Biography'
import Departments from '../components/Departments'
import MessageForm from '../components/MessageForm'

function Home() {
  return (
    <>
    
    <Hero title={"Welcome to ZeeCare Medical Institute | Your Tursted HealthCare Provider"} imageUrl={"/hero.png"}></Hero>
    <Biography imageUrl={"/about.png"}></Biography>
    <Departments></Departments>
    <MessageForm></MessageForm>
    
    </>
  )
}

export default Home