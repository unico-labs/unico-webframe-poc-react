import React from 'react'
import { useNavigate } from 'react-router-dom'

import '../../styles/global.css'
import './styles.css'

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className='main-container'>
      <button 
        className='btn-init' 
        type='button' 
        onClick={() => navigate('/sdk')}
      >
        Iniciar
      </button>
    </div>
  )
}
