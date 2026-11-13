import { Title } from "@mantine/core";
import { useEffect, useRef, useState } from "react";

function TerminalTypingText({ text, user, host, speed = 50, onComplete }) {
    const [displayedUser, setDisplayedUser] = useState("");
    const [displayedHost, setDisplayedHost] = useState("");
    const [displayedText, setDisplayedText] = useState("");
    const onCompleteRef = useRef(onComplete);

    useEffect(() => {
        onCompleteRef.current = onComplete;
    }, [onComplete]);

    useEffect(() => {
        let cancelled = false;
        let timeout;
        let resolveTimeout;

        const typeText = async () => {
            const segments = [
                [user, setDisplayedUser],
                [host, setDisplayedHost],
                [text, setDisplayedText],
            ];

            for (const [segment, setDisplayedSegment] of segments) {
                for (const character of segment) {
                    await new Promise((resolve) => {
                        resolveTimeout = resolve;
                        timeout = setTimeout(resolve, speed);
                    });

                    resolveTimeout = undefined;
                    if (cancelled) return;
                    setDisplayedSegment((previous) => previous + character);
                }
            }

            if (!cancelled) onCompleteRef.current?.();
        };

        typeText();

        return () => {
            cancelled = true;
            clearTimeout(timeout);
            resolveTimeout?.();
        };
    }, [text, user, host, speed]);

    return (
        <Title
            component="span"
            style={{
                fontFamily: 'monospace',
                color: "var(--terminal-text)",
                //  textShadow: '0 0 8px rgba(0, 255, 102, 0.4)'
            }}
        >
            <span style={{ color: "#af72fff3" }}>{displayedUser}</span><span style={{ color: "var(--text)", margin: "0 4px" }}>@</span><span style={{ color: "#04b807f3" }}>{displayedHost}</span><span style={{ color: "var(--text)" }}>{displayedText}</span>
            <span style={{
                display: 'inline-block',
                width: '8px',
                height: '1.1em',
                backgroundColor: "var(--terminal-text)",
                marginLeft: '4px',
                verticalAlign: 'middle',
                animation: 'blink 1s infinite'
            }} />
        </Title>
    );
}
export default TerminalTypingText;