import { Container } from "@mantine/core";
import "./Colaboradores.css";
import ColaboradoresList from "../Departamentos/Secciones/Colaboradores/Colaboradores";
import Colabora from "../Departamentos/Secciones/ColaboraConNosotros/Colabora";
import { T } from "../../i18n/lang";
import TerminalTypingTitle from "../../components/Animaciones/TerminalTypingTitle";

function Colaboradores() {
    return (
        <div id="colaboradores-page">
            <Container size="lg" py="xl" pb={120}>
                <TerminalTypingTitle><T>Colaboradores</T></TerminalTypingTitle>

                <p className="lead intro">
                    <T>
                        Empresas y organizaciones que apoyan a CoreDumped con material,
                        formación y oportunidades para nuestros miembros.
                    </T>
                </p>

                <ColaboradoresList />

                <span className="eyebrow block">→ <T>Únete a ellos</T></span>
                <Colabora />
            </Container>
        </div>
    );
}

export default Colaboradores;
