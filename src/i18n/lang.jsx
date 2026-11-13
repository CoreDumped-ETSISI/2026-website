import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import en from "./translations.en.json"; // generado por scripts/translate.mjs

const dictionaries = { en };
export const normalize = (s) => s.replace(/\s+/g, " ").trim();

const LangContext = createContext(null);

function initialLang() {
    try {
        const saved = localStorage.getItem("lang");
        if (saved) return saved;
    } catch {}
    return navigator.language?.startsWith("en") ? "en" : "es";
}

export function LanguageProvider({ children }) {
    const [lang, setLang] = useState(initialLang);

    // Mantiene <html lang> sincronizado (clave para lectores de pantalla)
    useEffect(() => {
        document.documentElement.lang = lang;
        try {
            localStorage.setItem("lang", lang);
        } catch {}
    }, [lang]);

    const t = useCallback(
        (text) => (lang === "es" ? text : dictionaries[lang]?.[normalize(text)] ?? text),
        [lang]
    );

    const value = useMemo(() => ({ lang, setLang, t }), [lang, t]);
    return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export const useLang = () => useContext(LangContext);
export const useT = () => useContext(LangContext).t;

// Componente T: envuelve el texto en español que quieres traducir
export function T({ children }) {
    return useT()(String(children));
}

// Marca textos definidos fuera de un componente (arrays, constantes).
// No hace nada en ejecución: solo avisa al script de que debe traducirlo.
export const msg = (text) => text;

// Título de la pestaña traducido: usePageTitle(msg("Inicio | CoreDumped"))
export function usePageTitle(text) {
    const t = useT();
    useEffect(() => {
        document.title = t(text);
    }, [t, text]);
}
