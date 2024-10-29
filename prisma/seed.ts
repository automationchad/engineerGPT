import {
  PrismaClient,
  Prisma,
  user,
  team,
  project,
  section,
  conversion,
  ai_answer,
  entry,
  document,
  playground_history,
} from "@prisma/client";

const prisma = new PrismaClient();

const getTeams = (): Prisma.teamCreateInput[] => [
  {
    name: "Team A",
    loopioId: 1,
  },
];

const getUsers = (teams: team[]): Prisma.userCreateInput[] => [
  {
    name: "John Doe",
    loopioId: 1,
    email: "john.doe@example.com",
  },
  {
    name: "Jane Doe",
    loopioId: 2,
    email: "jane.doe@example.com",
    teams: {
      connect: {
        id: teams[0].id,
      },
    },
  },
];

const getProjects = (users: user[]): Prisma.projectCreateInput[] => [
  {
    name: "Project A",
    loopioId: 1,
    user: {
      connect: {
        id: users[0].id,
      },
    },
    dataSource: "loopio",
    knowledgeId: 11279,
  },
  {
    name: "Project B",
    loopioId: 2,
    user: {
      connect: {
        id: users[1].id,
      },
    },
    dataSource: "loopio",
    knowledgeId: 11280,
  },
];

const getSections = (projects: project[]): Prisma.sectionCreateInput[] => [
  {
    name: "Section A",
    project: {
      connect: {
        id: projects[0].id,
      },
    },
  },
];

const getEntries = (users: user[], sections: section[]): Prisma.entryCreateInput[] => [
  {
    query: "Entry A",
    loopioId: 1,
    answer: "This is the content for Entry A",
    assignee: {
      connect: {
        id: users[0].id,
      },
    },
    reviewer: {
      connect: {
        id: users[1].id,
      },
    },
    status: "PENDING",
    section: {
      connect: {
        id: sections[0].id,
      },
    },
  },
];

const getDocuments = (projects: project[]): Prisma.documentCreateInput[] => [
  {
    name: "Document A",
    filePath: "https://example.com/document.pdf",
    project: {
      connect: {
        id: projects[0].id,
      },
    },
  },
];

const getConversions = (projects: project[]): Prisma.conversionCreateInput[] => [
  {
    project: {
      connect: {
        id: projects[0].id,
      },
    },
    status: "PENDING",
    totalEntries: 10,
    completedEntries: 0,
    errorEntries: 0,
  },
];

const getAiAnswers = (conversions: conversion[], entries: entry[]): Prisma.ai_answerCreateInput[] => [
  {
    conversion: {
      connect: {
        id: conversions[0].id,
      },
    },
    content: "AI Answer A",
    status: "PENDING",
    entry: {
      connect: {
        id: entries[0].id,
      },
    },
  },
];

const getCommits = (projects: project[]): Prisma.commitCreateInput[] => [
  {
    name: "Commit A",
    project: {
      connect: {
        id: projects[0].id,
      },
    },
    loopioId: 1,
  },
];

const getPlaygroundHistory = (users: user[]): Prisma.playground_historyCreateInput[] => [
  {
    user: {
      connect: {
        id: users[0].id,
      },
    },
    query: "Query A",
    response: "Response A",
    settings: "Settings A",
  },
];

const main = async () => {
  const teams = await Promise.all(getTeams().map((team) => prisma.team.create({ data: team })));
  const users = await Promise.all(getUsers(teams).map((user) => prisma.user.create({ data: user })));

  const projects = await Promise.all(getProjects(users).map((project) => prisma.project.create({ data: project })));
  const sections = await Promise.all(getSections(projects).map((section) => prisma.section.create({ data: section })));
  const entries = await Promise.all(getEntries(users, sections).map((entry) => prisma.entry.create({ data: entry })));
  const documents = await Promise.all(
    getDocuments(projects).map((document) => prisma.document.create({ data: document }))
  );
  const playgroundHistory = await Promise.all(
    getPlaygroundHistory(users).map((playgroundHistory) =>
      prisma.playground_history.create({ data: playgroundHistory })
    )
  );
  const conversions = await Promise.all(
    getConversions(projects).map((conversion) => prisma.conversion.create({ data: conversion }))
  );
  const aiAnswers = await Promise.all(
    getAiAnswers(conversions, entries).map((aiAnswer) => prisma.ai_answer.create({ data: aiAnswer }))
  );
  const commits = await Promise.all(getCommits(projects).map((commit) => prisma.commit.create({ data: commit })));
  console.log("Seeding completed");
};

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
