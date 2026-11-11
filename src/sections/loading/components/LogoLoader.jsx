import "./LogoLoader.css";
import coreBlackBoth from "./../../../../assets/icons/core-black-both.svg";
import coreGreenBlackBoth from "./../../../../assets/icons/core-green-black-both.svg";
import { useEffect, useState } from "react";

const TEXT_CTA = "¿Quieres saber más sobre nosotros?";
// Milisegundos entre letra y letra
const TYPING_MS = 90;

// Logo que se va rellenando de verde según el porcentaje de carga
export const LogoLoader = ({ porcentage, isLoading }) => {
    // Parte del texto que ya se ha escrito
    const [typedText, setTypedText] = useState("");

    useEffect(() => {
        if (isLoading) return;

        // Cada letra sale TYPING_MS después de la anterior
        const timeOuts = [...TEXT_CTA].map((_, i) =>
            setTimeout(() => {
                setTypedText(TEXT_CTA.slice(0, i + 1));
            }, TYPING_MS * (i + 1))
        );

        return () => timeOuts.forEach(clearTimeout);
    }, [isLoading])
    return (
        <div className="logo-loader">
            <div className="loading-spinner">
                <img
                    id="loading-black-img"
                    src={coreBlackBoth}
                    alt="Logo"
                />
                <img
                    id="loading-green-black-img"
                    className={porcentage >= 100 ? "active" : undefined}

                    src={coreGreenBlackBoth}
                    alt={isLoading ? "Loading..." : "Loaded"} style={{ '--porcentage-img': `${porcentage}%` }}
                />
            </div>
            {
                isLoading ?
                    <p id="cta-loader" className="porcentage-text">{porcentage}%</p>
                    :
                    <p id="cta-loader" className={`write-text ${porcentage >= 100 ? "active" : undefined}`}>&gt; <span className="text">{typedText}</span><span className="underscore">_</span></p>
            }
        </div>
    )
};
