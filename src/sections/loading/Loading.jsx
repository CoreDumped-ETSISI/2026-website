import "./Loading.css";
import { useEffect, useState } from "react";
import { LogoLoader } from "./components/LogoLoader.jsx";
const CORE_COLORS = ['white', 'green', 'purple', 'black'];

// Número de copias que forman la estela de cada cometa
const TRAIL_LENGTH = 4;

export default function Loading() {
    const [isLoading, setIsLoading] = useState(true)
    const [porcentageImg, setPorcentageImg] = useState(0);

    useEffect(() => {
        if (porcentageImg >= 100) {
            setIsLoading(false)
            return
        }
        const timeOut = setTimeout(() => {
            setPorcentageImg((p) => p + 1)
        }, 30)
        return () => clearTimeout(timeOut)
    }, [porcentageImg])

    return (
        <section id='loading-core'>
            {CORE_COLORS.map((color) =>
                // De la cola (i alto) a la cabeza (i = 0) para que la cabeza quede encima
                Array.from({ length: TRAIL_LENGTH + 1 }, (_, n) => TRAIL_LENGTH - n).map((i) => (
                    <span
                        key={`${color}-${i}`}
                        className={`color-core color-core--${color}`}
                        style={{ '--i': i }}
                        aria-hidden="true"
                    />
                ))
            )}

            <LogoLoader porcentage={porcentageImg} isLoading={isLoading} />
        </section>
    )
};
