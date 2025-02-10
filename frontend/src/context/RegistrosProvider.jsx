import { createContext, useState } from "react";
import axios from "axios";

const RegistrosContext = createContext();

const RegistrosProvider = ({ children }) => {
    const [modal, setModal] = useState(false);
    const [registros, setRegistros] = useState([]);
    const [mensaje, setMensaje] = useState({});

    const handleModal = () => {
        setModal(!modal);
    };

    const registrarRegistro = async (datos) => {
        const token = localStorage.getItem('token');
        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/registro/${datos.paciente}`;
            const options = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            };
            const respuesta = await axios.post(url, datos, options);
            setRegistros([respuesta.data.registro, ...registros]);
        } catch (error) {
            console.log(error);
        }
    };

    const eliminarRegistro = async (id) => {
        try {
            const confirmar = confirm("Vas a eliminar el registro de un paciente, ¿Estás seguro de realizar esta acción?");
            if (confirmar) {
                const token = localStorage.getItem('token');
                const url = `${import.meta.env.VITE_BACKEND_URL}/registro/${id}`;
                const options = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                };
                const response = await axios.delete(url, options);
                const registrosActualizados = registros.filter(registro => registro._id !== id);
                setRegistros(registrosActualizados);

                setMensaje({ respuesta: response.data?.msg, tipo: true });
                setTimeout(() => {
                    setMensaje({});
                }, 2000);
            }
        } catch (error) {
            setMensaje({ respuesta: error.response?.data?.msg, tipo: false });
        }
    };

    const cambiarRegistro = async (id) => {
        try {
            const confirmar = confirm("Vas a finalizar un registro, ¿Estás seguro de realizar esta acción?");
            if (confirmar) {
                const token = localStorage.getItem('token');
                const url = `${import.meta.env.VITE_BACKEND_URL}/registro/estado/${id}`;
                const options = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                };
                const response = await axios.post(url, {}, options);
                const registrosActualizados = registros.filter(registro => registro._id !== id);
                setRegistros(registrosActualizados);

                setMensaje({ respuesta: response.data?.msg, tipo: true });
                setTimeout(() => {
                    setMensaje({});
                }, 2000);
            }
        } catch (error) {
            setMensaje({ respuesta: error.response?.data?.msg, tipo: false });
        }
    };

    return (
        <RegistrosContext.Provider value={{
            modal,
            setModal,
            handleModal,
            registros,
            setRegistros,
            registrarRegistro,
            eliminarRegistro,
            cambiarRegistro,
        }}>
            {children}
        </RegistrosContext.Provider>
    );
};

export { RegistrosProvider };
export default RegistrosContext;
