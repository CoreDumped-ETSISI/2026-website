import { Avatar, Group, Modal } from "@mantine/core";
import {
  IconArrowUpRight,
  IconBrandGithub,
  IconCalendar,
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

function cleanModalText(raw) {
  if (!raw) return "";
  return String(raw).replace(/\r\n/g, "\n").replace(/\n{3,}/g, "\n\n").trim();
}

function parseTeamHandles(teamHandles) {
  if (!Array.isArray(teamHandles)) return [];
  return teamHandles
    .flatMap((entry) => String(entry).split(/[\s,]+/))
    .map((token) => token.replace(/^@+/, "").trim())
    .filter(Boolean);
}

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

  const descriptionText = cleanModalText(details.description);
  const goalText = cleanModalText(details.goal);
  const dodText = cleanModalText(details.definitionOfDone);
  const milestoneText = cleanModalText(details.nextMilestone);
  const placesText = cleanModalText(details.placesAndProfiles);
  const howToJoinText = cleanModalText(details.howToJoin);

  const metaParts = [
    ...(project.areas ?? []).map((area) => t(getAreaLabel(area))),
    project.level ? t(getLevelLabel(project.level)) : null,
  ].filter(Boolean);

  const parsedHandles = parseTeamHandles(project.teamHandles);

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
              className="project-member-link"
            >
              <Avatar
                src={user.avatarUrl}
                alt={user.name || user.login}
                size={20}
                radius="xl"
              />
              <span>@{user.login}</span>
            </a>
          ))}
        </Group>
      );
    }
    if (parsedHandles.length > 0) {
      return (
        <Group gap="sm" wrap="wrap">
          {parsedHandles.map((handle) => (
            <a
              key={handle}
              href={`https://github.com/${handle}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              @{handle} <span aria-hidden="true">↗</span>
            </a>
          ))}
        </Group>
      );
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
      overlayProps={{ color: "#000", backgroundOpacity: 0.72, blur: 2 }}
      transitionProps={{
        transition: "fade-up",
        duration: 180,
        timingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
      }}
      styles={{
        content: { background: "transparent", boxShadow: "none", overflow: "visible" },
        body: { padding: 0 },
      }}
    >
      <Window title={windowTitle}>
        <div className="window-content project-modal-scroll">
          <div className="project-modal-header">
            <div className="project-modal-heading">
              <div className="project-modal-meta-row">
                <span className={`project-status project-status--${statusMeta.variant}`}>
                  <span className="project-status-dot" aria-hidden="true" />
                  <span>{t(statusMeta.label)}</span>
                </span>
                <span className="project-meta-sep" aria-hidden="true">
                  ·
                </span>
                <span
                  className={`project-openness ${opennessMeta.variant !== "closed" ? "is-open" : ""}`}
                >
                  {t(opennessMeta.label)}
                </span>
                {metaParts.map((part, index) => (
                  <span key={`${part}-${index}`} className="project-meta-item">
                    <span className="project-meta-sep" aria-hidden="true">
                      ·
                    </span>
                    <span>{part}</span>
                  </span>
                ))}
                {project.number != null && (
                  <>
                    <span className="project-meta-sep" aria-hidden="true">
                      ·
                    </span>
                    <span className="project-issue-id">
                      #{String(project.number).padStart(2, "0")}
                    </span>
                  </>
                )}
              </div>
              <h2 className="project-modal-title">{project.title}</h2>
            </div>

            <button
              type="button"
              className="project-modal-close"
              onClick={onClose}
              aria-label={t("Cerrar")}
            >
              <IconX size={16} stroke={1.5} aria-hidden="true" />
            </button>
          </div>

          {returnDateText && (
            <div className="project-return-note">
              <IconCalendar size={16} stroke={1.5} aria-hidden="true" />
              <span>
                {t("Regreso estimado")}: {returnDateText}
              </span>
            </div>
          )}

          {descriptionText && (
            <div className="project-modal-section">
              <h4>{t("Descripción")}</h4>
              <p>{descriptionText}</p>
            </div>
          )}

          {goalText && (
            <div className="project-modal-section">
              <h4>{t("Objetivo")}</h4>
              <p>{goalText}</p>
            </div>
          )}

          {dodText && (
            <div className="project-modal-section">
              <h4>{t("Definición de hecho")}</h4>
              <p>{dodText}</p>
            </div>
          )}

          {milestoneText && (
            <div className="project-modal-section">
              <h4>{t("Próximo hito")}</h4>
              <p>{milestoneText}</p>
            </div>
          )}

          {placesText && (
            <div className="project-modal-section">
              <h4>{t("Plazas y perfiles buscados")}</h4>
              <p>{placesText}</p>
            </div>
          )}

          {howToJoinText && (
            <div className="project-modal-section">
              <h4>{t("Cómo participar")}</h4>
              <p>{howToJoinText}</p>
            </div>
          )}

          <ul className="detail-list project-modal-details">
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
              <span>{t("Ver ficha en GitHub")}</span>
              <IconArrowUpRight size={16} stroke={1.5} aria-hidden="true" />
            </a>

            {project.repoUrl && (
              <a
                className="project-cta-secondary"
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <IconBrandGithub size={16} stroke={1.5} aria-hidden="true" />
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
