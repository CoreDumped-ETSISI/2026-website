import "./Loading.css";
import { useEffect, useState } from "react";
import { LogoLoader } from "./components/LogoLoader.jsx";

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
            <LogoLoader porcentage={porcentageImg} isLoading={isLoading} />
        </section>
    )
};
