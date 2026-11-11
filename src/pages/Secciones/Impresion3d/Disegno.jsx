import {Link} from "react-router-dom";

function Disegno() {
    return (
        <>
            <h1>Diseño</h1>
            <div><p>Somos la seccion de diseño de Core Dumped y hacemos diseños 3d de lo quq quieras Echa un vistazo a
                nuestros articulos disponibles </p><Link to="/tienda">
                <button>Acercate a la tienda</button>
            </Link></div>
        </>
    )
}

export default Disegno;
