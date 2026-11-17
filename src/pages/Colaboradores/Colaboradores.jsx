import "./Colaboradores.css";
import ColaboradoresList from "../Departamentos/Secciones/Colaboradores/Colaboradores";
import Colabora from "../Departamentos/Secciones/ColaboraConNosotros/Colabora";

function Colaboradores() {
    return (
        <div id="colaboradores-page">
            <ColaboradoresList />
            <Colabora />
        </div>
    )
}

export default Colaboradores;