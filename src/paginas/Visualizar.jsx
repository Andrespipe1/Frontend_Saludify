import { useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import Mensaje from '../componets/Alertas/Mensaje';
import ModalRegistro from '../componets/Models/ModalRegistro'; // Si quieres el modal para registrar
import RegistrosContext from '../context/RegistrosProvider'; // Asegúrate de tener el contexto de Registros
import AuthContext from '../context/AuthProvider'; // Necesitamos el contexto de Auth

const Visualizar = () => {
    const { auth } = useContext(AuthContext)
    const { id } = useParams();
    const [paciente, setPaciente] = useState({});
    const [registros, setRegistros] = useState([]);
    const [mensaje, setMensaje] = useState({});
    const { modal, handleModal, eliminarRegistro, cambiarRegistro } = useContext(RegistrosContext);

    const formatearFecha = (fecha) => {
        const nuevaFecha = new Date(fecha);
        nuevaFecha.setMinutes(nuevaFecha.getMinutes() + nuevaFecha.getTimezoneOffset());
        return new Intl.DateTimeFormat('es-EC', { dateStyle: 'long' }).format(nuevaFecha);
    }

    useEffect(() => {
        const consultarPacienteYRegistros = async () => {
            try {
                const token = localStorage.getItem('token');
                const urlPaciente = `http://localhost:3000/api/paciente/${id}`;
                const urlRegistros = `http://localhost:3000/api/registro/${id}`;
                
                const options = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                };

                const respuestaPaciente = await axios.get(urlPaciente, options);
                const respuestaRegistros = await axios.get(urlRegistros, options);

                setPaciente(respuestaPaciente.data.paciente);
                setRegistros(respuestaRegistros.data.registros);

            } catch (error) {
                setMensaje({ respuesta: error.response.data.msg, tipo: false });
            }
        };
        consultarPacienteYRegistros();
    }, [id]);

    return (
        <>
            <div>
                <h1 className='font-black text-4xl text-gray-500'>Visualizar Paciente</h1>
                <hr className='my-4' />
                <p className='mb-8'>Este submódulo te permite visualizar los datos del paciente</p>
            </div>
            <div>
                {
                    Object.keys(paciente).length !== 0 ? (
                        <>
                            <div className='m-5 flex justify-between'>
                                <div>
                                    <p className="text-md text-gray-00 mt-4">
                                        <span className="text-gray-600 uppercase font-bold">* Nombre del paciente: </span>
                                        {paciente.nombre}
                                    </p>
                                    <p className="text-md text-gray-00 mt-4">
                                        <span className="text-gray-600 uppercase font-bold">* Propietario: </span>
                                        {paciente.propietario}
                                    </p>
                                    <p className="text-md text-gray-00 mt-4">
                                        <span className="text-gray-600 uppercase font-bold">* Estado: </span>
                                        <span className="bg-blue-100 text-green-500 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
                                            {paciente.estado && "activo"}
                                        </span>
                                    </p>
                                </div>
                            </div>
                            <hr className='my-4' />

                            {/* Tabla de Registros */}
                            <div className="mt-5">
                                <table className='w-full mt-5 table-auto shadow-lg bg-white'>
                                    <thead className='bg-gray-800 text-slate-400'>
                                        <tr>
                                            <th className='p-2'>N°</th>
                                            <th className='p-2'>Peso</th>
                                            <th className='p-2'>Estatura</th>
                                            <th className='p-2'>Nivel Actividad</th>
                                            <th className='p-2'>Horas Sueño</th>
                                            <th className='p-2'>Nivel Estrés</th>
                                            <th className='p-2'>Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            registros.length > 0 ? (
                                                registros.map((registro, index) => (
                                                    <tr key={registro._id} className="border-b hover:bg-gray-300 text-center">
                                                        <td>{index + 1}</td>
                                                        <td>{registro.peso}</td>
                                                        <td>{registro.estatura}</td>
                                                        <td>{registro.nivelActividadFisica}</td>
                                                        <td>{registro.horasDeSueño}</td>
                                                        <td>{registro.nivelEstres}</td>
                                                        <td className='py-2 text-center'>
                                                            {auth.rol === "paciente" && (
                                                                <>
                                                                    <button
                                                                        onClick={() => cambiarRegistro(registro._id)}
                                                                        className="text-yellow-500"
                                                                    >
                                                                        Cambiar Estado
                                                                    </button>

                                                                    <button
                                                                        onClick={() => eliminarRegistro(registro._id)}
                                                                        className="text-red-500"
                                                                    >
                                                                        Eliminar
                                                                    </button>
                                                                </>
                                                            )}
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="7" className="text-center">No hay registros para este paciente</td>
                                                </tr>
                                            )
                                        }
                                    </tbody>
                                </table>
                            </div>

                            {/* Mostrar Modal de Registro */}
                            {modal && <ModalRegistro idPaciente={paciente._id} />}
                            {auth.rol === "veterinario" && (
                                <button className="px-5 py-2 bg-green-800 text-white rounded-lg hover:bg-green-700 mt-5" onClick={handleModal}>Registrar nuevo registro</button>
                            )}

                        </>
                    ) : (
                        Object.keys(mensaje).length > 0 && <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>
                    )
                }
            </div>
        </>
    );
};

export default Visualizar;
