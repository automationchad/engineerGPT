interface DB {
  label: string;
  value: string;
  avatar: string;
}

export const defaultSettings = {
  model: "gpt-4o-mini",
  temperature: 80,
  relevance: 70,
  styleExaggeration: 20,
};

export const defaultDB: DB = {
  label: "sai360 - prod",
  value: "11279",
  avatar: "1",
};
