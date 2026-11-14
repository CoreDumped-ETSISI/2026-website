import { Container, SimpleGrid, Title } from "@mantine/core";
import { T } from "../../i18n/lang";
import Producto from "../../components/Cards/Productos/Producto";
import { useState } from "react";

// this array is an example of products, you can replace it with your own data
// the function below generates 12 products with random quantities and placeholder images
const products = Array.from({ length: 12 }, (_, i) => ({
    href: "#",
    imageSrc: `https://placehold.co/600x400/f1f5f9/475569.png?text=Producto+${i + 1}`,
    title: `Producto ${i + 1}`,
    description: `Descripción del producto ${i + 1}`,
    quantity: Math.floor(Math.random() * 10) + 1,
}));
function Tienda() {
    const [selectedProductImage, setSelectedProductImage] = useState(null);
    return (
        <div id="tienda-page">
            <Container size="xl" py="xl" pb={120}>
                <Title order={1} mb="xl">
                    <T>Tienda</T>
                </Title>

                <SimpleGrid cols={{ base: 1, xs: 2, md: 3, lg: 4 }} spacing="lg">
                    {products.map((product, i) => (
                        <Producto
                            key={i}
                            {...product}
                            selectedProductImage={selectedProductImage}
                            onClick={() => setSelectedProductImage(product.imageSrc)}
                            onClose={() => setSelectedProductImage(null)}
                        />
                    ))}
                </SimpleGrid>
            </Container>
        </div>
    );
}

export default Tienda;