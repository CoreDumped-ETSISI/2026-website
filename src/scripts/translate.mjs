import fs from "node:fs";
import path from "node:path";

const SRC_DIR = "src";
const OUT = "src/i18n/translations.en.json";
const MODEL = "Xenova/opus-mt-es-en";

const norm = (s) => s.replace(/\s+/g, " ").trim();

// 1. Recorre el código y recoge los textos
function walk(dir) {
    return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
        const p = path.join(dir, e.name);
        if (e.isDirectory()) return walk(p);
        return /\.(jsx?|tsx?)$/.test(e.name) ? [p] : [];
    });
}

const reTag = /<T>([^<{}]+)<\/T>/g;                                  // <T>texto</T>
const reCall = /\b(?:t|msg)\(\s*(["'`])((?:(?!\1)[^\\\n])+)\1\s*\)/g; // t("texto") y msg("texto")

const found = new Set();
for (const file of walk(SRC_DIR)) {
    const code = fs.readFileSync(file, "utf8");
    for (const m of code.matchAll(reTag)) found.add(norm(m[1]));
    for (const m of code.matchAll(reCall)) found.add(norm(m[2]));
}

// 2. Compara con lo que ya hay traducido
const existing = fs.existsSync(OUT) ? JSON.parse(fs.readFileSync(OUT, "utf8")) : {};
const missing = [...found].filter((s) => s && !existing[s]);

// descarta textos que ya no se usan
const result = {};
for (const s of found) if (existing[s]) result[s] = existing[s];

// 3. Traduce solo lo nuevo (el modelo solo se carga si hace falta)
if (missing.length) {
    const { pipeline, env } = await import("@huggingface/transformers");
    env.cacheDir = "./.cache/models"; // fuera de node_modules
    const translator = await pipeline("translation", MODEL, { dtype: "q8" });
    for (const s of missing) {
        const [{ translation_text }] = await translator(s);
        result[s] = translation_text;
        console.log(`✔ ${s}  →  ${translation_text}`);
    }
}

const sorted = Object.fromEntries(
    Object.entries(result).sort(([a], [b]) => a.localeCompare(b))
);
fs.writeFileSync(OUT, JSON.stringify(sorted, null, 4) + "\n");
console.log(`Traducciones: ${Object.keys(sorted).length} (${missing.length} nuevas)`);