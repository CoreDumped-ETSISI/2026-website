import { useEffect, useRef, useState } from "react";

import "../../styles/Reveal/Reveal.css"

export default function Reveal({ from = "bottom", children, ...rest }) {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => setVisible(entry.isIntersecting),
            { threshold: 0.2 }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    return (
        // El wrapper exterior NO se mueve: es el que observa.
        // El interior es el que se anima.
        <div ref={ref} {...rest}>
            <div className={`reveal reveal--${from} ${visible ? "reveal--visible" : ""}`}>
                {children}
            </div>
        </div>
    );
}