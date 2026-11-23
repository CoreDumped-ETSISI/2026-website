import { Button, Paper, Stack, Text, Title } from "@mantine/core";
import { T } from "../../../../i18n/lang";


function Colabora() {
    return (
        <Paper component="section" withBorder radius="md" p={{ base: "lg", sm: "xl" }} className="colabora-section">
            <Stack gap="sm" align="center" ta="center">
                <Title order={2}>
                    <T>Colabora con nosotros</T>
                </Title>
                <Text c="dimmed" maw={600}>
                    <T>¿Te gustaría apoyar nuestras actividades o colaborar con Core Dumped? Escríbenos y cuéntanos tu propuesta.</T>
                </Text>
                <Button component="a" href="mailto:coredumped.etsisi@gmail.com" mt="sm">
                    <T>Rellena este formulario</T>
                </Button>
            </Stack>
        </Paper>
    );
}

export default Colabora;