import { Title } from "@mantine/core";
import { useEffect, useState } from "react";

function TerminalTypingText({ text, speed = 50, onComplete }) {
    const [displayedText, setDisplayedText] = useState("");
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFinished, setIsFinished] = useState(false);

    useEffect(() => {
        if (currentIndex < text.length) {
            const timeout = setTimeout(() => {
                setDisplayedText((prev) => prev + text[currentIndex]);
                setCurrentIndex((prev) => prev + 1);
            }, speed);
            return () => clearTimeout(timeout);
        } else if (!isFinished) {
            setIsFinished(true);
            if (onComplete) onComplete();
        }
    }, [currentIndex, text, speed, isFinished]);

    return (
        <Title
            component="span"
            style={{
                fontFamily: 'monospace',
                color: "var(--terminal-text)",
                //  textShadow: '0 0 8px rgba(0, 255, 102, 0.4)'
            }}
        >
            {displayedText}
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