import axios from 'axios';
import { createContext, useEffect, useState } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(() => {
        // Recuperar el perfil del usuario desde localStorage al inicializar
        const storedAuth = JSON.parse(localStorage.getItem('auth'));
        return storedAuth || {};
    });

    // Función para LEER el perfil del usuario
    const perfil = async (token) => {
        try {
            const url = `http://localhost:3000/api/perfilpaciente`;
            const options = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            };

            const respuesta = await axios.get(url, options);
            console.log('Perfil cargado:', respuesta.data);

            // Guardar el perfil en el estado y en localStorage
            setAuth(respuesta.data);
            localStorage.setItem('auth', JSON.stringify(respuesta.data));
        } catch (error) {
            console.log('Error al obtener el perfil:', error.response?.data?.msg || error.message);
            setAuth({}); // Limpiar el estado en caso de error
            localStorage.removeItem('auth'); // Eliminar el perfil guardado en localStorage
        }
    };

    const actualizarPerfil = async (datos) => {
        try {
            const token = localStorage.getItem("token");
            const url = `http://localhost:3000/api/paciente/${datos.id}`;
            const options = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            };
            const respuesta = await axios.put(url, datos, options);
            perfil(token); // Recargar el perfil después de actualizar
            return { respuesta: respuesta.data.msg, tipo: true };
        } catch (error) {
            return { respuesta: error.response.data.msg, tipo: false };
        }
    };

    const actualizarPassword = async (datos) => {
        const token = localStorage.getItem('token');
        try {
            const url = `http://localhost:3000/api/paciente/actualizarpassword`;
            const options = {
                headers: {
                    method: 'PUT',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            };
            const respuesta = await axios.put(url, datos, options);
            return { respuesta: respuesta.data.msg, tipo: true };
        } catch (error) {
            return { respuesta: error.response.data.msg, tipo: false };
        }
    };

    // useEffect para verificar si hay un token en localStorage al cargar la aplicación
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            perfil(token); // Cargar el perfil si hay un token
        } else {
            setAuth({}); // Limpiar el estado si no hay token
            localStorage.removeItem('auth'); // Eliminar el perfil guardado en localStorage
        }
    }, []);

    return (
        <AuthContext.Provider
            value={{
                auth, // Información del usuario autenticado
                setAuth, // Permite actualizar el estado desde otros componentes
                actualizarPerfil,
                actualizarPassword,
            }}
        >
            {children} {/* Renderiza los componentes hijos */}
        </AuthContext.Provider>
    );
};

export { AuthProvider };
export default AuthContext;