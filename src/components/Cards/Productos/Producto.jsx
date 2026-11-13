import { Card, Image, Title, Text } from "@mantine/core";

function Producto() {
    return (
        <Card withBorder radius="md" padding="md">
            <Card.Section>
                <Image
                    src="https://placehold.co/600x400/f1f5f9/475569.png?text=Producto+Ejemplo"
                    alt="Producto de ejemplo"
                    h={200}
                    fit="cover"
                />
            </Card.Section>

            <Title order={3} mt="md">Ejemplo</Title>
            <Text size="sm" c="dimmed" mt="xs" lineClamp={3}>
                Producto de ejemplo con mucha descripcion
            </Text>
            <Text size="sm" fw={500} mt="xs">Cantidad: 5</Text>
        </Card>
    );
}

export default Producto;