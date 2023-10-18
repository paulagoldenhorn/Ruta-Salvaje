// eslint-disable-next-line no-unused-vars
import React from 'react'
import "./WhatsApp.css"
import { MdWhatsapp } from "react-icons/md";

const WhatsApp = () => {
  return (
    <a className='whatsApp' aria-label="Chatea con nosotros" href="https://wa.me/5491154022405">
      < MdWhatsapp className='whatsappIcon' />
    </a>

  )
}
export default WhatsApp