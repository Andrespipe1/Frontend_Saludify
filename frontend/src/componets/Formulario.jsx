import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const Formulario = ({ paciente, registro }) => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    peso: paciente?.peso ?? "",
    estatura: paciente?.estatura ?? "",
    nivelActividadFisica: paciente?.nivelActividadFisica ?? "",
    horasDeSueño: paciente?.horasDeSueño ?? "",
    nivelEstres: paciente?.nivelEstres ?? "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validaciones
    if (form.peso <= 0 || isNaN(form.peso)) {
      alert("El peso debe ser un número positivo.");
      return;
    }
    if (form.estatura <= 0 || isNaN(form.estatura)) {
      alert("La estatura debe ser un número positivo.");
      return;
    }
    if (!["Bajo", "Moderado", "Alto"].includes(form.nivelActividadFisica)) {
      alert("El nivel de actividad física debe ser Bajo, Moderado o Alto.");
      return;
    }
    if (form.horasDeSueño < 0 || isNaN(form.horasDeSueño)) {
      alert("Las horas de sueño deben ser un número positivo.");
      return;
    }
    if (!["Bajo", "Moderado", "Alto"].includes(form.nivelEstres)) {
      alert("El nivel de estrés debe ser Bajo, Moderado o Alto.");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("No se encontró un token en el almacenamiento local.");
        return;
      }

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      // Verificar si paciente tiene un _id válido
      const pacienteId = paciente?._id;

      if (!pacienteId) {
        alert("El paciente no tiene un ID válido.");
        return;
      }

      if (registro?.id) {
        // Actualizar un registro existente
        const url = `http://localhost:3000/api/registros/registro/${registro.id}`;
        await axios.put(url, form, { headers });
        console.log("Registro actualizado con éxito.");
      } else {
        // Crear un nuevo registro para el paciente
        const url = `http://localhost:3000/api/registros/paciente/${pacienteId}`;
        await axios.post(url, form, { headers });
        console.log("Registro creado con éxito.");
      }

      navigate("/dashboard/listar");
    } catch (error) {
      if (error.response && error.response.data) {
        console.error("Error del servidor:", error.response.data.msg);
      } else {
        console.error("Error inesperado:", error.message);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="peso" className="text-gray-700 uppercase font-bold text-sm">
          Peso (kg):
        </label>
        <input
          id="peso"
          type="number"
          step="0.1"
          className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5"
          placeholder="Peso en kg"
          name="peso"
          onChange={handleChange}
          value={form.peso}
        />
      </div>
      <div>
        <label htmlFor="estatura" className="text-gray-700 uppercase font-bold text-sm">
          Estatura (m):
        </label>
        <input
          id="estatura"
          type="number"
          step="0.01"
          className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5"
          placeholder="Estatura en metros"
          name="estatura"
          onChange={handleChange}
          value={form.estatura}
        />
      </div>
      <div>
        <label htmlFor="nivelActividadFisica" className="text-gray-700 uppercase font-bold text-sm">
          Nivel de Actividad Física:
        </label>
        <select
          id="nivelActividadFisica"
          className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5"
          name="nivelActividadFisica"
          onChange={handleChange}
          value={form.nivelActividadFisica}
        >
          <option value="">Seleccione una opción</option>
          <option value="Bajo">Bajo</option>
          <option value="Moderado">Moderado</option>
          <option value="Alto">Alto</option>
        </select>
      </div>
      <div>
        <label htmlFor="horasDeSueño" className="text-gray-700 uppercase font-bold text-sm">
          Horas de Sueño:
        </label>
        <input
          id="horasDeSueño"
          type="number"
          className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5"
          placeholder="Horas de sueño"
          name="horasDeSueño"
          onChange={handleChange}
          value={form.horasDeSueño}
        />
      </div>
      <div>
        <label htmlFor="nivelEstres" className="text-gray-700 uppercase font-bold text-sm">
          Nivel de Estrés:
        </label>
        <select
          id="nivelEstres"
          className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5"
          name="nivelEstres"
          onChange={handleChange}
          value={form.nivelEstres}
        >
          <option value="">Seleccione una opción</option>
          <option value="Bajo">Bajo</option>
          <option value="Moderado">Moderado</option>
          <option value="Alto">Alto</option>
        </select>
      </div>
      <button type="submit" className="bg-blue-500 text-white p-2 rounded-md">
        {registro ? "Actualizar Registro" : "Registrar Datos"}
      </button>
    </form>
  );
};
