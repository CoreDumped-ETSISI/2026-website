import { useEffect, useState } from "react";

// Cuenta de 0 a `total` en bucle, un paso cada `ms`, con una pausa de `pausa` pasos al final.
// Con prefers-reduced-motion se queda directamente en el estado final.
export default function useStepLoop(total, ms = 500, pausa = 4) {
    const reduce = typeof window !== "undefined"
        && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    const [step, setStep] = useState(reduce ? total : 0);

    useEffect(() => {
        if (reduce) return;
        const id = setInterval(() => setStep((s) => (s + 1) % (total + pausa + 1)), ms);
        return () => clearInterval(id);
    }, [total, ms, pausa, reduce]);

    return Math.min(step, total);
}
