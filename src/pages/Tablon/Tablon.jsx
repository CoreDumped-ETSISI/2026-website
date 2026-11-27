import { useMemo, useState } from "react";
import { Container, Select, SimpleGrid, TextInput } from "@mantine/core";
import {
  IconBrandGithub,
  IconPlus,
  IconRotateClockwise,
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
import { msg, T, useLang } from "../../i18n/lang";
import "./Tablon.css";

const VIEW_TABS = [
  { id: "all", label: msg("Todos") },
  { id: "join", label: msg("Unirse") },
  { id: "collaborate", label: msg("Colaborar") },
];

const SELECT_CLASS_NAMES = {
  input: "tablon-control-input",
  section: "tablon-control-section",
  dropdown: "tablon-control-dropdown",
  option: "tablon-control-option",
};

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
  const activeItems = catalogData?.items ?? [];

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
              Proyectos abiertos de hardware, software y datos en Core Dumped, sincronizados desde GitHub
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
          <Window title="project-catalog.sh">
            <ul className="terminal-log">
              <li className="is-cmd">
                <span aria-hidden="true">$</span>
                gh project item-list 11 --owner CoreDumped-ETSISI
              </li>
              <li className="is-info">
                <span aria-hidden="true">i</span>
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
                <IconPlus size={16} stroke={1.5} aria-hidden="true" />
                <span>{t("Proponer un proyecto")}</span>
              </a>
              <a
                className="project-cta-secondary"
                href={boardUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <IconBrandGithub size={16} stroke={1.5} aria-hidden="true" />
                <span>{t("Abrir Project Catalog en GitHub")}</span>
              </a>
            </div>
          </Window>
        ) : (
          <>
            <div className="tablon-toolbar">
              <div className="tablon-toolbar-top">
                <div
                  className="tablon-tabs"
                  role="tablist"
                  aria-label={t("Vistas del catálogo")}
                >
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

                {catalogData?.syncedAt && (
                  <div className="tablon-toolbar-meta">
                    <span className="tablon-sync-meta">
                      {t("Sincronizado")}: {formatSyncDate(catalogData.syncedAt, lang)}
                    </span>
                  </div>
                )}
              </div>

              <div
                className="tablon-filters"
                data-filtered={hasActiveFilters || undefined}
              >
                <TextInput
                  aria-label={t("Buscar proyectos")}
                  placeholder={t("Buscar proyectos")}
                  leftSection={<IconSearch size={16} stroke={1.5} aria-hidden="true" />}
                  classNames={{
                    input: "tablon-control-input",
                    section: "tablon-control-section",
                  }}
                  value={search}
                  onChange={(e) => setSearch(e.currentTarget.value)}
                />

                <Select
                  aria-label={t("Estado")}
                  placeholder={t("Estado")}
                  clearable
                  checkIconPosition="right"
                  comboboxProps={{ withinPortal: true, offset: 4 }}
                  classNames={SELECT_CLASS_NAMES}
                  value={statusFilter}
                  onChange={setStatusFilter}
                  data={STATUS_OPTIONS.map((o) => ({
                    value: o.value,
                    label: t(o.label),
                  }))}
                />

                <Select
                  aria-label={t("Área")}
                  placeholder={t("Área")}
                  clearable
                  checkIconPosition="right"
                  comboboxProps={{ withinPortal: true, offset: 4 }}
                  classNames={SELECT_CLASS_NAMES}
                  value={areaFilter}
                  onChange={setAreaFilter}
                  data={AREA_OPTIONS.map((o) => ({
                    value: o.value,
                    label: t(o.label),
                  }))}
                />

                <Select
                  aria-label={t("Nivel")}
                  placeholder={t("Nivel")}
                  clearable
                  checkIconPosition="right"
                  comboboxProps={{ withinPortal: true, offset: 4 }}
                  classNames={SELECT_CLASS_NAMES}
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
                    className="tablon-reset-btn"
                    onClick={resetFilters}
                  >
                    <IconRotateClockwise size={16} stroke={1.5} aria-hidden="true" />
                    <span>{t("Limpiar")}</span>
                  </button>
                )}
              </div>
            </div>

            {filteredItems.length === 0 ? (
              <Window title="filter.sh" className="compact">
                <ul className="terminal-log">
                  <li className="is-info">
                    <span aria-hidden="true">i</span>
                    {t("Ningún proyecto coincide con los filtros actuales")}
                  </li>
                </ul>
                <div className="tablon-empty-actions">
                  <button
                    type="button"
                    className="project-cta-secondary"
                    onClick={resetFilters}
                  >
                    <IconRotateClockwise size={16} stroke={1.5} aria-hidden="true" />
                    <span>{t("Limpiar filtros")}</span>
                  </button>
                </div>
              </Window>
            ) : (
              <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing={16}>
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
