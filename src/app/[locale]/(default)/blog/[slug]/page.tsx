import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getLocale, getTranslations, setRequestLocale } from "next-intl/server";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ArrowLeft, CalendarDays, Clock, Phone, User } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { BlogCard } from "@/components/blog/blog-card";
import { FaqSection } from "@/components/sections/faq-section";
import { JsonLdBreadcrumb } from "@/components/seo/json-ld";
import { JsonLdBlogPosting } from "@/components/seo/json-ld-blog";
import { getAllPosts, getPost, getPostSlugs } from "@/lib/blog";
import { HOME_FAQS } from "@/lib/home-faqs";
import { CONTACT_INFO } from "@/lib/constants";
import { formatDate } from "@/lib/utils";
import { absoluteUrl, buildAlternates } from "@/lib/seo";
import { ctaButton } from "@/lib/button-styles";
import { cn } from "@/lib/utils";
import { routing } from "@/i18n/routing";
import type { Locale } from "@/types";

export function generateStaticParams() {
  const slugs = getPostSlugs();
  return routing.locales.flatMap((locale) =>
    slugs.map((slug) => ({ locale, slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = getPost(slug, locale as Locale);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    alternates: buildAlternates(`/blog/${slug}`, locale as Locale),
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      publishedTime: post.date,
      url: absoluteUrl(`/blog/${slug}`, locale as Locale),
      images: [{ url: post.cover, alt: post.coverAlt }],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale as Locale);
  const loc = (await getLocale()) as Locale;

  const post = getPost(slug, loc);
  if (!post) notFound();

  const t = await getTranslations("BlogPost");
  const url = absoluteUrl(`/blog/${slug}`, loc);
  const related = getAllPosts(loc)
    .filter((p) => p.slug !== slug)
    .slice(0, 3);

  return (
    <>
      <JsonLdBreadcrumb
        items={[
          { name: "Home", url: absoluteUrl("/", loc) },
          { name: "Blog", url: absoluteUrl("/blog", loc) },
          { name: post.title, url },
        ]}
      />
      <JsonLdBlogPosting post={post} url={url} locale={loc} />

      {/* Cabecera editorial del post */}
      <header className="relative isolate overflow-hidden bg-sand-bg py-14 lg:py-16">
        <div
          aria-hidden
          className="cross-pattern pointer-events-none absolute -right-20 -top-16 -z-10 h-96 w-96 text-blue-deep/5"
        />
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-muted transition-colors hover:text-blue-dark"
          >
            <ArrowLeft className="h-4 w-4" />
            {t("backToBlog")}
          </Link>

          <span className="eyebrow mt-6">{post.category}</span>
          <h1 className="mt-4 font-heading text-4xl font-black leading-[1.05] tracking-tight text-ink sm:text-5xl">
            {post.title}
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-slate-muted">
            {post.description}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-medium text-slate-primary">
            <span className="inline-flex items-center gap-1.5">
              <User className="h-4 w-4 text-teal-deep" />
              {post.author}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays className="h-4 w-4 text-teal-deep" />
              {formatDate(post.date, loc)}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-teal-deep" />
              {post.readingMinutes} min
            </span>
          </div>
        </div>
      </header>

      {/* Contenido */}
      <section className="bg-white py-14 lg:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          {/* Portada enmarcada (si existe) */}
          {post.hasCover && (
            <div className="mb-10 overflow-hidden rounded-3xl border border-blue-deep/10 shadow-xl shadow-blue-deep/10">
              <Image
                src={post.cover}
                alt={post.coverAlt || post.title}
                width={1360}
                height={765}
                priority
                sizes="(max-width: 1024px) 100vw, 768px"
                className="aspect-video w-full object-cover"
              />
            </div>
          )}

          <article
            className={cn(
              "max-w-none space-y-5",
              "[&_h2]:mt-10 [&_h2]:font-heading [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-ink sm:[&_h2]:text-3xl",
              "[&_h3]:mt-7 [&_h3]:font-heading [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-ink",
              "[&_p]:text-lg [&_p]:leading-relaxed [&_p]:text-slate-primary",
              "[&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5 [&_li]:text-lg [&_li]:text-slate-primary [&_li]:leading-relaxed",
              "[&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:pl-5",
              "[&_strong]:font-semibold [&_strong]:text-ink",
              "[&_a]:font-medium [&_a]:text-blue-dark [&_a]:underline [&_a]:underline-offset-2",
              "[&_blockquote]:border-l-4 [&_blockquote]:border-red-accent [&_blockquote]:pl-5 [&_blockquote]:text-slate-muted [&_blockquote]:italic",
            )}
          >
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {post.content}
            </ReactMarkdown>
          </article>

          {/* CTA navy */}
          <div className="relative isolate mt-12 overflow-hidden rounded-3xl bg-blue-deep p-8 text-center text-sky-bg shadow-xl sm:p-10">
            <div
              aria-hidden
              className="cross-pattern pointer-events-none absolute inset-0 -z-10 text-white/5"
            />
            <h2 className="font-heading text-2xl font-bold text-white">
              {t("ctaTitle")}
            </h2>
            <p className="mx-auto mt-2 max-w-md text-sky-bg/85">{t("ctaBody")}</p>
            <a
              href={`tel:${CONTACT_INFO.phone}`}
              className={cn(ctaButton({ variant: "red", size: "lg" }), "mt-6")}
            >
              <Phone className="h-5 w-5" />
              {t("ctaCall")}
            </a>
          </div>
        </div>
      </section>

      {/* Relacionados */}
      {related.length > 0 && (
        <section className="bg-sand-bg py-14 lg:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="font-heading text-3xl font-black tracking-tight text-ink">
              {t("relatedTitle")}
            </h2>
            <div className="mt-8 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <BlogCard key={p.slug} post={p} className="h-full" />
              ))}
            </div>
          </div>
        </section>
      )}

      <FaqSection items={HOME_FAQS} className="bg-white" />
    </>
  );
}
