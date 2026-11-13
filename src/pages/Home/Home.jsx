import {Button, Container, Stack} from "@mantine/core";
import TerminalTypingText from "../../components/Animaciones/TerminalTypingTitle";
import {useState} from "react";
import {T} from "../../i18n/lang";
import {Link} from "react-router-dom";


function Home() {
    const [typingDone, setTypingDone] = useState(false);
    return (
        <Container size="lg" py="xl" mih="calc(100dvh - 70px)"
                   style={{
                       display: "flex",
                       flexDirection: "column",
                       justifyContent: "center",
                       alignItems: "center",
                       textAlign: "center",
                   }}>
            <Stack gap="md" align="center">

                <TerminalTypingText
                    text="root@coredumped:~$ initializing system... access granted."
                    speed={35}
                    onComplete={() => setTypingDone(true)}
                />
                <span/>
            </Stack>
            <Stack gap="md" mt="md" align="center">
                <span/>
                <Button
                    bg="var(--terminal-text)"
                    h="clamp(64px, 9vw, 110px)"
                    px="clamp(32px, 6vw, 80px)"
                    fz="clamp(1.4rem, 3.6vw, 2.8rem)"
                    radius="md"
                    component={Link}
                    to="/conocenos"
                    className={`fade-up ${typingDone ? "fade-up--visible" : ""}`}
                    aria-hidden={!typingDone}
                    tabIndex={typingDone ? 0 : -1}
                    > <T>Conócenos</T> </Button>

            </Stack>

            <style>{`
                @keyframes blink {
                    0%, 49% { opacity: 1; }
                    50%, 100% { opacity: 0; }
                }
            `}</style>
        </Container>
    );
}

export default Home;