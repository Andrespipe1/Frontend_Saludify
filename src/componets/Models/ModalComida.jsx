// src/components/ModalComida.js
import { useContext, useEffect, useState } from 'react';
import ComidaContext from '../context/ComidaProvider';

const ModalComida = ({ pacienteId }) => {
  const { modal, handleModal, registrarComida, actualizarComida, comidaActual } = useContext(ComidaContext);
  const [form, setForm] = useState({
    descripcion: '',
    calorias: '',
    tipoComida: '',
    cantidad: '',
    pacienteId: pacienteId,
  });

  useEffect(() => {
    if (comidaActual) {
      setForm({
        ...comidaActual,
        pacienteId: pacienteId,
      });
    }
  }, [comidaActual, pacienteId]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (comidaActual) {
      actualizarComida(comidaActual._id, form);
    } else {
      registrarComida(form);
    }
    handleModal();
  };

  return (
    <div className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 ${modal ? 'block' : 'hidden'}`}>
      <div className="bg-white p-6 rounded-lg max-w-sm mx-auto mt-20">
        <h3 className="text-xl font-bold mb-4">{comidaActual ? 'Editar Comida' : 'Registrar Comida'}</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="descripcion" className="block">Descripción</label>
            <input
              type="text"
              name="descripcion"
              id="descripcion"
              value={form.descripcion}
              onChange={handleChange}
              className="w-full p-2 border"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="calorias" className="block">Calorías</label>
            <input
              type="number"
              name="calorias"
              id="calorias"
              value={form.calorias}
              onChange={handleChange}
              className="w-full p-2 border"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="tipoComida" className="block">Tipo de Comida</label>
            <input
              type="text"
              name="tipoComida"
              id="tipoComida"
              value={form.tipoComida}
              onChange={handleChange}
              className="w-full p-2 border"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="cantidad" className="block">Cantidad</label>
            <input
              type="text"
              name="cantidad"
              id="cantidad"
              value={form.cantidad}
              onChange={handleChange}
              className="w-full p-2 border"
            />
          </div>
          <div className="flex justify-end gap-4">
            <button type="button" onClick={() => handleModal()} className="bg-red-500 text-white p-2 rounded">Cancelar</button>
            <button type="submit" className="bg-green-500 text-white p-2 rounded">{comidaActual ? 'Actualizar' : 'Registrar'}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalComida;
