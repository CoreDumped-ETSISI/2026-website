import { msg } from "../../../i18n/lang";

export const DEFAULT_GITHUB_ORG = "CoreDumped-ETSISI";
export const DEFAULT_PROJECT_NUMBER = 11;
export const CATALOG_REPO_URL = `https://github.com/${DEFAULT_GITHUB_ORG}/project-catalog`;
export const PROPOSAL_URL = `${CATALOG_REPO_URL}/issues/new?template=project-proposal.yml`;
export const PROJECT_BOARD_URL = `https://github.com/orgs/${DEFAULT_GITHUB_ORG}/projects/${DEFAULT_PROJECT_NUMBER}`;

export const STATUS_OPTIONS = [
  { value: "Proposal", label: msg("Propuesta"), variant: "proposal" },
  { value: "Active", label: msg("Activo"), variant: "active" },
  { value: "Paused", label: msg("Pausado"), variant: "paused" },
  { value: "Completed", label: msg("Completado"), variant: "completed" },
  { value: "Archived", label: msg("Archivado"), variant: "archived" },
];

export const OPENNESS_OPTIONS = [
  {
    value: "Looking for members",
    label: msg("Busca miembros"),
    variant: "members",
  },
  {
    value: "Open to collaboration",
    label: msg("Abierto a colaboración"),
    variant: "collab",
  },
  {
    value: "Looking for members & collaboration",
    label: msg("Busca miembros y colaboración"),
    variant: "both",
  },
  {
    value: "Closed",
    label: msg("Cerrado"),
    variant: "closed",
  },
];

export const AREA_OPTIONS = [
  { value: "Software", label: msg("Software") },
  { value: "Hardware", label: msg("Hardware") },
  { value: "Data Science", label: msg("Ciencia de datos") },
];

export const LEVEL_OPTIONS = [
  { value: "Beginner", label: msg("Inicial") },
  { value: "Intermediate", label: msg("Intermedio") },
  { value: "Advanced", label: msg("Avanzado") },
];

const STATUS_MAP = Object.fromEntries(STATUS_OPTIONS.map((o) => [o.value, o]));
const OPENNESS_MAP = Object.fromEntries(OPENNESS_OPTIONS.map((o) => [o.value, o]));
const AREA_MAP = Object.fromEntries(AREA_OPTIONS.map((o) => [o.value, o.label]));
const LEVEL_MAP = Object.fromEntries(LEVEL_OPTIONS.map((o) => [o.value, o.label]));

export function getStatusMeta(status) {
  return STATUS_MAP[status] ?? { value: status, label: status || msg("Propuesta"), variant: "proposal" };
}

export function getOpennessMeta(openness) {
  return OPENNESS_MAP[openness] ?? { value: openness, label: openness || msg("Abierto a colaboración"), variant: "collab" };
}

export function getAreaLabel(area) {
  return AREA_MAP[area] ?? area;
}

export function getLevelLabel(level) {
  return LEVEL_MAP[level] ?? level;
}

export function matchesCatalogView(project, view) {
  if (view === "join") {
    return (
      project.openness === "Looking for members" ||
      project.openness === "Looking for members & collaboration"
    );
  }
  if (view === "collaborate") {
    return (
      project.openness === "Open to collaboration" ||
      project.openness === "Looking for members & collaboration"
    );
  }
  return true;
}

export function formatReturnDate(dateStr, lang = "es") {
  if (!dateStr) return null;
  const parsed = new Date(`${dateStr}T00:00:00`);
  if (Number.isNaN(parsed.getTime())) return dateStr;
  return new Intl.DateTimeFormat(lang === "en" ? "en-GB" : "es-ES", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(parsed);
}
