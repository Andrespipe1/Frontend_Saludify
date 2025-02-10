import { useContext } from "react";
import { MdDeleteForever, MdOutlineSecurityUpdateGood, MdPublishedWithChanges } from "react-icons/md";
import RegistrosContext from "../context/RegistrosProvider";
import AuthContext from "../context/AuthProvider";

const TablaRegistros = ({ registros }) => {
    const { auth } = useContext(AuthContext)
    const { eliminarRegistro, cambiarRegistro, handleModal } = useContext(RegistrosContext)

    return (
        <table className='w-full mt-5 table-auto shadow-lg bg-white'>
            <thead className='bg-gray-800 text-slate-400'>
                <tr>
                    <th className='p-2'>N°</th>
                    <th className='p-2'>Peso</th>
                    <th className='p-2'>Estatura</th>
                    <th className='p-2'>Nivel Actividad</th>
                    <th className='p-2'>Horas Sueño</th>
                    <th className='p-2'>Nivel Estrés</th>
                    <th className='p-2'>Estado</th>
                    <th className='p-2'>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {
                    registros.map((registro, index) => (
                        <tr className="border-b hover:bg-gray-300 text-center" key={registro._id}>
                            <td>{index + 1}</td>
                            <td>{registro.peso}</td>
                            <td>{registro.estatura}</td>
                            <td>{registro.nivelActividadFisica}</td>
                            <td>{registro.horasDeSueño}</td>
                            <td>{registro.nivelEstres}</td>
                            <td>
                                <span className="bg-blue-100 text-green-500 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">{registro.estado && "activo"}</span>
                            </td>
                            <td className='py-2 text-center'>
                                {auth.rol === "veterinario" && (
                                    <>
                                        <MdPublishedWithChanges className="h-7 w-7 text-slate-800 cursor-pointer inline-block mr-2" onClick={() => { cambiarRegistro(registro._id) }} />

                                        <MdOutlineSecurityUpdateGood className="h-7 w-7 text-slate-800 cursor-pointer inline-block mr-2" onClick={handleModal} />

                                        <MdDeleteForever className="h-8 w-8 text-red-900 cursor-pointer inline-block" onClick={() => { eliminarRegistro(registro._id) }} />
                                    </>
                                )}
                            </td>
                        </tr>
                    ))
                }

            </tbody>
        </table>
    )
}

export default TablaRegistros
