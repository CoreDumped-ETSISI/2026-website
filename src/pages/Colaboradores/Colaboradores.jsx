import { Container, Stack, Title } from "@mantine/core";
import "./Colaboradores.css";
import ColaboradoresList from "../Departamentos/Secciones/Colaboradores/Colaboradores";
import Colabora from "../Departamentos/Secciones/ColaboraConNosotros/Colabora";
import { T } from "../../i18n/lang";

function Colaboradores() {
    return (
        <div id="colaboradores-page">
            <Container size="lg" py="xl" pb={120}>
                <Stack gap="xl">
                    <Title order={1}>
                        <T>Colaboradores</T>
                    </Title>
                    <ColaboradoresList />
                    <Colabora />
                </Stack>
            </Container>
        </div>
    );
}

export default Colaboradores;