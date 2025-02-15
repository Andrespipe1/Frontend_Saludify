import React from 'react'
import Tabla from '../componets/Tabla'

const Listar = () => {
    return (
        <div>
            <h1 className='font-black text-4xl text-gray-500'>Listar datos de salud</h1>
            <hr className='my-4' />
            <p className='mb-8'>Este módulo te permite listar Registros</p>
            <Tabla/>
        </div>
    )
}

export default Listar