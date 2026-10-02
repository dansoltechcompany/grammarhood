/** Public host Google should index. www and http are aliases, not separate sites. */
export const APEX_HOST = "grammarhood.com";

const ALIASES = new Set([APEX_HOST, `www.${APEX_HOST}`]);

export type CanonicalRequest = {
  host: string;
  /** `http`, `https`, or a scheme with a trailing colon. */
  protocol: string;
  pathname: string;
  search?: string;
};

/**
 * Absolute https URL on the apex when this request is an alias.
 * Returns null when the request is already canonical, or when it is a local/preview host.
 */
export function canonicalRedirectTarget(request: CanonicalRequest): string | null {
  const host = request.host.split(":")[0].replace(/\.$/, "").toLowerCase();
  if (!ALIASES.has(host)) return null;

  const protocol = request.protocol.replace(":", "").split(",")[0].trim().toLowerCase();
  if (host === APEX_HOST && protocol === "https") return null;

  const pathname = request.pathname.startsWith("/") ? request.pathname : `/${request.pathname}`;
  const search = request.search ?? "";
  // Homepage canonical is https://grammarhood.com (no trailing slash), matching the tag Next emits.
  const path = pathname === "/" ? "" : pathname;
  return `https://${APEX_HOST}${path}${search}`;
}

/** Cloudflare's cf-visitor header is the client scheme, even when the worker URL was rewritten. */
export function schemeFromCfVisitor(header: string | null): string | null {
  if (!header) return null;
  try {
    const parsed = JSON.parse(header) as { scheme?: unknown };
    return typeof parsed.scheme === "string" ? parsed.scheme : null;
  } catch {
    return null;
  }
}
