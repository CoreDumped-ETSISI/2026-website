import test from "node:test";
import assert from "node:assert/strict";
import { buildSchema, extendSchema, parse, validate } from "graphql";
import { schema as octokitSchema } from "@octokit/graphql-schema";
import {
  PROJECT_CATALOG_QUERY,
  normalizeProjectCatalog,
  parseIssueProposalBody,
} from "./githubProjects.js";

const MULTI_SELECT_EXTENSION = `
  extend enum ProjectV2FieldType {
    MULTI_SELECT
  }

  type ProjectV2MultiSelectFieldOption {
    color: ProjectV2SingleSelectFieldOptionColor!
    description: String!
    descriptionHTML: String!
    id: String!
    name: String!
    nameHTML: String!
  }

  type ProjectV2MultiSelectField implements Node & ProjectV2FieldCommon {
    createdAt: DateTime!
    dataType: ProjectV2FieldType!
    databaseId: Int
    id: ID!
    multiSelectOptions(names: [String!]): [ProjectV2MultiSelectFieldOption!]!
    name: String!
    project: ProjectV2!
    updatedAt: DateTime!
  }

  type ProjectV2ItemFieldMultiSelectValue implements Node & ProjectV2ItemFieldValueCommon {
    createdAt: DateTime!
    creator: Actor
    databaseId: Int
    field: ProjectV2FieldConfiguration!
    id: ID!
    item: ProjectV2Item!
    options: [ProjectV2MultiSelectFieldOption!]
    updatedAt: DateTime!
    value: String!
  }

  extend union ProjectV2FieldConfiguration = ProjectV2MultiSelectField
  extend union ProjectV2ItemFieldValue = ProjectV2ItemFieldMultiSelectValue
`;

test("PROJECT_CATALOG_QUERY is valid against GitHub GraphQL schema (with MultiSelect extensions)", () => {
  const baseSchema = buildSchema(octokitSchema.idl, { assumeValidSDL: true });
  const fullSchema = extendSchema(baseSchema, parse(MULTI_SELECT_EXTENSION), {
    assumeValidSDL: true,
  });
  const document = parse(PROJECT_CATALOG_QUERY);
  const errors = validate(fullSchema, document);

  assert.deepEqual(
    errors.map((e) => e.message),
    []
  );
});

test("parseIssueProposalBody parses GitHub issue-form markdown and strips _No response_", () => {
  const markdown = `### Description

Sensor ambiental modular para el aula.

### Goal

Medir CO2 y temperatura en tiempo real.

### Definition of done

Prototipo conectado por MQTT funcionando una semana.

### Next milestone

PCB v1 en marzo

### Project lead

@alice

### Team

@alice, @bob

### Area

Software, Computer Engineering

### Level

Beginner

### Technologies

ESP32, MQTT, KiCad

### Openness

Looking for members, Open to collaboration

### Places and profiles

2 plazas de firmware y hardware

### How to join

Abre una issue "I want to join".

### Resources

- [x] Materials from the inventory
- [ ] Server (GitLab, deployments...)
- [x] 3D printer

### Resource details

_No response_

### External organization

_No response_

### Repository

Already has a repository in the organization

### Repository link

https://github.com/CoreDumped-ETSISI/sensor-aula

### License

GPL-3.0 (recommended)

### Discord channel

Yes
`;

  const parsed = parseIssueProposalBody(markdown);
  assert.equal(parsed.description, "Sensor ambiental modular para el aula.");
  assert.equal(parsed.goal, "Medir CO2 y temperatura en tiempo real.");
  assert.equal(parsed.definitionOfDone, "Prototipo conectado por MQTT funcionando una semana.");
  assert.equal(parsed.nextMilestone, "PCB v1 en marzo");
  assert.equal(parsed.lead, "@alice");
  assert.equal(parsed.team, "@alice, @bob");
  assert.equal(parsed.areaText, "Software, Computer Engineering");
  assert.equal(parsed.levelText, "Beginner");
  assert.equal(parsed.technologiesText, "ESP32, MQTT, KiCad");
  assert.equal(parsed.opennessText, "Looking for members, Open to collaboration");
  assert.equal(parsed.placesAndProfiles, "2 plazas de firmware y hardware");
  assert.equal(parsed.howToJoin, 'Abre una issue "I want to join".');
  assert.deepEqual(parsed.resources, ["Materials from the inventory", "3D printer"]);
  assert.equal(parsed.resourceDetails, null);
  assert.equal(parsed.externalOrganization, null);
  assert.equal(parsed.repositoryLink, "https://github.com/CoreDumped-ETSISI/sensor-aula");
  assert.equal(parsed.license, "GPL-3.0 (recommended)");
  assert.equal(parsed.discord, "Yes");
});

