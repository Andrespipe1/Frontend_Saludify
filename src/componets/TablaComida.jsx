// src/components/TablaComida.js
import { useContext } from 'react';
import { MdEdit, MdDeleteForever } from 'react-icons/md';
import ComidaContext from '../context/ComidaProvider';

const TablaComida = ({ comidas }) => {
  const { handleModal, eliminarComida } = useContext(ComidaContext);

  return (
    <table className="w-full mt-5 table-auto shadow-lg bg-white">
      <thead className="bg-gray-800 text-slate-400">
        <tr>
          <th className="p-2">Fecha</th>
          <th className="p-2">Descripción</th>
          <th className="p-2">Calorías</th>
          <th className="p-2">Tipo de Comida</th>
          <th className="p-2">Cantidad</th>
          <th className="p-2">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {comidas.map((comida) => (
          <tr className="border-b hover:bg-gray-300 text-center" key={comida._id}>
            <td>{new Date(comida.fecha).toLocaleDateString()}</td>
            <td>{comida.descripcion}</td>
            <td>{comida.calorias}</td>
            <td>{comida.tipoComida}</td>
            <td>{comida.cantidad}</td>
            <td>
              <MdEdit
                className="text-slate-800 cursor-pointer inline-block mr-2"
                onClick={() => handleModal(comida)}
              />
              <MdDeleteForever
                className="text-red-900 cursor-pointer inline-block"
                onClick={() => eliminarComida(comida._id)}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TablaComida;
