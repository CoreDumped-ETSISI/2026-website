import { Container, Modal, UnstyledButton } from "@mantine/core";
import { useState } from "react";
import { Link } from "react-router-dom";
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
        index: msg("El grupo"),
        title: msg("Quiénes somos"),
        text: msg("Somos CoreDumped, un grupo de estudiantes de la ETSISI apasionados por la tecnología. Aprendemos juntos, compartimos lo que sabemos y construimos cosas por el gusto de hacerlo."),
        items: [
            { titulo: msg("Estudiantes"), texto: msg("De todos los cursos y grados de la escuela.") },
            { titulo: msg("Comunidad"), texto: msg("Gente con ganas de aprender y de enseñar.") },
            { titulo: msg("Abiertos"), texto: msg("No hace falta experiencia previa para unirse.") },
        ],
        from: "right",
        images: [bajoLluvia, codeboost, todosSala, cartelDimension, tallerC, tallerPython],
    },
    {
        index: msg("Actividades"),
        title: msg("Qué hacemos"),
        text: msg("Organizamos CTFs, proyectos de hardware, diseño 3D y mucho más. Si te interesa algo, seguramente alguien del grupo ya está trasteando con ello."),
        items: [
            { titulo: msg("Ciberseguridad"), texto: msg("CTFs y máquinas de Hack The Box con Cibercore.") },
            { titulo: msg("Talleres"), texto: msg("C, Python y más, impartidos por miembros.") },
            { titulo: msg("Diseño 3D"), texto: msg("Modelamos e imprimimos piezas reales.") },
            { titulo: msg("Eventos"), texto: msg("Charlas, competiciones y quedadas.") },
        ],
        cta: { to: "/departamentos", label: msg("Ver departamentos") },
        from: "left",
        images: [cartelDimension, tallerC, tallerPython, bajoLluvia, codeboost],
    },
    {
        index: msg("Únete"),
        title: msg("Ven a conocernos"),
        text: msg("Nos reunimos de forma regular. Pásate, conoce al grupo y colabora con nosotros en lo que más te guste."),
        items: [
            { titulo: msg("Dónde"), texto: "ETSISI · Campus Sur UPM" },
            { titulo: msg("Cuándo"), texto: msg("Horario por confirmar") }, // TODO
            { titulo: msg("Cómo"), texto: msg("Escríbenos o pásate directamente.") },
        ],
        cta: { to: "/contacto", label: msg("Contacta con nosotros") },
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

function Seccion({ numero, index, title, text, items, cta, images, from, reverse }) {
    const t = useT();
    return (
        <section className={`${styles.section} ${reverse ? styles.reverse : ""}`}>
            <Reveal from={from} style={{ width: "100%" }}>
                <div className={styles.sectionInner}>
                    <div className={`feature-info ${styles.text}`}>
                        <span className="eyebrow">
                            {String(numero).padStart(2, "0")} — {t(index)}
                        </span>
                        <h2 className="feature-title">{t(title)}</h2>
                        <p className="lead">{t(text)}</p>
                        <ul className="detail-list">
                            {items.map(({ titulo, texto }) => (
                                <li key={titulo}>
                                    <strong>{t(titulo)}</strong>
                                    <span>{t(texto)}</span>
                                </li>
                            ))}
                        </ul>
                        {cta && (
                            <Link className="arrow-link" to={cta.to}>
                                {t(cta.label)} <span aria-hidden="true">→</span>
                            </Link>
                        )}
                    </div>
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
                <Seccion key={s.title} {...s} numero={i + 1} reverse={i % 2 === 1} />
            ))}
        </Container>
    );
}

export default Conocenos;