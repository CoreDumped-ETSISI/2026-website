import { Octokit } from "@octokit/core";
import { paginateGraphQL } from "@octokit/plugin-paginate-graphql";

export const DEFAULT_GITHUB_ORG = "CoreDumped-ETSISI";
export const DEFAULT_PROJECT_NUMBER = 11;
export const CATALOG_REPO_NAME = "CoreDumped-ETSISI/project-catalog";
export const CATALOG_REPO_URL = `https://github.com/${CATALOG_REPO_NAME}`;
export const PROPOSAL_URL = `${CATALOG_REPO_URL}/issues/new?template=project-proposal.yml`;
export const PROJECT_BOARD_URL = `https://github.com/orgs/${DEFAULT_GITHUB_ORG}/projects/${DEFAULT_PROJECT_NUMBER}`;

const INTERNAL_WORKFLOW_LABELS = new Set(["proposal", "approved", "rejected"]);

export const PROJECT_CATALOG_QUERY = `
  query GetOrganizationProjectCatalog($org: String!, $projectNumber: Int!, $cursor: String) {
    organization(login: $org) {
      login
      name
      url
      avatarUrl
      projectV2(number: $projectNumber) {
        id
        number
        title
        shortDescription
        readme
        url
        public
        closed
        updatedAt
        fields(first: 30) {
          nodes {
            __typename
            ... on ProjectV2Field {
              id
              name
              dataType
            }
            ... on ProjectV2SingleSelectField {
              id
              name
              dataType
              options {
                id
                name
                color
                description
              }
            }
            ... on ProjectV2MultiSelectField {
              id
              name
              dataType
              multiSelectOptions {
                id
                name
                color
                description
              }
            }
          }
        }
        items(first: 50, after: $cursor) {
          totalCount
          pageInfo {
            hasNextPage
            endCursor
          }
          nodes {
            id
            type
            isArchived
            createdAt
            updatedAt
            fieldValues(first: 20) {
              nodes {
                __typename
                ... on ProjectV2ItemFieldTextValue {
                  text
                  field {
                    ... on ProjectV2FieldCommon {
                      name
                    }
                  }
                }
                ... on ProjectV2ItemFieldDateValue {
                  date
                  field {
                    ... on ProjectV2FieldCommon {
                      name
                    }
                  }
                }
                ... on ProjectV2ItemFieldNumberValue {
                  number
                  field {
                    ... on ProjectV2FieldCommon {
                      name
                    }
                  }
                }
                ... on ProjectV2ItemFieldSingleSelectValue {
                  name
                  optionId
                  color
                  field {
                    ... on ProjectV2FieldCommon {
                      name
                    }
                  }
                }
                ... on ProjectV2ItemFieldMultiSelectValue {
                  value
                  options {
                    id
                    name
                    color
                  }
                  field {
                    ... on ProjectV2FieldCommon {
                      name
                    }
                  }
                }
              }
            }
            content {
              __typename
              ... on Issue {
                id
                number
                title
                url
                issueState: state
                body
                createdAt
                updatedAt
                author {
                  login
                }
                repository {
                  nameWithOwner
                  url
                }
                labels(first: 20) {
                  nodes {
                    id
                    name
                    color
                    description
                  }
                }
                assignees(first: 15) {
                  nodes {
                    login
                    name
                    avatarUrl
                    url
                  }
                }
              }
              ... on DraftIssue {
                id
                title
                body
                createdAt
                updatedAt
                assignees(first: 15) {
                  nodes {
                    login
                    name
                    avatarUrl
                    url
                  }
                }
              }
              ... on PullRequest {
                id
                number
                title
                url
                prState: state
                body
                createdAt
                updatedAt
                author {
                  login
                }
                repository {
                  nameWithOwner
                  url
                }
                labels(first: 20) {
                  nodes {
                    id
                    name
                    color
                    description
                  }
                }
                assignees(first: 15) {
                  nodes {
                    login
                    name
                    avatarUrl
                    url
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

const PROPOSAL_SECTION_MAP = {
  description: "description",
  goal: "goal",
  "definition of done": "definitionOfDone",
  "next milestone": "nextMilestone",
  "project lead": "lead",
  team: "team",
  area: "areaText",
  level: "levelText",
  technologies: "technologiesText",
  openness: "opennessText",
  "places and profiles": "placesAndProfiles",
  "how to join": "howToJoin",
  resources: "resources",
  "resource details": "resourceDetails",
  "external organization": "externalOrganization",
  repository: "repositoryStatus",
  "repository link": "repositoryLink",
  license: "license",
  "discord channel": "discord",
};

function cleanSectionValue(raw) {
  if (!raw) return null;
  const trimmed = raw.trim();
  if (!trimmed || /^_no response_$/i.test(trimmed)) return null;
  return trimmed;
}

function parseCheckedResources(raw) {
  if (!raw) return [];
  return raw
    .split(/\r?\n/)
    .map((line) => line.match(/^-\s*\[[xX]\]\s*(.+)$/)?.[1]?.trim())
    .filter(Boolean);
}

/**
 * Parses a GitHub Issue Form markdown body generated from project-proposal.yml.
 * Falls back cleanly to a plain description excerpt for freeform issues or drafts.
 */
export function parseIssueProposalBody(markdown = "") {
  const result = {
    description: null,
    goal: null,
    definitionOfDone: null,
    nextMilestone: null,
    lead: null,
    team: null,
    areaText: null,
    levelText: null,
    technologiesText: null,
    opennessText: null,
    placesAndProfiles: null,
    howToJoin: null,
    resources: [],
    resourceDetails: null,
    externalOrganization: null,
    repositoryStatus: null,
    repositoryLink: null,
    license: null,
    discord: null,
    rawBody: typeof markdown === "string" ? markdown.trim() : "",
  };

  if (!result.rawBody) return result;

  const lines = result.rawBody.split(/\r?\n/);
  const sections = [];
  let currentHeading = null;
  let buffer = [];

  for (const line of lines) {
    const match = line.match(/^###\s+(.+?)\s*$/);
    if (match) {
      if (currentHeading !== null) {
        sections.push([currentHeading, buffer.join("\n")]);
      }
      currentHeading = match[1].trim().toLowerCase();
      buffer = [];
    } else if (currentHeading !== null) {
      buffer.push(line);
    }
  }

  if (currentHeading !== null) {
    sections.push([currentHeading, buffer.join("\n")]);
  }

  if (sections.length === 0) {
    const firstParagraph = result.rawBody
      .split(/\n\s*\n/)
      .map((part) => part.replace(/\s+/g, " ").trim())
      .find(Boolean);
    if (firstParagraph) {
      result.description =
        firstParagraph.length > 220
          ? `${firstParagraph.slice(0, 217).trimEnd()}...`
          : firstParagraph;
    }
    return result;
  }

  for (const [heading, rawValue] of sections) {
    const key = PROPOSAL_SECTION_MAP[heading];
    if (!key) continue;

    if (key === "resources") {
      result.resources = parseCheckedResources(rawValue);
    } else {
      result[key] = cleanSectionValue(rawValue);
    }
  }

  return result;
}

function normalizeHttpUrl(raw) {
  if (!raw || typeof raw !== "string") return null;
  const trimmed = raw.trim();
  const markdownLinkMatch = trimmed.match(/\((https?:\/\/[^\s)]+)\)/i);
  const candidate = markdownLinkMatch ? markdownLinkMatch[1] : trimmed.split(/\s+/)[0];
  try {
    const parsed = new URL(candidate);
    if (parsed.protocol === "http:" || parsed.protocol === "https:") {
      return parsed.toString();
    }
  } catch {
    return null;
  }
  return null;
}

function stripProjectPrefix(title = "") {
  const trimmed = String(title).trim();
  const stripped = trimmed.replace(/^project:\s*/i, "").trim();
  return stripped || trimmed;
}

function splitList(raw) {
  if (!raw) return [];
  return raw
    .split(/[,;\n]+/)
    .map((entry) => entry.replace(/^[-*]\s*/, "").trim())
    .filter(Boolean);
}

function parseHandles(raw) {
  if (!raw) return [];
  return splitList(raw)
    .map((token) => token.replace(/^@+/, "").trim())
    .filter(Boolean)
    .map((login) => `@${login}`);
}

function normalizeAreaName(area) {
  const lower = area.toLowerCase();
  if (lower === "computer engineering") return "Hardware";
  if (lower === "data & ai") return "Data Science";
  return area;
}

function normalizeOpennessFallback(opennessText) {
  if (!opennessText) return null;
  const items = splitList(opennessText).map((s) => s.toLowerCase());
  const hasMembers = items.some((s) => s.includes("looking for members"));
  const hasCollab = items.some((s) => s.includes("open to collaboration"));
  if (hasMembers && hasCollab) return "Looking for members & collaboration";
  if (hasMembers) return "Looking for members";
  if (hasCollab) return "Open to collaboration";
  if (items.some((s) => s.includes("closed"))) return "Closed";
  return splitList(opennessText)[0] ?? null;
}

function extractFieldMap(item) {
  const map = new Map();
  const nodes = item?.fieldValues?.nodes ?? [];
  for (const fv of nodes) {
    const fieldName = fv?.field?.name;
    if (!fieldName) continue;
    map.set(fieldName.trim().toLowerCase(), fv);
  }
  return map;
}

function normalizeLead(rawLead, authorLogin) {
  const source = rawLead || (authorLogin ? `@${authorLogin}` : null);
  if (!source) return null;
  const firstToken = source.split(/[\s,]+/).find(Boolean);
  if (!firstToken) return null;
  return firstToken.startsWith("@") ? firstToken : `@${firstToken}`;
}

function dedupeStrings(values) {
  const seen = new Set();
  const out = [];
  for (const val of values) {
    const cleaned = val?.trim();
    if (!cleaned) continue;
    const key = cleaned.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(cleaned);
  }
  return out;
}

function normalizeFieldDefinitions(fields) {
  return (fields?.nodes ?? []).map((field) => ({
    id: field.id,
    name: field.name,
    dataType: field.dataType,
    options: field.options ?? field.multiSelectOptions ?? [],
  }));
}

/**
 * Normalizes a GitHub Organization ProjectV2 GraphQL response into a flat,
 * UI-ready catalog payload.
 */
export function normalizeProjectCatalog(data, syncedAt = new Date().toISOString()) {
  const org = data?.organization;
  const project = org?.projectV2;

  if (!org || !project) {
    throw new Error("GitHub GraphQL response did not include organization.projectV2");
  }

  const rawItems = project.items?.nodes ?? [];
  const items = rawItems
    .filter((item) => item && !item.isArchived)
    .map((item) => {
      const content = item.content ?? {};
      const parsed = parseIssueProposalBody(content.body ?? "");
      const fields = extractFieldMap(item);

      const statusField = fields.get("status");
      const opennessField = fields.get("openness");
      const areaField = fields.get("main area");
      const levelField = fields.get("level");
      const returnDateField = fields.get("return date");
      const leadField = fields.get("lead");
      const repoLinkField = fields.get("repo link");

      const status = statusField?.name ?? "Proposal";
      const statusColor = statusField?.color ?? null;
      const openness =
        opennessField?.name ??
        normalizeOpennessFallback(parsed.opennessText) ??
        "Looking for members";

      const areaValuesFromField =
        areaField?.options?.map((o) => o.name) ??
        (areaField?.value ? splitList(areaField.value) : []);
      const areas = dedupeStrings(
        (areaValuesFromField.length > 0
          ? areaValuesFromField
          : splitList(parsed.areaText)
        ).map(normalizeAreaName)
      );

      const level = levelField?.name ?? parsed.levelText ?? null;
      const returnDate = returnDateField?.date ?? null;
      const lead = normalizeLead(leadField?.text ?? parsed.lead, content.author?.login);

      const contentRepoUrl =
        content.repository?.nameWithOwner &&
        content.repository.nameWithOwner.toLowerCase() !== CATALOG_REPO_NAME.toLowerCase()
          ? normalizeHttpUrl(content.repository.url)
          : null;

      const repoUrl =
        normalizeHttpUrl(repoLinkField?.text) ??
        normalizeHttpUrl(parsed.repositoryLink) ??
        contentRepoUrl;

      const labels = (content.labels?.nodes ?? []).filter(
        (label) => label?.name && !INTERNAL_WORKFLOW_LABELS.has(label.name.toLowerCase())
      );

      const technologies = dedupeStrings([
        ...labels.map((label) => label.name),
        ...splitList(parsed.technologiesText),
      ]);

      const assignees = (content.assignees?.nodes ?? []).map((user) => ({
        login: user.login,
        name: user.name || user.login,
        avatarUrl: user.avatarUrl,
        url: user.url,
      }));

      const titleField = fields.get("title");
      const rawTitle = content.title || titleField?.text || "Untitled Project";

      return {
        id: item.id,
        number: content.number ?? null,
        title: stripProjectPrefix(rawTitle),
        issueUrl: content.url || project.url || PROJECT_BOARD_URL,
        repoUrl,
        state: content.issueState ?? content.prState ?? content.state ?? null,
        createdAt: content.createdAt ?? item.createdAt ?? null,
        updatedAt: content.updatedAt ?? item.updatedAt ?? null,
        status,
        statusColor,
        openness,
        areas,
        level,
        returnDate,
        lead,
        assignees,
        teamHandles: parseHandles(parsed.team),
        labels,
        technologies,
        details: {
          description: parsed.description,
          goal: parsed.goal,
          definitionOfDone: parsed.definitionOfDone,
          nextMilestone: parsed.nextMilestone,
          placesAndProfiles: parsed.placesAndProfiles,
          howToJoin: parsed.howToJoin,
          resources: parsed.resources,
          resourceDetails: parsed.resourceDetails,
          externalOrganization: parsed.externalOrganization,
          license: parsed.license,
          discord: parsed.discord,
          rawBody: parsed.rawBody,
        },
      };
    });

  return {
    syncedAt,
    org: {
      login: org.login,
      name: org.name || org.login,
      url: org.url,
      avatarUrl: org.avatarUrl,
    },
    project: {
      id: project.id,
      number: project.number,
      title: project.title,
      shortDescription: project.shortDescription,
      description: project.readme,
      url: project.url || PROJECT_BOARD_URL,
      public: Boolean(project.public),
      closed: Boolean(project.closed),
      updatedAt: project.updatedAt,
      fields: normalizeFieldDefinitions(project.fields),
    },
    items,
  };
}

/**
 * Fetches all items of an organization's GitHub ProjectV2 board via Octokit
 * GraphQL pagination and returns a normalized catalog object.
 */
export async function fetchOrganizationProjectCatalog({
  token,
  org = DEFAULT_GITHUB_ORG,
  projectNumber = DEFAULT_PROJECT_NUMBER,
} = {}) {
  if (!token) {
    throw new Error("GITHUB_TOKEN is required to query GitHub Projects v2 GraphQL API.");
  }

  const PaginatedOctokit = Octokit.plugin(paginateGraphQL);
  const octokit = new PaginatedOctokit({ auth: token });

  const response = await octokit.graphql.paginate(PROJECT_CATALOG_QUERY, {
    org,
    projectNumber: Number(projectNumber),
  });

  return normalizeProjectCatalog(response);
}
