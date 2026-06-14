import { SITE_CONFIG } from "@/lib/constants";
import type { BlogPost, Locale } from "@/types";

function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function JsonLdBlogPosting({
  post,
  url,
  locale,
}: {
  post: BlogPost;
  url: string;
  locale: Locale;
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: post.title,
        description: post.description,
        datePublished: post.date,
        dateModified: post.date,
        inLanguage: locale,
        keywords: post.keywords?.join(", "),
        image: `${SITE_CONFIG.baseUrl}${post.cover}`,
        mainEntityOfPage: { "@type": "WebPage", "@id": url },
        author: { "@type": "Organization", name: post.author },
        publisher: {
          "@type": "Organization",
          name: SITE_CONFIG.name,
          logo: {
            "@type": "ImageObject",
            url: `${SITE_CONFIG.baseUrl}${SITE_CONFIG.logoUrl}`,
          },
        },
      }}
    />
  );
}
