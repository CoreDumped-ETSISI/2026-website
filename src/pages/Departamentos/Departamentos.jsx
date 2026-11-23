import { Container } from "@mantine/core";
import { T } from "../../i18n/lang";
import TerminalTypingTitle from "../../components/Animaciones/TerminalTypingTitle";
import "./departamentos.css"
import Cibercore from "./Secciones/Ciber/Cibercore";
import Disegno from "./Secciones/Impresion3d/Disegno";

function Departamentos() {
    return (
        <div id="departamentos-page">
            <Container size="lg" py="xl" pb={120}>
                <TerminalTypingTitle><T>Departamentos</T></TerminalTypingTitle>
                <Cibercore />
                <Disegno />
            </Container>
        </div>
    )
}
export default Departamentos;
