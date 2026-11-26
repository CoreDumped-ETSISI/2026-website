import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Container, Select, SimpleGrid, TextInput } from "@mantine/core";
import {
  IconBrandGithub,
  IconEye,
  IconRefresh,
  IconRocket,
  IconSearch,
} from "@tabler/icons-react";
import TerminalTypingTitle from "../../components/Animaciones/TerminalTypingTitle";
import Window from "../../components/ui/Window";
import Proyecto from "../../components/Cards/Proyectos/Proyecto";
import ProyectoModal from "../../components/Cards/Proyectos/ProyectoModal";
import {
  AREA_OPTIONS,
  LEVEL_OPTIONS,
  PROJECT_BOARD_URL,
  PROPOSAL_URL,
  STATUS_OPTIONS,
  matchesCatalogView,
} from "../../components/Cards/Proyectos/projectMeta";
import catalogData from "../../data/projects.json";
import { SAMPLE_PROJECTS } from "../../data/projects.sample";
import { msg, T, useLang } from "../../i18n/lang";
import "./Tablon.css";

const VIEW_TABS = [
  { id: "all", label: msg("Todos") },
  { id: "join", label: msg("Unirse") },
  { id: "collaborate", label: msg("Colaborar") },
];

function formatSyncDate(isoString, lang) {
  if (!isoString) return "";
  const date = new Date(isoString);
  if (Number.isNaN(date.getTime())) return isoString;
  return new Intl.DateTimeFormat(lang === "en" ? "en-GB" : "es-ES", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

function Tablon() {
  const { lang, t } = useLang();
  const [searchParams, setSearchParams] = useSearchParams();
  const realItems = catalogData?.items ?? [];
  const isDemoQuery = searchParams.get("demo") === "1";
  const [demoPreview, setDemoPreview] = useState(isDemoQuery);

  const isDemoMode = realItems.length === 0 && (demoPreview || isDemoQuery);
  const activeItems = isDemoMode ? SAMPLE_PROJECTS : realItems;

  const [activeView, setActiveView] = useState("all");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState(null);
  const [areaFilter, setAreaFilter] = useState(null);
  const [levelFilter, setLevelFilter] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);

  const viewCounts = useMemo(
    () => ({
      all: activeItems.length,
      join: activeItems.filter((item) => matchesCatalogView(item, "join")).length,
      collaborate: activeItems.filter((item) =>
        matchesCatalogView(item, "collaborate")
      ).length,
    }),
    [activeItems]
  );

  const filteredItems = useMemo(() => {
    const query = search.trim().toLowerCase();
    return activeItems.filter((item) => {
      if (!matchesCatalogView(item, activeView)) return false;
      if (statusFilter && item.status !== statusFilter) return false;
      if (areaFilter && !(item.areas ?? []).includes(areaFilter)) return false;
      if (levelFilter && item.level !== levelFilter) return false;
      if (!query) return true;

      const haystack = [
        item.title,
        item.details?.description,
        item.details?.goal,
        item.lead,
        ...(item.technologies ?? []),
        ...(item.areas ?? []),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return haystack.includes(query);
    });
  }, [activeItems, activeView, statusFilter, areaFilter, levelFilter, search]);

  const hasActiveFilters = Boolean(
    search.trim() || statusFilter || areaFilter || levelFilter || activeView !== "all"
  );

  const resetFilters = () => {
    setActiveView("all");
    setSearch("");
    setStatusFilter(null);
    setAreaFilter(null);
    setLevelFilter(null);
  };

  const enterDemo = () => {
    setDemoPreview(true);
    const next = new URLSearchParams(searchParams);
    next.set("demo", "1");
    setSearchParams(next, { replace: true });
  };

  const exitDemo = () => {
    setDemoPreview(false);
    resetFilters();
    const next = new URLSearchParams(searchParams);
    next.delete("demo");
    setSearchParams(next, { replace: true });
  };

  const boardUrl = catalogData?.project?.url || PROJECT_BOARD_URL;

  return (
    <section id="tablon-page">
      <Container size="xl" py="xl" pb={120}>
        <TerminalTypingTitle>
          <T>Tablón</T>
        </TerminalTypingTitle>

        <div className="tablon-header">
          <p className="lead intro">
            <T>
              Catálogo abierto de proyectos de Core Dumped sincronizado con GitHub: descubre qué está activo, dónde puedes unirte o en qué colaborar.
            </T>
          </p>

          <div className="tablon-header-actions">
            <a
              className="arrow-link"
              href={PROPOSAL_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>{t("Proponer proyecto")}</span>
              <span aria-hidden="true">→</span>
            </a>
            <a
              className="arrow-link"
              href={boardUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>{t("Ver tablero en GitHub")}</span>
              <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>

        {activeItems.length === 0 ? (
          <Window title="project-catalog.sh" className="glow">
            <ul className="terminal-log">
              <li className="is-cmd">
                <span aria-hidden="true">$</span>
                gh project item-list 11 --owner CoreDumped-ETSISI
              </li>
              <li className="is-info">
                <span aria-hidden="true">ℹ</span>
                {t("El catálogo de proyectos está listo, pero todavía no hay tarjetas publicadas en GitHub.")}
              </li>
              <li className="is-out">
                <span aria-hidden="true"> </span>
                {t("Cualquier miembro puede proponer un nuevo proyecto rellenando la plantilla oficial.")}
              </li>
            </ul>

            <div className="tablon-empty-actions">
              <a
                className="project-cta-primary"
                href={PROPOSAL_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                <IconRocket size={15} stroke={2} aria-hidden="true" />
                <span>{t("Proponer un proyecto")}</span>
              </a>
              <a
                className="project-cta-secondary"
                href={boardUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <IconBrandGithub size={15} stroke={1.9} aria-hidden="true" />
                <span>{t("Abrir Project Catalog en GitHub")}</span>
              </a>
              <button
                type="button"
                className="pill-button"
                onClick={enterDemo}
                style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem" }}
              >
                <IconEye size={14} stroke={1.8} aria-hidden="true" />
                <span>{t("Previsualizar tarjetas de ejemplo")}</span>
              </button>
            </div>
          </Window>
        ) : (
          <>
            {isDemoMode && (
              <div className="tablon-demo-banner" role="status">
                <span>
                  <T>Vista de ejemplo — Aún no hay proyectos publicados en el catálogo de GitHub.</T>
                </span>
                <button type="button" className="pill-button" onClick={exitDemo}>
                  {t("Volver al catálogo real")}
                </button>
              </div>
            )}

            <div className="tablon-toolbar">
              <div className="tablon-tabs" role="tablist" aria-label={t("Vistas del catálogo")}>
                {VIEW_TABS.map((tab) => {
                  const isActive = activeView === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      className={`tablon-tab ${isActive ? "is-active" : ""}`}
                      onClick={() => setActiveView(tab.id)}
                    >
                      <span>{t(tab.label)}</span>
                      <span className="tablon-tab-count">{viewCounts[tab.id]}</span>
                    </button>
                  );
                })}
              </div>

              <div className="tablon-filters">
                <TextInput
                  label={t("Buscar")}
                  placeholder={t("Nombre, tecnología o líder...")}
                  leftSection={<IconSearch size={15} stroke={1.8} aria-hidden="true" />}
                  value={search}
                  onChange={(e) => setSearch(e.currentTarget.value)}
                />

                <Select
                  label={t("Estado")}
                  placeholder={t("Todos los estados")}
                  clearable
                  value={statusFilter}
                  onChange={setStatusFilter}
                  data={STATUS_OPTIONS.map((o) => ({
                    value: o.value,
                    label: t(o.label),
                  }))}
                />

                <Select
                  label={t("Área")}
                  placeholder={t("Todas las áreas")}
                  clearable
                  value={areaFilter}
                  onChange={setAreaFilter}
                  data={AREA_OPTIONS.map((o) => ({
                    value: o.value,
                    label: t(o.label),
                  }))}
                />

                <Select
                  label={t("Nivel")}
                  placeholder={t("Todos los niveles")}
                  clearable
                  value={levelFilter}
                  onChange={setLevelFilter}
                  data={LEVEL_OPTIONS.map((o) => ({
                    value: o.value,
                    label: t(o.label),
                  }))}
                />

                {hasActiveFilters && (
                  <button
                    type="button"
                    className="pill-button"
                    onClick={resetFilters}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.35rem",
                      height: 36,
                    }}
                  >
                    <IconRefresh size={14} stroke={1.8} aria-hidden="true" />
                    <span>{t("Limpiar filtros")}</span>
                  </button>
                )}
              </div>
            </div>

            {filteredItems.length === 0 ? (
              <div className="tablon-empty-filter">
                <p style={{ margin: 0 }}>
                  <T>No hay proyectos que coincidan con los filtros seleccionados.</T>
                </p>
                <button type="button" className="pill-button" onClick={resetFilters}>
                  {t("Limpiar filtros")}
                </button>
              </div>
            ) : (
              <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="lg">
                {filteredItems.map((project) => (
                  <Proyecto
                    key={project.id}
                    project={project}
                    onSelect={setSelectedProject}
                  />
                ))}
              </SimpleGrid>
            )}
          </>
        )}

        {catalogData?.syncedAt && (
          <p className="tablon-sync-meta">
            {t("Última sincronización")}: {formatSyncDate(catalogData.syncedAt, lang)}
          </p>
        )}

        <ProyectoModal
          project={selectedProject}
          opened={selectedProject !== null}
          onClose={() => setSelectedProject(null)}
        />
      </Container>
    </section>
  );
}

export default Tablon;
