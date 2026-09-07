export const SITE_NAME = "Grammarhood";
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://grammarhood.com";
export const SITE_TAGLINE = "Ten-minute English grammar practice for adult learners.";
export const COMPANY_NAME = "Dansol Tech Pvt Ltd";
export const CONTACT_EMAIL = "info@dansoltech.com";

export const FOOTER_NAV = {
  learn: [
    { href: "/practice", label: "Practice" },
    { href: "/grammar", label: "Topics" },
  ],
  site: [
    { href: "/contact", label: "Contact" },
    { href: "/privacy", label: "Privacy" },
    { href: "/terms", label: "Terms" },
  ],
} as const;
