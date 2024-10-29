import fs from "fs";

import data from "./loopio.json";

// Accepted stack IDs
const acceptedStackIds = [46013]; // Add your accepted IDs here

// Filter entries based on accepted stack IDs
const filteredEntries = data.items.filter((entry) => acceptedStackIds.includes(entry.location.stack.id));

// Prepare the output
let output = filteredEntries
  .map((entry) => {
    const questions = "QUESTIONS:\n" + entry.questions.map((q) => q.text).join("\n");
    const answer = "ANSWER:\n" + entry.answer.exportText;
    return `${questions}\n${answer}\n====\n`;
  })
  .join("\n");

// Write to a text file
fs.writeFile("output.txt", output, (err) => {
  if (err) {
    console.error("Error writing to file", err);
  } else {
    console.log("Output written to output.txt");
  }
});
