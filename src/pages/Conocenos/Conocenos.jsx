import { Container, Title, Text, SimpleGrid, Image, Stack } from "@mantine/core";
import Reveal from "../../components/Animaciones/Reveal";
import { T } from "../../i18n/lang";
import "../../styles/Conocenos/Conocenos.css"

// Sustituye por tus imágenes reales: import img1 from "../../../assets/img/...";
const sections = [
    {
        from: "right",
        title: "Quiénes somos",
        text: "Somos CoreDumped, un grupo de estudiantes apasionados por la tecnología.",
        images: ["/img/quienes-1.jpg", "/img/quienes-2.jpg", "/img/quienes-3.jpg"],
    },
    {
        from: "left",
        title: "Qué hacemos",
        text: "Organizamos CTFs, proyectos de hardware, diseño 3D y mucho más.",
        images: ["/img/hacemos-1.jpg", "/img/hacemos-2.jpg", "/img/hacemos-3.jpg"],
    },
    {
        from: "bottom",
        title: "Ven a conocernos",
        text: "Nos reunimos de forma regular. Pásate y colabora con nosotros.",
        images: ["/img/ven-1.jpg", "/img/ven-2.jpg", "/img/ven-3.jpg"],
    },
];

function Conocenos() {
    return (
        <div className="conocenos-page">
            <Container size="lg" pb={120}>
                {sections.map((s) => (
                    <section
                        key={s.title}
                        style={{
                            minHeight: "calc(100dvh - 70px)",
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        <Reveal from={s.from} style={{ width: "100%" }}>
                            <Stack gap="lg" py="xl">
                                <Title order={2}>
                                    <T>{s.title}</T>
                                </Title>
                                <Text size="lg" maw={700}>
                                    <T>{s.text}</T>
                                </Text>
                                <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="md">
                                    {s.images.map((src, i) => (
                                        <Image
                                            key={src}
                                            src={src}
                                            alt=""
                                            radius="md"
                                            h={220}
                                            fit="cover"
                                        />
                                    ))}
                                </SimpleGrid>
                            </Stack>
                        </Reveal>
                    </section>
                ))}
            </Container>
        </div>
    );
}

export default Conocenos;