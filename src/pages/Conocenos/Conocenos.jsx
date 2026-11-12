import { Container, Title, Text, SimpleGrid, Image, Stack } from "@mantine/core";
import Reveal from "../../components/Animaciones/Reveal";
import { T } from "../../i18n/lang";
import "../../styles/Conocenos/Conocenos.css";

import bajoLluvia from "../../../assets/verde/bajolalluvia.webp";
import codeboost from "../../../assets/verde/codeboost.webp";
import todosSala from "../../../assets/verde/todos_sala.webp";
import cartelDimension from "../../../assets/morado/carteldimension26.webp";
import tallerC from "../../../assets/morado/tallerC.webp";
import tallerPython from "../../../assets/morado/tallerpython.webp";
// import ven1 from "../../../assets/...";  // imágenes de la sección 3

/* Estructura común: ocupa una pantalla, centra y aplica la animación */
function Seccion({ from, children }) {
    return (
        <section
            style={{
                minHeight: "calc(100dvh - 70px)",
                display: "flex",
                alignItems: "center",
            }}
        >
            <Reveal from={from} style={{ width: "100%" }}>
                <Stack gap="lg" py="xl">
                    {children}
                </Stack>
            </Reveal>
        </section>
    );
}

function Imagenes({ images }) {
    return (
        <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="md">
            {images.map((src) => (
                <Image key={src} src={src} alt="" radius="md" h={220} fit="cover" />
            ))}
        </SimpleGrid>
    );
}

function QuienesSomos() {
    return (
        <Seccion from="right">
            <Title order={2}>
                <T>Quiénes somos</T>
            </Title>
            <Text size="lg" maw={700}>
                <T>Somos CoreDumped, un grupo de estudiantes apasionados por la tecnología.</T>
            </Text>
            <Imagenes images={[bajoLluvia, codeboost, todosSala]} />
        </Seccion>
    );
}

function QueHacemos() {
    return (
        <Seccion from="left">
            <Title order={2}>
                <T>Qué hacemos</T>
            </Title>
            <Text size="lg" maw={700}>
                <T>Organizamos CTFs, proyectos de hardware, diseño 3D y mucho más.</T>
            </Text>
            <Imagenes images={[cartelDimension, tallerC, tallerPython]} />
        </Seccion>
    );
}

function VenAConocernos() {
    return (
        <Seccion from="bottom">
            <Title order={2}>
                <T>Ven a conocernos</T>
            </Title>
            <Text size="lg" maw={700}>
                <T>Nos reunimos de forma regular. Pásate y colabora con nosotros.</T>
            </Text>
            <Imagenes images={[/* ven1, ven2, ven3 */]} />
        </Seccion>
    );
}

function Conocenos() {
    return (
        <div className="conocenos-page">
            <Container size="lg" pb={120}>
                <QuienesSomos />
                <QueHacemos />
                <VenAConocernos />
            </Container>
        </div>
    );
}

export default Conocenos;