import {Container, SimpleGrid, Title} from "@mantine/core";
import { T } from "../../i18n/lang";
import Producto from "../../components/Cards/Productos/Producto";

function Tienda() {
    return (
        <Container size="xl" py="xl" pb={120}>
            <Title order={1} mb="xl">
                <T>Tienda</T>
            </Title>

            <SimpleGrid cols={{ base: 1, xs: 2, md: 3, lg: 4 }} spacing="lg">
                {Array.from({ length: 12 }, (_, i) => (
                    <Producto key={i} />
                ))}
            </SimpleGrid>
        </Container>
    );
}

export default Tienda;