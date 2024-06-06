import React from 'react'
import AppointmentForm from '../components/AppointmentForm'
import Hero from '../components/Hero'

function Appointment() {
  return (
    <>
    <Hero title={"Schedule Your Appointment | Zeecare Medical Institute"} imageUrl={"/signin.png"}></Hero>
    
    <AppointmentForm></AppointmentForm>
    </>
  )
}

export default Appointment