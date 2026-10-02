import sitemap from "../src/app/sitemap";
import { liveTopics } from "../src/content/topics";
import { canonicalRedirectTarget } from "../src/lib/canonical-host";
import { SITE_URL } from "../src/lib/site";

const failures: string[] = [];

function expect(condition: boolean, message: string) {
  if (!condition) failures.push(message);
}

const home = canonicalRedirectTarget({
  host: "grammarhood.com",
  protocol: "http",
  pathname: "/",
  search: "",
});
expect(home === "https://grammarhood.com", `http apex should redirect, got ${home}`);

const www = canonicalRedirectTarget({
  host: "www.grammarhood.com",
  protocol: "https",
  pathname: "/grammar/affect-vs-effect",
  search: "?utm=1",
});
expect(
  www === "https://grammarhood.com/grammar/affect-vs-effect?utm=1",
  `www should fold to apex, got ${www}`,
);

const already = canonicalRedirectTarget({
  host: "grammarhood.com",
  protocol: "https",
  pathname: "/grammar",
});
expect(already === null, "https apex must not redirect");

const local = canonicalRedirectTarget({
  host: "localhost:3000",
  protocol: "http",
  pathname: "/",
});
expect(local === null, "local dev must not redirect");

const preview = canonicalRedirectTarget({
  host: "grammarhood.pages.dev",
  protocol: "https",
  pathname: "/",
});
expect(preview === null, "unrelated hosts must not redirect");

const first = JSON.stringify(sitemap());
const second = JSON.stringify(sitemap());
expect(first === second, "sitemap must be stable across calls");

const urls = sitemap().map((entry) => entry.url);
expect(new Set(urls).size === urls.length, "sitemap URLs must be unique");
expect(urls.every((url) => url.startsWith(`${SITE_URL}/`) || url === SITE_URL), "sitemap must stay on the apex");
expect(!urls.some((url) => url.includes("www.")), "sitemap must not list www");
expect(!urls.some((url) => url.startsWith("http://")), "sitemap must be https");
expect(!urls.includes(`${SITE_URL}/practice`), "practice is noindex and must stay out of the sitemap");
expect(!urls.includes(`${SITE_URL}/recap`), "recap is noindex and must stay out of the sitemap");

for (const topic of liveTopics()) {
  expect(urls.includes(`${SITE_URL}/grammar/${topic.id}`), `missing sitemap URL for ${topic.id}`);
}

expect(urls.includes(SITE_URL) || urls.includes(`${SITE_URL}/`), "homepage missing from sitemap");
expect(urls.includes(`${SITE_URL}/grammar`), "topic index missing from sitemap");

if (failures.length > 0) {
  for (const failure of failures) console.error(failure);
  process.exit(1);
}

console.log(`OK — canonical redirects and sitemap (${urls.length} URLs).`);
