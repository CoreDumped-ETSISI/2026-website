import { Link } from "react-router-dom";
import { T, msg, useT } from "../../../../i18n/lang";
import Window from "../../../../components/ui/Window";
import useStepLoop from "../../useStepLoop";

const actividades = [
    { titulo: msg("Modelado"), texto: msg("Diseñamos piezas desde cero en 3D.") },
    { titulo: msg("Impresión"), texto: msg("Las fabricamos capa a capa.") },
    { titulo: msg("Tienda"), texto: msg("Lo que sale bien, lo puedes tener tú.") },
];

// Anchos de cada capa (de abajo a arriba): forma de jarrón
const capas = [56, 64, 70, 72, 70, 64, 56, 48, 44, 46, 52];

function Disegno() {
    const t = useT();
    const alto = 9;
    const base = 150;
    const impresas = useStepLoop(capas.length, 450);
    const ancho = capas[Math.min(impresas, capas.length - 1)];
    const terminado = impresas === capas.length;

    return (
        <section id="disegno" className="feature reverse" aria-labelledby="disegno-title">
            <div className="feature-info">
                <span className="eyebrow">02 — <T>Diseño e impresión 3D</T></span>
                <h1 id="disegno-title" className="feature-title"><T>Diseño que toma forma</T></h1>
                <p className="lead">
                    <T>
                        El equipo de diseño de CoreDumped. Convertimos ideas en objetos
                        reales que puedes tocar.
                    </T>
                </p>
                <ul className="detail-list">
                    {actividades.map(({ titulo, texto }) => (
                        <li key={titulo}>
                            <strong>{t(titulo)}</strong>
                            <span>{t(texto)}</span>
                        </li>
                    ))}
                </ul>
                <Link className="arrow-link" to="/tienda">
                    <T>Acércate a la tienda</T> <span aria-hidden="true">→</span>
                </Link>
            </div>

            <Window
                title={terminado ? t("pieza lista ✓") : `${t("capa")} ${impresas + 1}/${capas.length}`}
                className="media"
                aria-hidden="true"
            >
                <svg className="print" viewBox="0 0 200 180">
                    <line className="print-bed" x1="30" y1={base + 1} x2="170" y2={base + 1} />
                    {capas.slice(0, impresas).map((w, i) => (
                        <rect
                            key={i}
                            className="print-layer"
                            x={100 - w / 2}
                            y={base - (i + 1) * alto}
                            width={w}
                            height={alto - 2}
                            rx="2"
                        />
                    ))}
                    {!terminado && (
                        <g
                            className="print-head"
                            style={{ transform: `translateY(${base - (impresas + 1) * alto - 14}px)` }}
                        >
                            <g className="print-nozzle" style={{ "--recorrido": `${ancho / 2 - 4}px` }}>
                                <rect x="92" y="0" width="16" height="9" rx="2" />
                                <path d="M96 9h8l-4 5z" />
                            </g>
                        </g>
                    )}
                </svg>
            </Window>
        </section>
    );
}

export default Disegno;
