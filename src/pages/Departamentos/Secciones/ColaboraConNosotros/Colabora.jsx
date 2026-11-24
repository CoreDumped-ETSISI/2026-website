import { T } from "../../../../i18n/lang";
import Window from "../../../../components/ui/Window";

function Colabora() {
    return (
        <Window title="colabora.sh" className="compact" role="region" aria-labelledby="colabora-title">
            <div className="window-content">
                <h2 id="colabora-title">
                    <T>Colabora con nosotros</T>
                </h2>
                <p className="lead">
                    <T>¿Te gustaría apoyar nuestras actividades o colaborar con Core Dumped? Escríbenos y cuéntanos tu propuesta.</T>
                </p>
                <a className="arrow-link" href="mailto:coredumped.etsisi@gmail.com">
                    <T>Escríbenos</T> <span aria-hidden="true">→</span>
                </a>
            </div>
        </Window>
    );
}

export default Colabora;
