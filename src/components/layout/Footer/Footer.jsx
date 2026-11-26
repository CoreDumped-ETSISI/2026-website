import { Container, Text, Anchor, Stack } from "@mantine/core";
import { T } from "../../../i18n/lang";
import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <footer style={{ minHeight: 'var(--footer-h)', flexShrink: 0 }}>
            <Container py="lg">
                <Stack align="center" gap="xs">
                    <Text size="sm">© {new Date().getFullYear()} Core Dumped</Text>
                    <Text size="xs" c="dimmed">
                        <T>Desarrolladores</T>{' '}
                        <Link to="https://github.com/Hacking-jack">@Hacking-jack</Link>
                        &nbsp;<T>y</T>&nbsp;
                        <Link to="https://github.com/Nicowooow">@Nicowooow</Link>
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