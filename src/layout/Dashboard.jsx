import { useContext } from 'react';
import { Link, Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthProvider';

const Dashboard = () => {
    const location = useLocation();
    const { auth } = useContext(AuthContext);
    const autenticado = localStorage.getItem("token");
    const urlActual = location.pathname;
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token"); // Elimina el token
        navigate("/login"); // Redirige al login
    }

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="w-1/5 bg-gray-900 text-white px-6 py-8 flex flex-col">
                <h2 className="text-3xl font-extrabold text-center mb-6 text-green-400">APP-DEMO</h2>

                <div className="flex flex-col items-center">
                    <img
                        src="/confirm.jpeg"
                        alt="User"
                        className="w-24 h-24 border-4 border-green-500 rounded-full"
                    />
                    <p className="mt-4 text-gray-300 text-center">
                        <span className="bg-green-500 w-3 h-3 inline-block rounded-full"></span> Bienvenido {auth.nombre || "de nuevo"}
                    </p>
                </div>

                <hr className="mt-6 border-gray-700" />

                <nav className="mt-6">
                    <ul className="space-y-2">
                        <li>
                            <Link
                                to="/dashboard"
                                className={`block px-4 py-2 rounded-md text-lg text-center ${urlActual === '/dashboard' ? 'bg-green-500 text-white' : 'text-gray-400 hover:bg-gray-700 hover:text-white'}`}
                            >
                                Perfil
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/dashboard/listar"
                                className={`block px-4 py-2 rounded-md text-lg text-center ${urlActual === '/dashboard/listar' ? 'bg-green-500 text-white' : 'text-gray-400 hover:bg-gray-700 hover:text-white'}`}
                            >
                                Listar
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/dashboard/crear"
                                className={`block px-4 py-2 rounded-md text-lg text-center ${urlActual === '/dashboard/crear' ? 'bg-green-500 text-white' : 'text-gray-400 hover:bg-gray-700 hover:text-white'}`}
                            >
                                Crear
                            </Link>
                        </li>
                    </ul>
                </nav>
            </aside>

            {/* Contenido Principal */}
            <main className="flex-1 flex flex-col">
                {/* Barra Superior */}
                <header className="bg-gray-800 text-white py-3 px-6 flex justify-between items-center shadow-md">
                    <span className="text-lg font-semibold">Usuario: {auth.nombre}</span>

                    <div className="flex items-center gap-4">
                        <img
                            src="/confirm.jpeg"
                            alt="Avatar"
                            className="w-12 h-12 border-2 border-green-500 rounded-full"
                        />
                        <button
                            onClick={handleLogout}
                            className="bg-red-600 px-4 py-2 rounded-lg hover:bg-red-800 transition-all"
                        >
                            Salir
                        </button>
                    </div>
                </header>

                {/* Contenido Dinámico */}
                <div className="flex-1 overflow-y-auto p-6">
                    {autenticado ? <Outlet /> : <Navigate to="/login" />}
                </div>

                {/* Footer */}
                <footer className="bg-gray-900 text-white py-3 text-center">
                    <p className="text-gray-400 text-sm">© Todos los derechos reservados</p>
                </footer>
            </main>
        </div>
    );
};

export default Dashboard;
