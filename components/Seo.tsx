/**
 * SEO Component
 *
 * In Next.js App Router, metadata is handled declaratively via the `metadata`
 * and `viewport` exports in layout.tsx / page.tsx. This component is kept for
 * backward compatibility but renders nothing — all SEO is managed by Next.js
 * built-in metadata API.
 *
 * @see https://nextjs.org/docs/app/building-your-application/optimizing/metadata
 */

interface SeoProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
}

export default function Seo(_props: SeoProps) {
  // Metadata is handled by Next.js App Router metadata exports.
  // This component is a no-op kept for API compatibility.
  return null;
}
