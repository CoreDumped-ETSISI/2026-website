import { Card, SimpleGrid, Text } from "@mantine/core";
import UseSvg from "../../../../common/svg/UseSvg";

const ColaboratorsList = [
    {
        name: "HTB",
        icon: "htb",
    },
    {
        name: "Siemens",
        icon: "siemens",
    },
    {
        name: "NextDigital",
        icon: "nextdigital",
    },
    {
        name: "Qualcomm",
        icon: "qualcomm",
    },
    {
        name: "BambooLabs",
        icon: "bamboolabs",
    },
];

function ColaboradoresList() {
    return (
        <SimpleGrid cols={{ base: 1, xs: 2, sm: 3, lg: 5 }} spacing="lg" className="colaboradores-grid">
            {ColaboratorsList.map((colaborator) => (
                <Card
                    key={colaborator.name}
                    withBorder
                    radius="md"
                    padding="lg"
                    className="colaborador-card"
                >
                    <div className="colaborador-logo">
                        <UseSvg icon={colaborator.icon} titleSvg={`Logo de ${colaborator.name}`}
                            style={{ width: "100%", height: "100%", maxWidth: 120, maxHeight: 90 }}
                        />
                    </div>
                    <Text fw={600} ta="center" mt="md">
                        {colaborator.name}
                    </Text>
                </Card>
            ))}
        </SimpleGrid>
    );
}

export default ColaboradoresList;
