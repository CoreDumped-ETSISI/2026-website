import { Link } from "react-router-dom";

function Disegno() {
    return (
        <div id="disegno">
            <h1>Diseño</h1>
            <div>
                <p>Somos la seccion de diseño de Core Dumped y hacemos diseños 3D de lo que quieras Echa un vistazo a
                    nuestros articulos disponibles </p>
                <Link to="/tienda">
                    Acercate a la tienda
                </Link>
            </div>
        </div >
    )
}

export default Disegno;
