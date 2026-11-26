import { Avatar, Group, Modal } from "@mantine/core";
import {
  IconBrandGithub,
  IconCalendar,
  IconChartBar,
  IconExternalLink,
  IconLayersSubtract,
  IconX,
} from "@tabler/icons-react";
import { useLang } from "../../../i18n/lang";
import Window from "../../ui/Window";
import {
  formatReturnDate,
  getAreaLabel,
  getLevelLabel,
  getOpennessMeta,
  getStatusMeta,
} from "./projectMeta";
import "./Proyecto.css";

function renderLeadLink(lead) {
  if (!lead) return null;
  const clean = lead.replace(/^@+/, "").trim();
  if (!clean || /\s/.test(clean)) return <span>{lead}</span>;
  return (
    <a
      href={`https://github.com/${clean}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      @{clean} <span aria-hidden="true">↗</span>
    </a>
  );
}

function ProyectoModal({ project, opened, onClose }) {
  const { lang, t } = useLang();

  if (!project) return null;

  const statusMeta = getStatusMeta(project.status);
  const opennessMeta = getOpennessMeta(project.openness);
  const returnDateText =
    project.status === "Paused" ? formatReturnDate(project.returnDate, lang) : null;
  const details = project.details ?? {};

  const teamSummary = (() => {
    const assignees = project.assignees ?? [];
    if (assignees.length > 0) {
      return (
        <Group gap="xs" wrap="wrap">
          {assignees.map((user) => (
            <a
              key={user.login}
              href={user.url || `https://github.com/${user.login}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem" }}
            >
              <Avatar src={user.avatarUrl} alt={user.name || user.login} size={22} radius="xl" />
              <span>@{user.login}</span>
            </a>
          ))}
        </Group>
      );
    }
    if (project.teamHandles?.length > 0) {
      return <span>{project.teamHandles.join(", ")}</span>;
    }
    return null;
  })();

  const windowTitle = project.number ? `project-${project.number}.md` : "project-card.md";

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      size="lg"
      centered
      withCloseButton={false}
      padding={0}
      radius="md"
      overlayProps={{ color: "#000", backgroundOpacity: 0.72, blur: 3 }}
      transitionProps={{ transition: "pop", duration: 180 }}
      styles={{
        content: { background: "transparent", boxShadow: "none", overflow: "visible" },
        body: { padding: 0 },
      }}
    >
      <Window title={windowTitle} className="glow">
        <div className="window-content project-modal-scroll">
          <div className="project-modal-header">
            <div>
              <Group gap="xs" wrap="wrap">
                <span className={`project-badge project-badge--${statusMeta.variant}`}>
                  <span className="project-badge-dot" aria-hidden="true" />
                  {t(statusMeta.label)}
                </span>
                <span className={`project-badge project-badge--${opennessMeta.variant}`}>
                  {t(opennessMeta.label)}
                </span>
                {project.areas?.map((area) => (
                  <span key={area} className="project-meta-chip">
                    <IconLayersSubtract size={13} stroke={1.8} aria-hidden="true" />
                    {t(getAreaLabel(area))}
                  </span>
                ))}
                {project.level && (
                  <span className="project-meta-chip">
                    <IconChartBar size={13} stroke={1.8} aria-hidden="true" />
                    {t(getLevelLabel(project.level))}
                  </span>
                )}
              </Group>
              <h2 className="project-modal-title">{project.title}</h2>
            </div>

            <button
              type="button"
              className="pill-button"
              onClick={onClose}
              aria-label={t("Cerrar")}
              style={{ display: "inline-flex", alignItems: "center", gap: "0.25rem" }}
            >
              <IconX size={14} stroke={2} aria-hidden="true" />
              <span>{t("Cerrar")}</span>
            </button>
          </div>

          {returnDateText && (
            <div className="project-return-banner">
              <IconCalendar size={14} stroke={1.8} aria-hidden="true" />
              <span>
                {t("Regreso estimado")}: {returnDateText}
              </span>
            </div>
          )}

          {details.description && (
            <div className="project-modal-section">
              <h4>{t("Descripción")}</h4>
              <p>{details.description}</p>
            </div>
          )}

          {details.goal && (
            <div className="project-modal-section">
              <h4>{t("Objetivo")}</h4>
              <p>{details.goal}</p>
            </div>
          )}

          {details.definitionOfDone && (
            <div className="project-modal-section">
              <h4>{t("Definición de hecho")}</h4>
              <p>{details.definitionOfDone}</p>
            </div>
          )}

          {details.nextMilestone && (
            <div className="project-modal-section">
              <h4>{t("Próximo hito")}</h4>
              <p>{details.nextMilestone}</p>
            </div>
          )}

          {details.placesAndProfiles && (
            <div className="project-modal-section">
              <h4>{t("Plazas y perfiles buscados")}</h4>
              <p>{details.placesAndProfiles}</p>
            </div>
          )}

          {details.howToJoin && (
            <div className="project-modal-section">
              <h4>{t("Cómo participar")}</h4>
              <p>{details.howToJoin}</p>
            </div>
          )}

          <ul className="detail-list" style={{ maxWidth: "100%" }}>
            {project.lead && (
              <li>
                <strong>{t("Líder")}</strong>
                <span>{renderLeadLink(project.lead)}</span>
              </li>
            )}
            {teamSummary && (
              <li>
                <strong>{t("Equipo")}</strong>
                <span>{teamSummary}</span>
              </li>
            )}
            {project.technologies?.length > 0 && (
              <li>
                <strong>{t("Tecnologías")}</strong>
                <span>
                  <div className="project-tech-list">
                    {project.technologies.map((tech) => (
                      <span key={tech} className="project-tech-tag">
                        {tech}
                      </span>
                    ))}
                  </div>
                </span>
              </li>
            )}
            {details.license && (
              <li>
                <strong>{t("Licencia")}</strong>
                <span>{details.license}</span>
              </li>
            )}
            {details.externalOrganization && (
              <li>
                <strong>{t("Org. externa")}</strong>
                <span>{details.externalOrganization}</span>
              </li>
            )}
            {details.discord && (
              <li>
                <strong>{t("Canal Discord")}</strong>
                <span>{details.discord === "Yes" ? t("Sí") : t("No")}</span>
              </li>
            )}
          </ul>

          <div className="project-modal-actions">
            <a
              className="project-cta-primary"
              href={project.issueUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <IconExternalLink size={15} stroke={2} aria-hidden="true" />
              <span>{t("Ver ficha en GitHub")}</span>
            </a>

            {project.repoUrl && (
              <a
                className="project-cta-secondary"
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <IconBrandGithub size={15} stroke={1.9} aria-hidden="true" />
                <span>{t("Ir al repositorio")}</span>
              </a>
            )}
          </div>
        </div>
      </Window>
    </Modal>
  );
}

export default ProyectoModal;
