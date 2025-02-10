import { useContext, useEffect, useState } from "react";
import { MdDeleteForever, MdNoteAdd, MdInfo } from "react-icons/md";
import axios from "axios";
import Mensaje from "./Alertas/Mensaje";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthProvider";

const Tabla = () => {
  const { auth } = useContext(AuthContext);

  const navigate = useNavigate();

  const [pacientes, setPacientes] = useState([]);

  const listarPacientes = async () => {
    try {
      const token = localStorage.getItem("token");
      const url = `http://localhost:3000/api/registros/${id}`;
      const options = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const respuesta = await axios.get(url, options);
      setPacientes(respuesta.data, ...pacientes);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const confirmar = confirm(
        "Vas a registrar la salida de un paciente, ¿Estás seguro de realizar esta acción?"
      );

      if (confirmar) {
        const token = localStorage.getItem("token");
        const url = `http://localhost:3000/api/registros/${id}`;
        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        };
        const data = {
          salida: new Date().toString(),
        };
        await axios.delete(url, { headers, data });
        listarPacientes();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    listarPacientes();
  }, []);

  return (
    <>
      {pacientes.length == 0 ? (
        <Mensaje tipo={"active"}>{"No existen registros"}</Mensaje>
      ) : (
        <table className="w-full mt-5 table-auto shadow-lg  bg-white">
          <thead className="bg-gray-800 text-slate-400">
            <tr>
              <th className="p-2">N°</th>
              <th className="p-2">peso</th>
              <th className="p-2">estatura</th>
              <th className="p-2">nivelActividadFisica</th>
              <th className="p-2">horasDeSueño</th>
              <th className="p-2">nivelEstres</th>
            </tr>
          </thead>
          <tbody>
            {pacientes.map((paciente, index) => (
              <tr
                className="border-b hover:bg-gray-300 text-center"
                key={paciente._id}
              >
                <td>{index + 1}</td>
                <td>{paciente.peso}</td>
                <td>{paciente.estatura}</td>
                <td>{paciente.nivelActividadFisica}</td>
                <td>{paciente.horasDeSueño}</td>
                <td>{paciente.nivelEstres}</td>
                <td>
                  <span className="bg-blue-100 text-green-500 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
                    {paciente.estado && "activo"}
                  </span>
                </td>
                <td className="py-2 text-center">
                  <MdNoteAdd
                    className="h-7 w-7 text-slate-800 cursor-pointer inline-block mr-2"
                    onClick={() =>
                      navigate(`/dashboard/visualizar/${paciente._id}`)
                    }
                  />

                  {auth.rol === "pacientes" && (
                    <>
                      <MdInfo
                        className="h-7 w-7 text-slate-800 cursor-pointer inline-block mr-2"
                        onClick={() =>
                          navigate(`/dashboard/actualizar/${paciente._id}`)
                        }
                      />

                      <MdDeleteForever
                        className="h-7 w-7 text-red-900 cursor-pointer inline-block"
                        onClick={() => {
                          handleDelete(paciente._id);
                        }}
                      />
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default Tabla;