test("normalizeProjectCatalog maps custom fields, ignores catalog repo as code repo, and filters archived items", () => {
  const sampleResponse = {
    organization: {
      login: "CoreDumped-ETSISI",
      name: "Core Dumped",
      url: "https://github.com/CoreDumped-ETSISI",
      avatarUrl: "https://avatars.githubusercontent.com/u/29098031?v=4",
      projectV2: {
        id: "PVT_11",
        number: 11,
        title: "Project Catalog",
        shortDescription: "All Core Dumped projects",
        readme: "Every card is a Core Dumped project.",
        url: "https://github.com/orgs/CoreDumped-ETSISI/projects/11",
        public: true,
        closed: false,
        updatedAt: "2026-11-26T10:07:59Z",
        fields: {
          nodes: [
            {
              __typename: "ProjectV2SingleSelectField",
              id: "F_STATUS",
              name: "Status",
              dataType: "SINGLE_SELECT",
              options: [{ id: "1", name: "Active", color: "PINK", description: "" }],
            },
            {
              __typename: "ProjectV2MultiSelectField",
              id: "F_AREA",
              name: "Main area",
              dataType: "MULTI_SELECT",
              multiSelectOptions: [
                { id: "a1", name: "Software", color: "GRAY", description: "" },
                { id: "a2", name: "Hardware", color: "GRAY", description: "" },
              ],
            },
          ],
        },
        items: {
          totalCount: 2,
          pageInfo: { hasNextPage: false, endCursor: null },
          nodes: [
            {
              id: "PVTI_1",
              type: "ISSUE",
              isArchived: false,
              createdAt: "2026-11-26T11:00:00Z",
              updatedAt: "2026-11-26T12:00:00Z",
              fieldValues: {
                nodes: [
                  {
                    __typename: "ProjectV2ItemFieldSingleSelectValue",
                    name: "Paused",
                    color: "ORANGE",
                    field: { name: "Status" },
                  },
                  {
                    __typename: "ProjectV2ItemFieldSingleSelectValue",
                    name: "Looking for members & collaboration",
                    color: "GREEN",
                    field: { name: "Openness" },
                  },
                  {
                    __typename: "ProjectV2ItemFieldMultiSelectValue",
                    value: "Software, Hardware",
                    options: [
                      { id: "a1", name: "Software", color: "GRAY" },
                      { id: "a2", name: "Hardware", color: "GRAY" },
                    ],
                    field: { name: "Main area" },
                  },
                  {
                    __typename: "ProjectV2ItemFieldSingleSelectValue",
                    name: "Intermediate",
                    color: "GRAY",
                    field: { name: "Level" },
                  },
                  {
                    __typename: "ProjectV2ItemFieldDateValue",
                    date: "2027-02-15",
                    field: { name: "Return Date" },
                  },
                  {
                    __typename: "ProjectV2ItemFieldTextValue",
                    text: "@leaduser",
                    field: { name: "Lead" },
                  },
                  {
                    __typename: "ProjectV2ItemFieldTextValue",
                    text: "https://github.com/CoreDumped-ETSISI/rover",
                    field: { name: "Repo Link" },
                  },
                ],
              },
              content: {
                __typename: "Issue",
                id: "I_1",
                number: 7,
                title: "Project: Rover UPM",
                url: "https://github.com/CoreDumped-ETSISI/project-catalog/issues/7",
                state: "OPEN",
                body: "### Description\n\nRover autónomo.\n\n### Technologies\n\nROS2, Python\n",
                createdAt: "2026-11-26T11:00:00Z",
                updatedAt: "2026-11-26T12:00:00Z",
                author: { login: "authoruser" },
                repository: {
                  nameWithOwner: "CoreDumped-ETSISI/project-catalog",
                  url: "https://github.com/CoreDumped-ETSISI/project-catalog",
                },
                labels: {
                  nodes: [
                    { id: "l1", name: "approved", color: "0e8a16", description: "" },
                    { id: "l2", name: "ROS2", color: "22314e", description: "" },
                    { id: "l3", name: "C++", color: "f34b7d", description: "" },
                  ],
                },
                assignees: {
                  nodes: [
                    {
                      login: "leaduser",
                      name: "Lead User",
                      avatarUrl: "https://avatars.githubusercontent.com/u/1?v=4",
                      url: "https://github.com/leaduser",
                    },
                  ],
                },
              },
            },
            {
              id: "PVTI_2",
              type: "ISSUE",
              isArchived: true,
              fieldValues: { nodes: [] },
              content: { __typename: "Issue", title: "Archived item" },
            },
          ],
        },
      },
    },
  };

  const normalized = normalizeProjectCatalog(sampleResponse, "2026-11-26T12:30:00Z");

  assert.equal(normalized.items.length, 1);
  const [item] = normalized.items;
  assert.equal(item.title, "Rover UPM");
  assert.equal(item.number, 7);
  assert.equal(item.status, "Paused");
  assert.equal(item.openness, "Looking for members & collaboration");
  assert.deepEqual(item.areas, ["Software", "Hardware"]);
  assert.equal(item.level, "Intermediate");
  assert.equal(item.returnDate, "2027-02-15");
  assert.equal(item.lead, "@leaduser");
  assert.equal(item.repoUrl, "https://github.com/CoreDumped-ETSISI/rover");
  assert.deepEqual(item.technologies, ["ROS2", "C++", "Python"]);
  assert.equal(item.labels.length, 2);
  assert.equal(item.details.description, "Rover autónomo.");
  assert.equal(normalized.project.fields[1].options.length, 2);
});
