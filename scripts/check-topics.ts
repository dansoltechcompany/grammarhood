import { checkTopics } from "../src/lib/quality";

const issues = checkTopics();
const errors = issues.filter((issue) => issue.level === "error");
const warnings = issues.filter((issue) => issue.level === "warn");

for (const issue of issues) {
  const tag = issue.level === "error" ? "ERROR" : "WARN";
  console.log(`[${tag}] ${issue.message}`);
}

if (errors.length === 0) {
  console.log(
    `\nOK — mechanical checks passed (${warnings.length} warning(s)). Unique idea vs sisters is still the human skim (ruleReviewed).`,
  );
  process.exit(0);
}

console.error(`\nFailed with ${errors.length} error(s). Topics cannot go live until these pass.`);
process.exit(1);
