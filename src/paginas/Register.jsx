import { Link } from "react-router-dom";
import { useState } from "react";
import Mensaje from "../componets/Alertas/Mensaje";
import axios from "axios";

export const Register = () => {
  const [mensaje, setMensaje] = useState({});
  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    telefono: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = `${import.meta.env.VITE_BACKEND_URL}/registro`;
      const respuesta = await axios.post(url, form);
      setMensaje({ respuesta: respuesta.data.msg, tipo: true });
      setForm({});
    } catch (error) {
      setMensaje({ respuesta: error.response.data.msg, tipo: false });
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      <div className="flex flex-col md:flex-row w-full h-screen bg-white shadow-md">
        {/* Sección Izquierda - Imagen */}
        <div className="hidden md:flex w-1/2 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-green-600/70 to-blue-600/70 backdrop-blur-sm"></div>
          <div
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: "url('/register.jpeg')" }}
          ></div>
          <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-8">
            <h2 className="text-3xl font-bold mb-6 text-white text-center">
              Join Health Monitoring System
            </h2>
            <p className="text-center text-white text-lg">
              Get real-time health insights and AI-powered recommendations.
            </p>
          </div>
        </div>

        {/* Formulario de Registro */}
        <div className="w-full md:w-1/2 flex justify-center items-center p-8 bg-white h-screen">
          <div className="w-full max-w-md">
            {Object.keys(mensaje).length > 0 && (
              <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>
            )}

            <div className="text-center mb-6">
              <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600">
                SALUDIFY
              </h1>
              <p className="text-gray-600 mt-2 text-sm">
                Create your account for better health tracking
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {[
                { label: "Nombre", name: "nombre", type: "text" },
                { label: "Apellido", name: "apellido", type: "text" },
                { label: "Dirección", name: "direccion", type: "text" },
                { label: "Teléfono", name: "telefono", type: "tel" },
                { label: "Email", name: "email", type: "email" },
                { label: "Password", name: "password", type: "password" },
              ].map((field) => (
                <div key={field.name}>
                  <label className="block text-sm font-medium text-gray-700">
                    {field.label}
                  </label>
                  <input
                    name={field.name}
                    type={field.type}
                    value={form[field.name] || ""}
                    onChange={handleChange}
                    placeholder={`Enter your ${field.label.toLowerCase()}`}
                    className="block w-full rounded-md border border-teal-300 focus:border-teal-600 focus:outline-none focus:ring-1 focus:ring-teal-600 py-2 px-3 text-gray-500"
                    required
                  />
                </div>
              ))}

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-lg hover:from-green-600 hover:to-blue-700 transition-all duration-200 shadow-md"
              >
                Register Now
              </button>
            </form>

            <div className="mt-3 text-sm text-center">
              <p>Already have an account?</p>
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
