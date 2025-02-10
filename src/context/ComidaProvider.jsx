// src/Context/ComidaProvider.js
import { createContext, useState, useContext } from 'react';
import axios from 'axios';
import AuthContext from './AuthProvider';

const ComidaContext = createContext();

const ComidaProvider = ({ children }) => {
  const { auth } = useContext(AuthContext); // Para acceder al estado de autenticación
  const [comidas, setComidas] = useState([]);
  const [modal, setModal] = useState(false);
  const [mensaje, setMensaje] = useState({});
  const [comidaActual, setComidaActual] = useState(null);

  // Función para obtener todas las comidas de un paciente
  const obtenerComidas = async (pacienteId) => {
    try {
      const token = localStorage.getItem('token');
      const url = `${import.meta.env.VITE_BACKEND_URL}/comidas/${pacienteId}`;
      const options = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.get(url, options);
      setComidas(data);
    } catch (error) {
      console.log(error);
    }
  };

  // Función para registrar una nueva comida
  const registrarComida = async (comida) => {
    try {
      const token = localStorage.getItem('token');
      const url = `${import.meta.env.VITE_BACKEND_URL}/comidas/${comida.pacienteId}`;
      const options = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.post(url, comida, options);
      setComidas([data.comida, ...comidas]);
      setMensaje({ tipo: true, respuesta: 'Comida registrada con éxito' });
      setTimeout(() => {
        setMensaje({});
      }, 2000);
    } catch (error) {
      setMensaje({ tipo: false, respuesta: 'Error al registrar la comida' });
      setTimeout(() => {
        setMensaje({});
      }, 2000);
    }
  };

  // Función para actualizar una comida
  const actualizarComida = async (id, comida) => {
    try {
      const token = localStorage.getItem('token');
      const url = `${import.meta.env.VITE_BACKEND_URL}/comidas/${id}`;
      const options = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.put(url, comida, options);
      setComidas(comidas.map(c => c._id === id ? data.comida : c));
      setMensaje({ tipo: true, respuesta: 'Comida actualizada con éxito' });
      setTimeout(() => {
        setMensaje({});
      }, 2000);
    } catch (error) {
      setMensaje({ tipo: false, respuesta: 'Error al actualizar la comida' });
      setTimeout(() => {
        setMensaje({});
      }, 2000);
    }
  };

  // Función para eliminar una comida
  const eliminarComida = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const url = `${import.meta.env.VITE_BACKEND_URL}/comidas/${id}`;
      const options = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.delete(url, options);
      setComidas(comidas.filter(comida => comida._id !== id));
      setMensaje({ tipo: true, respuesta: 'Comida eliminada con éxito' });
      setTimeout(() => {
        setMensaje({});
      }, 2000);
    } catch (error) {
      setMensaje({ tipo: false, respuesta: 'Error al eliminar la comida' });
      setTimeout(() => {
        setMensaje({});
      }, 2000);
    }
  };

  // Función para abrir o cerrar el modal
  const handleModal = (comida = null) => {
    setComidaActual(comida);
    setModal(!modal);
  };

  return (
    <ComidaContext.Provider
      value={{
        comidas,
        modal,
        setModal,
        handleModal,
        registrarComida,
        actualizarComida,
        eliminarComida,
        mensaje,
        obtenerComidas,
        comidaActual,
      }}
    >
      {children}
    </ComidaContext.Provider>
  );
};

export { ComidaProvider };
export default ComidaContext;
