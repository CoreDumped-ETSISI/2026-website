import { Avatar, Tooltip } from "@mantine/core";
import {
  IconArrowUpRight,
  IconBrandGithub,
  IconCalendar,
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

function normalizeSummary(raw) {
  if (!raw) return "";
  return String(raw).replace(/\s+/g, " ").trim();
}

function Proyecto({ project, onSelect }) {
  const { lang, t } = useLang();
  const statusMeta = getStatusMeta(project.status);
  const opennessMeta = getOpennessMeta(project.openness);
  const returnDateText =
    project.status === "Paused" ? formatReturnDate(project.returnDate, lang) : null;

  const descriptionText = normalizeSummary(project.details?.description);
  const metaParts = [
    ...(project.areas ?? []).map((area) => t(getAreaLabel(area))),
    project.level ? t(getLevelLabel(project.level)) : null,
  ].filter(Boolean);

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
        <span className={`project-status project-status--${statusMeta.variant}`}>
          <span className="project-status-dot" aria-hidden="true" />
          <span>{t(statusMeta.label)}</span>
        </span>

        <div className="project-card-ref">
          <span
            className={`project-openness ${opennessMeta.variant !== "closed" ? "is-open" : ""}`}
          >
            {t(opennessMeta.label)}
          </span>
          {project.number != null && (
            <span className="project-issue-id">
              #{String(project.number).padStart(2, "0")}
            </span>
          )}
        </div>
      </div>

      <div className="project-card-body">
        <h3 className="project-card-title">{project.title}</h3>

        {descriptionText && (
          <p className="project-card-desc">{descriptionText}</p>
        )}

        {returnDateText && (
          <div className="project-return-note">
            <IconCalendar size={16} stroke={1.5} aria-hidden="true" />
            <span>
              {t("Regreso estimado")}: {returnDateText}
            </span>
          </div>
        )}

        {metaParts.length > 0 && (
          <div className="project-meta-line">
            {metaParts.map((part, index) => (
              <span key={`${part}-${index}`} className="project-meta-item">
                {index > 0 && (
                  <span className="project-meta-sep" aria-hidden="true">
                    ·
                  </span>
                )}
                <span>{part}</span>
              </span>
            ))}
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
            <Avatar.Group spacing={6}>
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
              className="project-card-link"
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              aria-label={`${t("Repositorio de")} ${project.title}`}
            >
              <IconBrandGithub size={16} stroke={1.5} aria-hidden="true" />
              <span>{t("Código")}</span>
            </a>
          )}
          <a
            className="project-card-link"
            href={project.issueUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            aria-label={`${t("Ficha en GitHub de")} ${project.title}`}
          >
            <span>{t("Ficha")}</span>
            <IconArrowUpRight size={16} stroke={1.5} aria-hidden="true" />
          </a>
        </div>
      </div>
    </article>
  );
}

export default Proyecto;
