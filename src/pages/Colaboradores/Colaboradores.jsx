import { Container, Stack } from "@mantine/core";
import "./Colaboradores.css";
import ColaboradoresList from "../Departamentos/Secciones/Colaboradores/Colaboradores";
import Colabora from "../Departamentos/Secciones/ColaboraConNosotros/Colabora";
import { T } from "../../i18n/lang";
import TerminalTypingTitle from "../../components/Animaciones/TerminalTypingTitle"

function Colaboradores() {
    return (
        <div id="colaboradores-page">
            <Container size="lg" py="xl" pb={120}>
                <TerminalTypingTitle><T>Colaboradores</T></TerminalTypingTitle>
                <Stack gap="xl">
                    <ColaboradoresList />
                    <Colabora />
                </Stack>
            </Container>
        </div >
    );
}

export default Colaboradores;