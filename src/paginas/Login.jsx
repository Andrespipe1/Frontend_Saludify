import { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../context/AuthProvider'
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const navigate = useNavigate()
    const { setAuth } = useContext(AuthContext)

    const [form, setForm] = useState({
        email: "",
        password: ""
    })

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const url = `http://localhost:3000/api/login`
            const respuesta = await axios.post(url, form)
            localStorage.setItem("token", respuesta.data.token)
            setAuth(respuesta.data)
            toast.success(respuesta.data.msg)
            navigate('/dashboard')
        } catch (error) {
            toast.error(error.response.data.msg)
        }
    }

    return (
        <div className="min-h-screen w-full flex">
            <ToastContainer />

            <div className="w-full flex flex-col md:flex-row">
                {/* Sección Izquierda - Imagen */}
                <div className="hidden md:flex w-1/2 relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-green-600/70 to-blue-600/70 backdrop-blur-sm"></div>
                    <div
                        className="w-full h-full bg-cover bg-center"
                        style={{ backgroundImage: "url('/fondo.jpeg')" }}
                    ></div>
                    <div className="absolute inset-0 flex flex-col justify-center items-center text-white px-12 py-16">
                        <h2 className="text-4xl font-bold mb-10 text-white text-center leading-tight">
                            Health Monitoring System
                        </h2>
                        <ul className="space-y-6 text-lg">
                            <li className="flex items-center gap-4">
                                <span className="flex items-center justify-center w-8 h-8 bg-white/20 rounded-full">
                                    <span className="text-green-300 text-xl">✔</span>
                                </span>
                                <span className="text-white">24/7 Health Monitoring</span>
                            </li>
                            <li className="flex items-center gap-4">
                                <span className="flex items-center justify-center w-8 h-8 bg-white/20 rounded-full">
                                    <span className="text-green-300 text-xl">✔</span>
                                </span>
                                <span className="text-white">
                                    AI-Powered Health Recommendations
                                </span>
                            </li>
                            <li className="flex items-center gap-4">
                                <span className="flex items-center justify-center w-8 h-8 bg-white/20 rounded-full">
                                    <span className="text-green-300 text-xl">✔</span>
                                </span>
                                <span className="text-white">Intelligent Health Assistant</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Formulario de login */}
                <div className="w-full md:w-1/2 min-h-screen flex items-center justify-center p-8 lg:p-16 bg-white">
                    <div className="w-full max-w-md space-y-8">
                        <div className="text-center">
                            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600 mb-3">
                                SALUDIFY
                            </h1>
                            <p className="text-gray-600 text-lg">
                                Your Personal Health Assistant
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6 mt-8">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700">
                                    Email
                                </label>
                                <input
                                    name="email"
                                    type="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    placeholder="Enter your email"
                                    className="block w-full rounded-lg border-2 border-teal-300 focus:border-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-600/50 py-3 px-4 text-gray-600 text-base"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700">
                                    Password
                                </label>
                                <input
                                    name="password"
                                    type="password"
                                    value={form.password}
                                    onChange={handleChange}
                                    placeholder="************"
                                    className="block w-full rounded-lg border-2 border-teal-300 focus:border-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-600/50 py-3 px-4 text-gray-600 text-base"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full py-4 bg-gradient-to-r from-green-500 to-blue-600 text-white text-lg font-semibold rounded-lg hover:from-green-600 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                            >
                                Access Your Health Dashboard
                            </button>
                        </form>

                        <div className="relative my-8">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300"></div>
                            </div>
                            <div className="relative flex justify-center">
                                <span className="bg-white px-4 text-sm text-gray-500 font-medium">
                                    OR CONTINUE WITH
                                </span>
                            </div>
                        </div>

                        <div className="space-y-6 text-center">
                            <Link
                                to="/forgot/id"
                                className="block text-base text-gray-600 hover:text-blue-600 transition-colors"
                            >
                                Forgot your password?
                            </Link>

                            <div className="space-y-3">
                                <p className="text-gray-600">Don't have an account?</p>
                                <Link
                                    to="/register"
                                    className="inline-block w-full py-3 px-6 bg-teal-600 text-white text-lg font-semibold rounded-lg hover:bg-teal-700 transition-all duration-200 hover:shadow-lg"
                                >
                                    Register
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;