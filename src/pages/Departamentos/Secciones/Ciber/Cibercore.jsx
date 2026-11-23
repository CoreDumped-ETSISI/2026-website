import { T, msg, useT } from "../../../../i18n/lang";
import useStepLoop from "../../useStepLoop";

const actividades = [
    { titulo: "CTFs", texto: msg("Competimos en equipo en retos de seguridad.") },
    { titulo: "Hack The Box", texto: msg("Practicamos con máquinas cada semana.") },
    { titulo: "Writeups", texto: msg("Documentamos y compartimos cómo las resolvemos.") },
];

const log = [
    { tipo: "cmd", texto: "nmap -sV 10.10.11.42" },
    { tipo: "out", texto: "22/tcp ssh · 80/tcp http" },
    { tipo: "ok", texto: "user.txt" },
    { tipo: "ok", texto: "root.txt" },
    { tipo: "info", texto: msg("writeup publicado") },
];

const prefijo = { cmd: "$", out: " ", ok: "✓", info: "→" };

function Cibercore() {
    const t = useT();
    const visibles = useStepLoop(log.length, 700);

    return (
        <section id="cibercore" className="depto" aria-labelledby="cibercore-title">
            <div className="depto__content">
                <span className="depto__index">01 — <T>Ciberseguridad</T></span>
                <h1 id="cibercore-title">Cibercore</h1>
                <p>
                    <T>
                        La sección de ciberseguridad de CoreDumped. Aprendemos rompiendo
                        cosas, de forma legal, y lo contamos.
                    </T>
                </p>
                <ul className="depto__list">
                    {actividades.map(({ titulo, texto }) => (
                        <li key={titulo}>
                            <strong>{titulo}</strong>
                            <span>{t(texto)}</span>
                        </li>
                    ))}
                </ul>
                <a
                    className="depto__cta"
                    href="https://upm-1.gitbook.io/cybercore-writeups"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <T>Ver nuestros writeups</T> <span aria-hidden="true">→</span>
                </a>
            </div>

            <div className="depto__visual depto__visual--terminal" aria-hidden="true">
                <div className="depto__visual-bar">
                    <i /><i /><i />
                    <span>cybercore@lab</span>
                </div>
                <ol className="terminal-log">
                    {log.slice(0, visibles).map(({ tipo, texto }, i) => (
                        <li key={i} className={`terminal-log__line is-${tipo}`}>
                            <span>{prefijo[tipo]}</span>
                            {t(texto)}
                        </li>
                    ))}
                    <li className="terminal-log__line is-cmd">
                        <span>$</span>
                        <b className="terminal-log__cursor" />
                    </li>
                </ol>
            </div>
        </section>
    );
}

export default Cibercore;
