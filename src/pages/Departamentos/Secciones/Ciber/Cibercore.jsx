import useStepLoop from "../../useStepLoop";

const actividades = [
    { titulo: "CTFs", texto: "Competimos en equipo en retos de seguridad." },
    { titulo: "Hack The Box", texto: "Practicamos con máquinas cada semana." },
    { titulo: "Writeups", texto: "Documentamos y compartimos cómo las resolvemos." },
];

const log = [
    { tipo: "cmd", texto: "nmap -sV 10.10.11.42" },
    { tipo: "out", texto: "22/tcp ssh · 80/tcp http" },
    { tipo: "ok", texto: "user.txt" },
    { tipo: "ok", texto: "root.txt" },
    { tipo: "info", texto: "writeup publicado" },
];

const prefijo = { cmd: "$", out: " ", ok: "✓", info: "→" };

function Cibercore() {
    const visibles = useStepLoop(log.length, 700);

    return (
        <section id="cibercore" className="depto" aria-labelledby="cibercore-title">
            <div className="depto__content">
                <span className="depto__index">01 — Ciberseguridad</span>
                <h1 id="cibercore-title">Cibercore</h1>
                <p>
                    La sección de ciberseguridad de CoreDumped. Aprendemos rompiendo
                    cosas, de forma legal, y lo contamos.
                </p>
                <ul className="depto__list">
                    {actividades.map(({ titulo, texto }) => (
                        <li key={titulo}>
                            <strong>{titulo}</strong>
                            <span>{texto}</span>
                        </li>
                    ))}
                </ul>
                <a
                    className="depto__cta"
                    href="https://upm-1.gitbook.io/cybercore-writeups"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Ver nuestros writeups <span aria-hidden="true">→</span>
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
                            {texto}
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
