import { Card, SimpleGrid, Text } from "@mantine/core";
import UseSvg from "../../../../common/svg/UseSvg";
import { msg, useT } from "../../../../i18n/lang";

const ColaboratorsList = [
    {
        name: "HTB",
        icon: "htb",
        description: msg("Plataforma de ciberseguridad con máquinas y retos para practicar hacking ético.")
    },
    {
        name: "Siemens",
        icon: "siemens",
        description: msg("Empresa tecnológica referente en industria, automatización e infraestructuras.")
    },
    {
        name: "NextDigital",
        icon: "nextdigital",
        description: msg("Consultora tecnológica especializada en transformación digital y desarrollo de software.")
    },
    {
        name: "Qualcomm",
        icon: "qualcomm",
        description: msg("Compañía líder en semiconductores y tecnologías de comunicación inalámbrica.")
    },
    {
        name: "BambooLabs",
        icon: "bamboolabs",
        description: msg("Fabricante de impresoras 3D rápidas y fáciles de usar.")
    },
];

function ColaboradoresList() {
    const t = useT();

    return (
        <div className="colaboradores-list">
            {ColaboratorsList.map((colaborator, index) => (
                <Card
                    key={colaborator.name}
                    withBorder
                    radius="md"
                    padding="lg"
                    className={`colaborador-card ${index % 2 === 0 ? "l" : "r"}`}
                    style={{ flexDirection: index % 2 === 0 ? "row" : "row-reverse", gap: "2rem", justifyItems: "space-between" }}
                >
                    <div className="colaborador-logo">
                        <UseSvg icon={colaborator.icon} titleSvg={`Logo de ${colaborator.name}`}
                        />
                    </div>
                    <div style={{ position: "relative" }}>
                        <Text fw={700} mt="md" className="text">
                            {colaborator.name}
                        </Text>

                        <Text className="description">
                            {t(colaborator.description)}
                        </Text>
                    </div>
                </Card>
            ))}
        </div>
    );
}

export default ColaboradoresList;
