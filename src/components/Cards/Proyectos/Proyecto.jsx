import { Avatar, Tooltip } from "@mantine/core";
import {
  IconBrandGithub,
  IconCalendar,
  IconChartBar,
  IconExternalLink,
  IconLayersSubtract,
} from "@tabler/icons-react";
import { useLang } from "../../../i18n/lang";
import {
  formatReturnDate,
  getAreaLabel,
  getLevelLabel,
  getOpennessMeta,
  getStatusMeta,
} from "./projectMeta";
import "./Proyecto.css";

function Proyecto({ project, onSelect }) {
  const { lang, t } = useLang();
  const statusMeta = getStatusMeta(project.status);
  const opennessMeta = getOpennessMeta(project.openness);
  const returnDateText =
    project.status === "Paused" ? formatReturnDate(project.returnDate, lang) : null;

  const visibleTechs = (project.technologies ?? []).slice(0, 5);
  const extraTechCount = Math.max(0, (project.technologies?.length ?? 0) - visibleTechs.length);
  const assignees = project.assignees ?? [];
  const visibleAssignees = assignees.slice(0, 3);
  const extraAssignees = Math.max(0, assignees.length - visibleAssignees.length);

  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onSelect?.(project);
    }
  };

  return (
    <article
      className="project-card"
      tabIndex={0}
      role="button"
      aria-label={`${project.title} — ${t("Ver detalles del proyecto")}`}
      onClick={() => onSelect?.(project)}
      onKeyDown={handleKeyDown}
    >
      <div className="project-card-top">
        <span className={`project-badge project-badge--${statusMeta.variant}`}>
          <span className="project-badge-dot" aria-hidden="true" />
          {t(statusMeta.label)}
        </span>
        <span className={`project-badge project-badge--${opennessMeta.variant}`}>
          {t(opennessMeta.label)}
        </span>
      </div>

      <div className="project-card-body">
        <h3 className="project-card-title">{project.title}</h3>

        {project.details?.description && (
          <p className="project-card-desc">{project.details.description}</p>
        )}

        {returnDateText && (
          <div className="project-return-banner">
            <IconCalendar size={14} stroke={1.8} aria-hidden="true" />
            <span>
              {t("Regreso estimado")}: {returnDateText}
            </span>
          </div>
        )}

        {(project.areas?.length > 0 || project.level) && (
          <div className="project-meta-row">
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
          </div>
        )}

        {visibleTechs.length > 0 && (
          <div className="project-tech-list">
            {visibleTechs.map((tech) => (
              <span key={tech} className="project-tech-tag">
                {tech}
              </span>
            ))}
            {extraTechCount > 0 && (
              <span className="project-tech-tag">+{extraTechCount}</span>
            )}
          </div>
        )}
      </div>

      <div className="project-card-footer">
        <div className="project-team-block">
          {assignees.length > 0 && (
            <Avatar.Group spacing="xs">
              {visibleAssignees.map((user) => (
                <Tooltip key={user.login} label={`@${user.login}`} withArrow>
                  <Avatar
                    src={user.avatarUrl}
                    alt={user.name || user.login}
                    size={24}
                    radius="xl"
                  />
                </Tooltip>
              ))}
              {extraAssignees > 0 && (
                <Avatar size={24} radius="xl">
                  +{extraAssignees}
                </Avatar>
              )}
            </Avatar.Group>
          )}
          {project.lead && (
            <span className="project-lead-text" title={project.lead}>
              {project.lead}
            </span>
          )}
        </div>

        <div className="project-card-links">
          {project.repoUrl && (
            <a
              className="project-link-pill"
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              aria-label={`${t("Repositorio de")} ${project.title}`}
            >
              <IconBrandGithub size={14} stroke={1.8} aria-hidden="true" />
              <span>{t("Código")}</span>
            </a>
          )}
          <a
            className="project-link-pill"
            href={project.issueUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            aria-label={`${t("Ficha en GitHub de")} ${project.title}`}
          >
            <IconExternalLink size={14} stroke={1.8} aria-hidden="true" />
            <span>{t("Ficha")}</span>
          </a>
        </div>
      </div>
    </article>
  );
}

export default Proyecto;
