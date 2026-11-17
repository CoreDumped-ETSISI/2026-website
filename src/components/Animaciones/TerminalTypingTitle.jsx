// components/Animaciones/TerminalTyper.jsx
import { Title } from "@mantine/core";
import { Children, isValidElement, useEffect, useRef, useState } from "react";
import { T, useT } from "../../i18n/lang"; // ajusta la ruta
import classes from "./TerminalTypingTitle.module.css";
// Recorre children y devuelve texto plano.
// - <T>texto</T> se traduce con t()
// - texto suelto se deja tal cual (se traduce entero después si no había ningún <T>)
function extract(children, t, found) {
    return Children.toArray(children)
        .map((child) => {
            if (typeof child === "string" || typeof child === "number") return String(child);
            if (isValidElement(child)) {
                if (child.type === T) {
                    found.current = true;
                    return t(extract(child.props.children, t, found));
                }
                return extract(child.props.children, t, found);
            }
            return "";
        })
        .join("");
}

function TerminalTyper({ children, user = "", host = "", speed = 50, onComplete }) {
    const t = useT();

    const found = { current: false };
    let text = extract(children, t, found);
    // Sin <T> dentro: traduce el texto completo (<TerminalTyper>Tablón</TerminalTyper>)
    if (!found.current) text = t(text);

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

        setDisplayedUser("");
        setDisplayedHost("");
        setDisplayedText("");

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

    const hasPrompt = user || host;

    return (
        <Title
            component="span"
            className={classes.root}
            aria-label={`${user}${hasPrompt ? "@" : ""}${host}${text}`}
        >
            <span aria-hidden="true">
                <span className={classes.user}>{displayedUser}</span>
                {hasPrompt && <span className={classes.at}>@</span>}
                <span className={classes.host}>{displayedHost}</span>
                <span className={classes.text}>{displayedText}</span>
                <span className={classes.cursor} />
            </span>
        </Title>
    );
}

export default TerminalTyper;