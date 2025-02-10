import { useContext } from "react";
import AuthContext from "../../context/AuthProvider";

export const CardPerfilPaciente = () => {
  const { auth } = useContext(AuthContext);
  return (
    <div
      className="bg-white border border-slate-200 h-auto p-4 
                        flex flex-col items-center justify-between shadow-xl rounded-lg"
    >
      <div>
        <img
          src="https://cdn-icons-png.flaticon.com/512/4715/4715329.png"
          alt="img-client"
          className="m-auto "
          width={120}
          height={120}
        />
      </div>

      <div className="self-start">
        <b>Peso:</b>
        <p className="inline-block ml-3">{auth.peso}</p>
      </div>
      <div className="self-start">
        <b>Estatura:</b>
        <p className="inline-block ml-3">{auth.estatura}</p>
      </div>
      <div className="self-start">
        <b>Nivel Actividad Fisica:</b>
        <p className="inline-block ml-3">{auth.nivelActividadFisica}</p>
      </div>
      <div className="self-start">
        <b>Horas de Sueño:</b>
        <p className="inline-block ml-3">{auth.horasDeSueño}</p>
      </div>
      <div className="self-start">
        <b>Nivel Estres:</b>
        <p className="inline-block ml-3">{auth.nivelEstres}</p>
      </div>
    </div>
  );
};
