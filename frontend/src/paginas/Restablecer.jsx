import logoDog from '../assets/dog-hand.webp';
import { Link, useParams } from 'react-router-dom';
import Mensaje from '../componets/Alertas/Mensaje';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Restablecer = () => {
    const { token } = useParams();
    const [mensaje, setMensaje] = useState({});
    const [tokenback, setTokenBack] = useState(false);
    const [form, setForm] = useState({
        password: "",
        confirmpassword: ""
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const verifyToken = async () => {
        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/recuperar-password/${token}`;
            const respuesta = await axios.get(url);
            setTokenBack(true);
            setMensaje({ respuesta: respuesta.data.msg, tipo: true });

            setTimeout(() => {
                setMensaje({});
            }, 3000);
        } catch (error) {
            setMensaje({ respuesta: error.response.data.msg, tipo: false });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/nuevo-password/${token}`;
            const respuesta = await axios.post(url, form);
            setForm({});
            setMensaje({ respuesta: respuesta.data.msg, tipo: true });
        } catch (error) {
            setMensaje({ respuesta: error.response.data.msg, tipo: false });
        }
    };

    useEffect(() => {
        verifyToken();
    }, []);

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
            <div className="flex flex-col md:flex-row w-full h-screen bg-white shadow-md">
                {/* Sección Izquierda - Imagen */}
                <div className="hidden md:flex w-1/2 relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-green-600/70 to-blue-600/70 backdrop-blur-sm"></div>
                    <img src={logoDog} alt="Restablecer contraseña" className="w-full h-full object-cover" />
                </div>

                {/* Sección Derecha - Formulario */}
                <div className="w-full md:w-1/2 flex justify-center items-center p-8 bg-white h-screen">
                    <div className="w-full max-w-md">
                        {Object.keys(mensaje).length > 0 && <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>}

                        <div className="text-center mb-6">
                            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600">
                                Reset Your Password
                            </h1>
                            <p className="text-gray-600 mt-2 text-sm">
                                Enter a new password to secure your account
                            </p>
                        </div>

                        {tokenback && (
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">New Password</label>
                                    <input
                                        type="password"
                                        name="password"
                                        value={form.password || ""}
                                        onChange={handleChange}
                                        placeholder="Enter your new password"
                                        className="block w-full rounded-md border border-teal-300 focus:border-teal-600 focus:outline-none focus:ring-1 focus:ring-teal-600 py-2 px-3 text-gray-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
                                    <input
                                        type="password"
                                        name="confirmpassword"
                                        value={form.confirmpassword || ""}
                                        onChange={handleChange}
                                        placeholder="Repeat your password"
                                        className="block w-full rounded-md border border-teal-300 focus:border-teal-600 focus:outline-none focus:ring-1 focus:ring-teal-600 py-2 px-3 text-gray-500"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full py-3 bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-lg hover:from-green-600 hover:to-blue-700 transition-all duration-200 shadow-md"
                                >
                                    Reset Password
                                </button>
                            </form>
                        )}

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
    );
};

export default Restablecer;
