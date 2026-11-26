import fs from "node:fs";
import path from "node:path";
import {
  DEFAULT_GITHUB_ORG,
  DEFAULT_PROJECT_NUMBER,
  fetchOrganizationProjectCatalog,
} from "../utils/services/githubProjects.js";

const OUT_PATH = path.resolve("src/data/projects.json");

function loadDotEnv(filePath = ".env") {
  if (!fs.existsSync(filePath)) return;
  const content = fs.readFileSync(filePath, "utf8");
  for (const rawLine of content.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;
    const eqIndex = line.indexOf("=");
    if (eqIndex <= 0) continue;
    const key = line.slice(0, eqIndex).trim();
    let value = line.slice(eqIndex + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (!process.env[key]) {
      process.env[key] = value;
    }
  }
}

async function main() {
  loadDotEnv();

  const token = process.env.GITHUB_TOKEN?.trim();
  const org = process.env.GITHUB_ORG?.trim() || DEFAULT_GITHUB_ORG;
  const projectNumber = Number(
    process.env.GITHUB_PROJECT_NUMBER?.trim() || DEFAULT_PROJECT_NUMBER
  );

  if (!token) {
    if (fs.existsSync(OUT_PATH)) {
      console.log(
        "ℹ GITHUB_TOKEN no configurado: usando src/data/projects.json existente."
      );
      return;
    }
    throw new Error(
      "GITHUB_TOKEN no configurado y no existe src/data/projects.json de respaldo."
    );
  }

  try {
    const catalog = await fetchOrganizationProjectCatalog({
      token,
      org,
      projectNumber,
    });
    fs.mkdirSync(path.dirname(OUT_PATH), { recursive: true });
    fs.writeFileSync(OUT_PATH, JSON.stringify(catalog, null, 2) + "\n", "utf8");
    console.log(
      `✔ Proyectos sincronizados desde GitHub (${catalog.items.length} proyectos en ${org}/projects/${projectNumber})`
    );
  } catch (err) {
    console.warn(
      `⚠ Error sincronizando proyectos desde GitHub: ${err.message}`
    );
    if (fs.existsSync(OUT_PATH)) {
      console.warn("ℹ Se mantiene el archivo src/data/projects.json existente.");
      return;
    }
    process.exitCode = 1;
  }
}

await main();
