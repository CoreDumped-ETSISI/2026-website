import {Link, Outlet} from "react-router-dom";

export default function Navbar() {
    return (
        <>
            <nav>
                <Link to="/">Inicio</Link>
                <Link to="/conocenos">Conocenos</Link>
                <Link to="/tienda">Tienda</Link>
                <Link to="/tablon">Tablon</Link>
                <Link to="/departamentos">Departamentos</Link>
                <Link to="/colaboradores">Colaboradores</Link>
                <Link to="/contacto">Contacto</Link>
            </nav>
        </>
    );
}