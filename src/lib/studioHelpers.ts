/**
 * Studio Utilities & Curated Prompt Templates
 */

export interface PromptTemplate {
  id: string;
  icon: string;
  title: string;
  category: string;
  prompt: string;
}

export const CURATED_TEMPLATES: PromptTemplate[] = [
  {
    id: "saas",
    icon: "🚀",
    title: "AI SaaS Platform",
    category: "Software / Tech",
    prompt:
      "A high-converting SaaS landing page for an autonomous AI developer agent. Modern dark mode (slate-950) with vibrant purple/indigo gradients, sticky glassmorphic navbar with mobile drawer, hero section with animated metric badges, a 4-card bento grid feature matrix with hover glow, interactive pricing calculator with annual discount toggle, client testimonials carousel with avatars, expandable FAQ accordion, and lead capture footer.",
  },
  {
    id: "portfolio",
    icon: "🎨",
    title: "Creative Director Portfolio",
    category: "Design / Creative",
    prompt:
      "An ultra-clean minimalist portfolio for an award-winning UI/UX Designer & Creative Director. Dark slate aesthetic with electric cyan accents, sticky header with smooth scrolling links, bold hero with career highlights, interactive filterable project showcase grid, experience timeline with company logos, client recommendations with star ratings, and an interactive contact modal.",
  },
  {
    id: "restaurant",
    icon: "🍽️",
    title: "Artisanal Bistro & Bar",
    category: "Hospitality / Food",
    prompt:
      "A luxury restaurant and cocktail lounge website. Rich dark espresso and warm amber gold palette, hero section with atmospheric photography and 'Reserve a Table' CTA modal, interactive filterable food & drinks menu with dietary badges, chef's story section with quote, customer review cards, location & opening hours cards, and reservation form with simulated confirmation toast.",
  },
  {
    id: "ecommerce",
    icon: "🛍️",
    title: "Streetwear Brand Drop",
    category: "E-Commerce / Fashion",
    prompt:
      "A sleek, high-energy product launch landing page for an exclusive futuristic streetwear and sneaker drop. High-contrast typography, countdown timer banner, interactive product showcase with color swatch selectors and size selector buttons, technical specs bento grid, customer review gallery, and an email VIP drop notification form with instant feedback.",
  },
  {
    id: "docs",
    icon: "⚡",
    title: "Developer API & Docs",
    category: "Developer Tools",
    prompt:
      "A modern developer documentation portal for a cloud database API. Dark theme with emerald green accents, sticky two-column layout with left navigation sidebar and right syntax-highlighted code snippets, quick start guide, interactive API endpoint parameter table, response preview tabs, and SDK install cards.",
  },
];

/**
 * Converts standard HTML string into clean React JSX format
 */
export const convertHtmlToJsx = (html: string): string => {
  if (!html) return "";

  // Extract body content if present, or use full html
  let jsx = html;
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  if (bodyMatch && bodyMatch[1]) {
    jsx = bodyMatch[1].trim();
  }

  return (
    jsx
      // class -> className
      .replace(/\sclass=/g, " className=")
      // for -> htmlFor
      .replace(/\sfor=/g, " htmlFor=")
      // tabindex -> tabIndex
      .replace(/\stabindex=/g, " tabIndex=")
      // autocomplete -> autoComplete
      .replace(/\sautocomplete=/g, " autoComplete=")
      // onclick -> onClick
      .replace(/\sonclick=/g, " onClick=")
      // onsubmit -> onSubmit
      .replace(/\sonsubmit=/g, " onSubmit=")
      // Close unclosed void tags
      .replace(/<(img|input|br|hr|meta|link)([^>]*?)(?<!\/)>/gi, "<$1$2 />")
      // Remove HTML comments or convert to JSX comments
      .replace(/<!--([\s\S]*?)-->/g, "{/* $1 */}")
  );
};
