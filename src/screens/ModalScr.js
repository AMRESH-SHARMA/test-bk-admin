import React from 'react'
import Modal from '../assets/Modal/Modal'
import { useModal } from "../Redux/actions/useModal";

const ModalScr = () => {
  const { showModal } = useModal();

  const handleModal = () => {
    showModal({
      message: "Login Failed"
    })
  }

  return (
    <>
      <Modal />
      <button type='button' className='gbtn1' onClick={handleModal}>OPEN MODAL</button>
    </>
  )
}

export default ModalScr