import UseSvg from "../../../../common/svg/UseSvg";
import Window from "../../../../components/ui/Window";
import { msg, useT } from "../../../../i18n/lang";

const ColaboratorsList = [
    {
        name: "Hack The Box",
        icon: "htb",
        slug: "htb",
        sector: msg("Ciberseguridad"),
        href: "https://www.hackthebox.com/",
        web: "hackthebox.com",
        description: msg("Plataforma de ciberseguridad con máquinas y retos para practicar hacking ético."),
    },
    {
        name: "Siemens",
        icon: "siemens",
        slug: "siemens",
        sector: msg("Industria"),
        href: "https://www.siemens.com/",
        web: "siemens.com",
        description: msg("Empresa tecnológica referente en industria, automatización e infraestructuras."),
    },
    {
        name: "NextDigital",
        icon: "nextdigital",
        slug: "nextdigital",
        sector: msg("Consultoría"),
        href: "https://www.nextdigital.es/", // TODO: confirmar web
        web: "nextdigital.es",
        description: msg("Consultora tecnológica especializada en transformación digital y desarrollo de software."),
    },
    {
        name: "Qualcomm",
        icon: "qualcomm",
        slug: "qualcomm",
        sector: msg("Semiconductores"),
        href: "https://www.qualcomm.com/",
        web: "qualcomm.com",
        description: msg("Compañía líder en semiconductores y tecnologías de comunicación inalámbrica."),
    },
    {
        name: "Bambu Lab",
        icon: "bamboolabs",
        slug: "bambulab",
        sector: msg("Impresión 3D"),
        href: "https://bambulab.com/",
        web: "bambulab.com",
        description: msg("Fabricante de impresoras 3D rápidas y fáciles de usar."),
    },
];

function ColaboradoresList() {
    const t = useT();

    return (
        <div className="partners">
            {ColaboratorsList.map(({ name, icon, slug, sector, href, web, description }, i) => (
                <article key={slug} className={i % 2 === 1 ? "feature reverse" : "feature"}>
                    <div className="feature-info">
                        <span className="eyebrow">
                            {String(i + 1).padStart(2, "0")} — {t(sector)}
                        </span>
                        <h2 className="feature-title">{name}</h2>
                        <p className="lead">{t(description)}</p>
                        <ul className="detail-list narrow">
                            <li>
                                <strong>{t("Sector")}</strong>
                                <span>{t(sector)}</span>
                            </li>
                            <li>
                                <strong>Web</strong>
                                <a href={href} target="_blank" rel="noopener noreferrer">
                                    {web} <span aria-hidden="true">↗</span>
                                </a>
                            </li>
                        </ul>
                    </div>

                    <Window title={`partner://${slug}`} className="glow hoverable" aria-hidden="true">
                        <div className="partner-stage">
                            <div className="partner-logo">
                                <UseSvg icon={icon} />
                            </div>
                            <span className="partner-badge">
                                {t("Colabora con CoreDumped")}
                            </span>
                        </div>
                    </Window>
                </article>
            ))}
        </div>
    );
}

export default ColaboradoresList;
