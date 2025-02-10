import axios from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

export const Forgot = () => {
    // Paso 1: crear el useState
    const [mail, setMail] = useState({});

    // Paso 2: guardar informacion en el state
    const handleChange = (e) => {
        setMail({
            ...mail,
            [e.target.name]: e.target.value,
        });
    };

    // Paso 3:
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = "https://frontend-saludify.vercel.app//api/recuperar-password";
            const respuesta = await axios.post(url, mail);
            console.log(respuesta.data.msg);
            toast.success(respuesta.data.msg);
        } catch (error) {
            console.log(error);
            toast.error(error.response.msg);
        }
    };

    return (
        <>
            <ToastContainer />
            <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
                <div className="flex flex-col md:flex-row w-full h-screen bg-white shadow-md">
                    {/* Sección Izquierda - Imagen */}
                    <div className="hidden md:flex w-1/2 relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-green-600/70 to-blue-600/70 backdrop-blur-sm"></div>
                        <div
                            className="w-full h-full bg-cover bg-center"
                            style={{ backgroundImage: "url('/pass.jpeg')" }}
                        ></div>
                    </div>

                    {/* Formulario de Recuperación de Contraseña */}
                    <div className="w-full md:w-1/2 flex justify-center items-center p-8 bg-white h-screen">
                        <div className="w-full max-w-md">
                            <div className="text-center mb-6">
                                <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600">
                                    SALUDIFY
                                </h1>
                                <p className="text-gray-600 mt-2 text-sm">
                                    Enter your email to reset your password
                                </p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Email</label>
                                    <input
                                        name="email"
                                        onChange={handleChange}
                                        type="email"
                                        placeholder="Enter your email"
                                        className="block w-full rounded-md border border-teal-300 focus:border-teal-600 focus:outline-none focus:ring-1 focus:ring-teal-600 py-2 px-3 text-gray-500"
                                    />
                                </div>

                                <div className="my-4">
                                    <button className="w-full py-3 bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-lg hover:from-green-600 hover:to-blue-700 transition-all duration-200 shadow-md">
                                        Send Email
                                    </button>
                                </div>
                            </form>

                            <div className="mt-3 text-sm text-center">
                                <p>Remembered your password?</p>
                                <Link
                                    to="/login"
                                    className="mt-2 inline-block py-2 px-5 bg-teal-600 text-white border rounded-xl hover:scale-110 duration-300 hover:bg-teal-800"
                                >
                                    Login
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
