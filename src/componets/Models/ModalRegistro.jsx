import { useState, useContext } from "react"
import registrosContext from "../../context/RegistrosProvider"

const ModalRegistro = ({ idPaciente }) => {
    const { setModal, handleModal, registrarRegistro } = useContext(registrosContext)

    const [form, setForm] = useState({
        peso: "",
        estatura: "",
        nivelActividadFisica: "",
        horasDeSueño: "",
        nivelEstres: "",
        pacienteId: idPaciente,
    })

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        registrarRegistro(form)
        setModal(false)
    }

    return (
        <div className="lg:w-2/4 lg:h-3/5 bg-gray-800 bg-opacity-100 top-1/4 left-1/3 fixed sticky-0 rounded-lg overflow-y-scroll">
            <p className='text-white uppercase font-bold text-lg text-center mt-4'>Nuevo Registro</p>
            <form className='p-10' onSubmit={handleSubmit}>
                <div>
                    <label htmlFor='peso' className='text-white uppercase font-bold text-sm'>Peso: </label>
                    <input
                        id='peso'
                        type="number"
                        className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                        placeholder='Peso en kilogramos'
                        name='peso'
                        onChange={handleChange}
                        value={form.peso}
                    />
                </div>
                <div>
                    <label htmlFor='estatura' className='text-white uppercase font-bold text-sm'>Estatura: </label>
                    <input
                        id='estatura'
                        type="number"
                        className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                        placeholder='Estatura en centímetros'
                        name='estatura'
                        onChange={handleChange}
                        value={form.estatura}
                    />
                </div>
                <div>
                    <label htmlFor='nivelActividadFisica' className='text-white uppercase font-bold text-sm'>Nivel de Actividad Física: </label>
                    <input
                        id='nivelActividadFisica'
                        type="text"
                        className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                        placeholder='Nivel de actividad física (Escala 1-10)'
                        name='nivelActividadFisica'
                        onChange={handleChange}
                        value={form.nivelActividadFisica}
                    />
                </div>
                <div>
                    <label htmlFor='horasDeSueño' className='text-white uppercase font-bold text-sm'>Horas de Sueño: </label>
                    <input
                        id='horasDeSueño'
                        type="number"
                        className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                        placeholder='Horas de sueño'
                        name='horasDeSueño'
                        onChange={handleChange}
                        value={form.horasDeSueño}
                    />
                </div>
                <div>
                    <label htmlFor='nivelEstres' className='text-white uppercase font-bold text-sm'>Nivel de Estrés: </label>
                    <input
                        id='nivelEstres'
                        type="text"
                        className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                        placeholder='Nivel de estrés'
                        name='nivelEstres'
                        onChange={handleChange}
                        value={form.nivelEstres}
                    />
                </div>
                <div>
                    <label className='text-white uppercase font-bold text-sm'>ID Paciente: </label>
                    <input
                        type="text"
                        disabled
                        value={idPaciente}
                        className='border-2 w-full p-2 mt-2 placeholder-gray-200 bg-slate-300 rounded-md mb-5'
                        name='pacienteId'
                        onChange={handleChange}
                    />
                </div>
                <div className='flex justify-center gap-5'>
                    <input
                        type="submit"
                        className='bg-green-700 px-6 text-slate-300 rounded-lg hover:bg-green-900 cursor-pointer'
                        value='Registrar' />
                    <button
                        className="sm:w-auto leading-3 text-center text-white px-6 py-4 rounded-lg bg-red-700 hover:bg-red-900"
                        onClick={handleModal}
                    >
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    )
}

export default ModalRegistro
