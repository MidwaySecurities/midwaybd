'use client'
import React from 'react'
import { FloatingWhatsApp } from 'react-floating-whatsapp'
import { useModalClose } from './close-button-provider'
import { useBottomModalClose } from '../context/firstApproachModalContext'
const  Whatsapp = () => {
  const {isModalOpen} = useModalClose()
  const {isModalOpen:isBottomModalOpen} = useBottomModalClose()
  return (
      <FloatingWhatsApp className={`text-black ${isModalOpen||isBottomModalOpen?'hidden':''}`} buttonStyle={{}} phoneNumber={`+8801874444816`} accountName = {'Midway Securities Ltd.'} avatar={`https://quicktradepro.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FQuickTrade-Pro-Logo-dark-1.b4b777f7.png&w=3840&q=75`} messageDelay ={2}  />
  )
}
export default Whatsapp;