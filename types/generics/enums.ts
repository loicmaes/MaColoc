export type TMaritalStatus = "single" | "relationship";
export type TSubscriptionPlan = "free" | "premium";
export type TGender = "man" | "woman" | "other";
export type TFrequency = "regularly" | "socially" | "never";
export type TJobStatus = "permanent" | "fixedTerm" | "student" | "selfEmployed" | "unemployed";
export type TDiet = "vegetarian" | "vegan" | "flexitarian" | "omnivore" | "carnivore";
export type TDayMoment = "day" | "evening" | "night" | "weekend";
export type THistoryStatus = "new" | "experienced";
export type TLanguage = "french" | "english" | "german" | "italian" | "spanish" | "portuguese" | "russian" | "polish" | "indian" | "chinese" | "japanese" | "arabic" | "algerian";

export const maritalStatusRef: TMaritalStatus[] = [
  "single",
  "relationship",
];
export const frequenciesRef: TFrequency[] = [
  "regularly",
  "socially",
  "never",
];
export const dietsRef: TDiet[] = [
  "vegetarian",
  "vegan",
  "flexitarian",
  "omnivore",
  "carnivore",
];
export const historyStatusRef: THistoryStatus[] = [
  "new",
  "experienced",
];
export const availabilitiesRef: TDayMoment[] = [
  "day",
  "evening",
  "night",
  "weekend",
];
export const jobStatusRef: TJobStatus[] = [
  "permanent",
  "fixedTerm",
  "student",
  "selfEmployed",
  "unemployed",
];
export const languagesRef: TLanguage[] = [
  "french",
  "english",
  "german",
  "italian",
  "spanish",
  "portuguese",
  "russian",
  "polish",
  "indian",
  "chinese",
  "japanese",
  "arabic",
  "algerian",
];
