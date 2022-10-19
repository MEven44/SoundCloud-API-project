import React, { useState } from 'react'
import  LoginForm  from './LoginForm'
import { Modal } from '../../context/model'



const LoginFormModal = () => {

const [showModal, setShowModal] = useState(false)
console.log('LOGINMODAL' ,showModal)

return (
  <>
    <button onClick={() => setShowModal(true)}>Log In</button>
    {showModal &&  (<Modal onClose={()=> setShowModal(false)}>
        <LoginForm />
    </Modal>)}
  </>
);
}

export default LoginFormModal