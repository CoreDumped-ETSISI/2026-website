import { Card, Image, Title, Text } from "@mantine/core";
import Dialog from "../../overlays/Dialog";


function Producto({ imageSrc, title, description, quantity, onClick, onClose, selectedProductImage }) {

    return (
        <>
            <Dialog open={selectedProductImage === imageSrc} onClose={onClose}>
                <Image
                    src={imageSrc}
                    alt={title}
                    h={500}
                    fit="cover"
                />
            </Dialog>
            <Card withBorder radius="md" padding="md">
                <Card.Section>
                    <Image
                        src={imageSrc}
                        alt={title}
                        h={200}
                        fit="cover"
                        onClick={onClick}
                        style={{ cursor: "pointer" }}
                    />
                </Card.Section>

                <Title order={3} mt="md">{title}</Title>
                <Text size="sm" c="dimmed" mt="xs" lineClamp={3}>
                    {description}
                </Text>
                <Text size="sm" fw={500} mt="xs">Cantidad: {quantity}</Text>
            </Card>
        </>
    );
}

export default Producto;