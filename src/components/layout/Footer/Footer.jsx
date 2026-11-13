
import { Container, Text, Anchor, Stack } from "@mantine/core";
import {T} from "../../../i18n/lang";

export default function Footer() {
    return (
        <footer>
            <Container py="lg">
                <Stack align="center" gap="xs">
                    <Text size="sm">
                        © {new Date().getFullYear()} CoreDumped
                    </Text>

                    <Text size="xs" c="dimmed">
                        <T>Licenciado bajo la Apache License, Version 2.0.</T>
                    </Text>

                    <Anchor
                        href="https://www.apache.org/licenses/LICENSE-2.0"
                        target="_blank"
                        rel="noopener noreferrer"
                        size="sm"
                    >
                        Apache License 2.0
                    </Anchor>
                </Stack>
            </Container>
        </footer>
    );
}
