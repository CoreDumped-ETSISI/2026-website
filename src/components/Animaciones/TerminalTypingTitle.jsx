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

function TerminalTyper({ children, user = "", host = "", speed = 50, onComplete, typingDone }) {
    const t = useT();

    const found = { current: false };
    let text = extract(children, t, found);
    // Sin <T> dentro: traduce el texto completo (<TerminalTyper>Tablón</TerminalTyper>)
    if (!found.current) text = t(text);

    const [displayedUser, setDisplayedUser] = useState("");
    const [displayedHost, setDisplayedHost] = useState("");
    const [displayedText, setDisplayedText] = useState("");
    const [typingText, setTypingText] = useState(":~$ ");
    const [tempTypingText, setTempTypingText] = useState("");
    const [cursorPosition, setCursorPosition] = useState(4);

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

    const handleKeyDown = (event) => {
        console.log(event.key);

        if (event.key === "Backspace") {
            event.preventDefault();
            if (cursorPosition > 4) {
                setTypingText((prev) => prev.slice(0, cursorPosition - 1) + prev.slice(cursorPosition));
                setCursorPosition((prev) => prev - 1);
            }
            return;
        }

        if (event.key === "Delete") {
            event.preventDefault();
            if (cursorPosition < typingText.length) {
                setTypingText((prev) => prev.slice(0, cursorPosition) + prev.slice(cursorPosition + 1));
            }
            return;
        }

        if (event.key === "Enter") {
            event.preventDefault();
            console.log("acción a definir");
            setTypingText(":~$ ");
            setCursorPosition(4);
            return;
        }


        if (event.key === "Alt" || event.key === "AltGraph" || event.key === "Control" || event.key === "Shift" || event.key === "Meta") {
            event.preventDefault();
            console.log(event.key);
            return;
        }



        if (event.key.startsWith("Arrow")) {
            if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
                event.preventDefault();
                setCursorPosition((position) => event.key === "ArrowLeft"
                    ? Math.max(4, position - 1)
                    : Math.min(typingText.length, position + 1));
            }
            return;
        }

        if (event.key === " ") {
            event.preventDefault();
            setTypingText((prev) => prev.slice(0, cursorPosition) + event.key + prev.slice(cursorPosition));
            setCursorPosition((prev) => prev + event.key.length);
            return;
        }

        if (event.key.length === 1) {
            setTypingText((prev) => prev.slice(0, cursorPosition) + event.key + prev.slice(cursorPosition));
            setCursorPosition((prev) => prev + event.key.length);
        }

    }

    useEffect(() => {
        console.log(typingText);

        if (!typingDone) return;
        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [typingText, cursorPosition, typingDone]);

    return (
        <Title
            component="span"
            className={classes.root}
            // order={2}
            size={31}
            aria-label={`${user}${hasPrompt ? "@" : ""}${host}${text}`}
        >
            <span aria-hidden="true">
                <span className={classes.user}>{displayedUser}</span>
                {hasPrompt && <span className={classes.at}>@</span>}
                <span className={classes.host}>{displayedHost}</span>
                <span className={classes.text}>{displayedText}</span>
                {typingText.length <= 4 && <span className={classes.cursor} />}

                {typingText.length > 4 && (
                    <>
                        <br />
                        <span className={classes.user}>{displayedUser}</span>
                        {hasPrompt && <span className={classes.at}>@</span>}
                        <span className={classes.host}>{displayedHost}</span>
                        <span className={classes.text} style={{ whiteSpace: "pre-wrap" }}>
                            {typingText.slice(0, cursorPosition)}
                            <span className={classes.cursor} />
                            {typingText.slice(cursorPosition)}
                        </span>
                    </>
                )}
            </span>
        </Title>
    );
}

export default TerminalTyper;
