import { Container, Modal, Stack, Text, Title, UnstyledButton } from "@mantine/core";
import { useState } from "react";
import Reveal from "../../components/Animaciones/Reveal";
import TerminalTypingTitle from "../../components/Animaciones/TerminalTypingTitle";
import { msg, T, useT } from "../../i18n/lang";
import styles from "./Conocenos.module.css";

import bajoLluvia from "../../../assets/verde/bajolalluvia.webp";
import codeboost from "../../../assets/verde/codeboost.webp";
import todosSala from "../../../assets/verde/todos_sala.webp";
import cartelDimension from "../../../assets/morado/carteldimension26.webp";
import tallerC from "../../../assets/morado/tallerC.webp";
import tallerPython from "../../../assets/morado/tallerpython.webp";

const SECCIONES = [
    {
        title: msg("Quiénes somos"),
        text: msg("Somos CoreDumped, un grupo de estudiantes apasionados por la tecnología."),
        from: "right",
        images: [bajoLluvia, codeboost, todosSala, cartelDimension, tallerC, tallerPython],
    },
    {
        title: msg("Qué hacemos"),
        text: msg("Organizamos CTFs, proyectos de hardware, diseño 3D y mucho más."),
        from: "left",
        images: [cartelDimension, tallerC, tallerPython, bajoLluvia, codeboost],
    },
    {
        title: msg("Ven a conocernos"),
        text: msg("Nos reunimos de forma regular. Pásate y colabora con nosotros."),
        from: "bottom",
        images: [todosSala, codeboost, bajoLluvia, tallerC],
    },
];

function Galeria({ images }) {
    const t = useT();
    const [selected, setSelected] = useState(null);
    const shown = images.slice(0, 6);
    if (!shown.length) return null;
    const count = Math.min(6, Math.max(4, shown.length)); // elige el diseño 4, 5 o 6

    return (
        <>
            <div className={styles.collage} data-count={count}>
                {shown.map((src) => (
                    <UnstyledButton
                        key={src}
                        className={styles.item}
                        onClick={() => setSelected(src)}
                        aria-label={t("Ampliar imagen")}
                    >
                        <img src={src} alt="" loading="lazy" />
                    </UnstyledButton>
                ))}
            </div>

            {/* Modal de Mantine con el aspecto del Dialog de la tienda:
                fondo oscuro, sin caja blanca ni cabecera, solo la imagen. */}
            <Modal
                opened={selected !== null}
                onClose={() => setSelected(null)}
                size="auto"
                centered
                withCloseButton={false}
                padding={0}
                radius="md"
                overlayProps={{ color: "#000", backgroundOpacity: 0.7, blur: 2 }}
                transitionProps={{ transition: "pop", duration: 200 }}
                styles={{
                    content: { background: "transparent", boxShadow: "none", overflow: "visible" },
                    body: { padding: 0, display: "flex" },
                }}
            >
                {selected && (
                    <img
                        src={selected}
                        alt=""
                        onClick={() => setSelected(null)}
                        style={{
                            display: "block",
                            maxWidth: "85dvw",
                            maxHeight: "85dvh",
                            borderRadius: 8,
                            boxShadow: "0 20px 60px rgba(0, 0, 0, 0.5)",
                            cursor: "zoom-out",
                        }}
                    />
                )}
            </Modal>
        </>
    );
}

function Seccion({ title, text, images, from, reverse }) {
    const t = useT();
    return (
        <section className={`${styles.section} ${reverse ? styles.reverse : ""}`}>
            <Reveal from={from} style={{ width: "100%" }}>
                <div className={styles.sectionInner}>
                    <Stack gap="md" className={styles.text}>
                        <Title order={2}>{t(title)}</Title>
                        <Text size="lg">{t(text)}</Text>
                    </Stack>
                    <Galeria images={images} />
                </div>
            </Reveal>
        </section>
    );
}

function Conocenos() {
    const t = useT();
    return (
        <Container size="xl" py="xl" pb={120} className={styles.page}>
            <TerminalTypingTitle><T>Conócenos</T></TerminalTypingTitle>
            {SECCIONES.map((s, i) => (
                <Seccion key={s.title} {...s} reverse={i % 2 === 1} />
            ))}
        </Container>
    );
}

export default Conocenos;