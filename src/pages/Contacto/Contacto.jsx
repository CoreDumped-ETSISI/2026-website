import { Container } from "@mantine/core";
import { useState } from "react";
import "./Contacto.css";
import { msg, T, useT } from "../../i18n/lang";
import TerminalTypingTitle from "../../components/Animaciones/TerminalTypingTitle";
import UseSvg from "../../common/Svg/UseSvg";
import Window from "../../components/ui/Window";

const SPRITE = "/Svg/contacto.Svg";

const contacts = [
    {
        id: "correo",
        icon: "gmail",
        label: msg("Correo"),
        value: "coredumped@etsisi.upm.es",
        href: "mailto:coredumped@etsisi.upm.es",
        hint: msg("Empresas, patrocinios y colaboraciones"),
        copy: true,
    },
    {
        id: "instagram",
        icon: "instagram",
        label: "Instagram",
        value: "@coredumpedupm",
        href: "https://www.instagram.com/coredumpedupm/",
        hint: msg("Eventos, talleres y novedades"),
    },
    {
        id: "github",
        icon: "github",
        label: "GitHub",
        value: "CoreDumped-ETSISI",
        href: "https://github.com/CoreDumped-ETSISI",
        hint: msg("Nuestro código y proyectos"),
    },
    {
        id: "linkedin",
        icon: "linkedin",
        label: "LinkedIn",
        value: "CoreDumped",
        href: "https://www.linkedin.com/company/coredumped/",
        hint: msg("Perfil para empresas y profesionales"),
    },
    {
        id: "telegram",
        icon: "telegram",
        label: "Telegram",
        value: "CoreDumpedUPM",
        href: "https://t.me/CoreDumpedUPM/",
        hint: msg("Canal para compartir información sobre las actividades"),
    },
];

// TODO: el horario 
const ubicacion = [
    { tipo: "cmd", texto: "cat ubicacion.txt" },
    { tipo: "out", texto: "ETSISI · Campus Sur UPM" },
    { tipo: "out", texto: msg("Clase: 15043 (bajando las escaleras desde la Rotonda a mano izquierda)") },
    { tipo: "out", texto: msg("Horario: por confirmar") },
];

function CopyButton({ value }) {
    const t = useT();
    const [copied, setCopied] = useState(false);

    const copy = async () => {
        try {
            await navigator.clipboard.writeText(value);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            // Sin permiso de portapapeles: el enlace sigue funcionando
        }
    };

    return (
        <button type="button" className="pill-button" onClick={copy}>
            {copied ? t("Copiado ✓") : t("Copiar")}
        </button>
    );
}

function Contacto() {
    const t = useT();

    return (
        <section id="contacto-page">
            <Container size="lg" py="xl" pb={120}>
                <TerminalTypingTitle><T>Contacto</T></TerminalTypingTitle>

                <p className="lead intro">
                    <T>
                        ¿Quieres unirte, proponer una colaboración o simplemente saludar?
                        Escríbenos por donde te resulte más cómodo.
                    </T>
                </p>

                <span className="eyebrow block">01 — <T>Escríbenos</T></span>
                <ul className="card-grid">
                    {contacts.map(({ id, icon, label, value, href, hint, copy }) => {
                        const external = href.startsWith("http");
                        return (
                            <li key={id} className="info-card">
                                <span className="info-card-icon">
                                    <UseSvg icon={icon} pathSpray={SPRITE} />
                                </span>

                                <div className="info-card-body">
                                    <span className="info-card-label">{t(label)}</span>
                                    <a
                                        className="info-card-link"
                                        href={href}
                                        {...(external && { target: "_blank", rel: "noopener noreferrer" })}
                                    >
                                        {value}
                                    </a>
                                    <span className="info-card-hint">{t(hint)}</span>
                                </div>

                                {copy
                                    ? <CopyButton value={value} />
                                    : <span className="info-card-arrow" aria-hidden="true">↗</span>}
                            </li>
                        );
                    })}
                </ul>

                <span className="eyebrow block">02 — <T>Ven a vernos</T></span>
                <Window title="coredumped@etsisi" className="compact">
                    <ul className="terminal-log">
                        {ubicacion.map(({ tipo, texto }) => (
                            <li key={texto} className={`is-${tipo}`}>
                                <span aria-hidden="true">{tipo === "cmd" ? "$" : " "}</span>
                                {t(texto)}
                            </li>
                        ))}
                    </ul>
                </Window>
            </Container>
        </section>
    );
}

export default Contacto;
