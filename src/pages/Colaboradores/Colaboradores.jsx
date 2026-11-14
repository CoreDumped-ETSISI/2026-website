import "./Colaboradores.css";
import ColaboradoresList from "../Secciones/Colaboradores/Colaboradores";
import Colabora from "../Secciones/ColaboraConNosotros/Colabora";

function Colaboradores() {
    return (
        <div id="colaboradores-page">
            <ColaboradoresList />
            <Colabora />
        </div>
    )
}

export default Colaboradores;