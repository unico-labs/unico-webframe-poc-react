import React from 'react'
import { useNavigate } from 'react-router-dom'

import '../../styles/global.css'
import './styles.css'
import packageJson from "../../../package.json";

export default function Home() {
  const navigate = useNavigate();


  return (
    <div className='main-container'>

      <main className='container'>
        <h1>
          Bem vindo a POC do Unico SDK Web v{packageJson.dependencies['unico-webframe']}
        </h1>

        <button
          className='btn-init'
          type='button'
          onClick={() => navigate('/sdk')}
        >
          Iniciar
        </button>
      </main>
    </div>
  )
}
