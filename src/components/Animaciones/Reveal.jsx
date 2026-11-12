import { useEffect, useRef, useState } from "react";
import "../../styles/Reveal/Reveal.css"
export default function Reveal({ from = "bottom", children, ...rest }) {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    observer.disconnect(); // solo se anima una vez
                }
            },
            { threshold: 0.2 }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={ref}
            className={`reveal reveal--${from} ${visible ? "reveal--visible" : ""}`}
            {...rest}
        >
            {children}
        </div>
    );
}