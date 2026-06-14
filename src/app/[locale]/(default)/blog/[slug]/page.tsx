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

      {/* Hero del post (foto de portada si existe + overlay verde) */}
      <section className="relative isolate overflow-hidden bg-gradient-to-br from-blue-deep via-blue-dark to-blue-deep py-16 text-sky-bg lg:py-20">
        {post.hasCover ? (
          <>
            <Image
              src={post.cover}
              alt={post.coverAlt || post.title}
              fill
              priority
              sizes="100vw"
              className="absolute inset-0 -z-20 object-cover object-center"
            />
            <div
              aria-hidden
              className="absolute inset-0 -z-10 bg-gradient-to-r from-blue-deep via-blue-deep/85 to-blue-deep/40"
            />
            <div
              aria-hidden
              className="absolute inset-0 -z-10 bg-blue-deep/35"
            />
          </>
        ) : (
          <div
            aria-hidden
            className="pointer-events-none absolute -right-16 top-0 h-72 w-72 rounded-full bg-blue-primary/30 blur-3xl"
          />
        )}
        <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-sky-bg/70 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            {t("backToBlog")}
          </Link>

          <span className="mt-6 inline-block rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-white">
            {post.category}
          </span>
          <h1 className="mt-4 font-heading text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl">
            {post.title}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-sky-bg/80">
            {post.description}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-sky-bg/70">
            <span className="inline-flex items-center gap-1.5">
              <User className="h-4 w-4" />
              {post.author}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays className="h-4 w-4" />
              {formatDate(post.date, loc)}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              {post.readingMinutes} min
            </span>
          </div>
        </div>
      </section>

      {/* Contenido */}
      <section className="bg-cloud py-14 lg:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <article
            className={cn(
              "rounded-2xl border border-blue-light bg-white px-6 py-8 shadow-sm sm:px-10 sm:py-10",
              "space-y-4",
              "[&_h2]:mt-8 [&_h2]:font-heading [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-slate-dark",
              "[&_h3]:mt-6 [&_h3]:font-heading [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-slate-dark",
              "[&_p]:leading-relaxed [&_p]:text-slate-primary",
              "[&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-5 [&_li]:text-slate-primary [&_li]:leading-relaxed",
              "[&_ol]:list-decimal [&_ol]:space-y-1.5 [&_ol]:pl-5",
              "[&_strong]:font-semibold [&_strong]:text-slate-dark",
              "[&_a]:text-blue-primary [&_a]:underline [&_a]:underline-offset-2",
            )}
          >
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {post.content}
            </ReactMarkdown>
          </article>

          {/* CTA */}
          <div className="mt-8 rounded-2xl bg-gradient-to-br from-blue-primary to-blue-dark p-7 text-center text-white shadow-lg">
            <h2 className="font-heading text-xl font-bold">{t("ctaTitle")}</h2>
            <p className="mt-2 text-sm text-sky-bg/85">{t("ctaBody")}</p>
            <a
              href={`tel:${CONTACT_INFO.phone}`}
              className={cn(ctaButton({ variant: "gold", size: "lg" }), "mt-5")}
            >
              <Phone className="h-5 w-5" />
              {t("ctaCall")}
            </a>
          </div>
        </div>
      </section>

      {/* Relacionados */}
      {related.length > 0 && (
        <section className="bg-sky-bg py-14 lg:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="font-heading text-2xl font-bold text-slate-dark">
              {t("relatedTitle")}
            </h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <BlogCard key={p.slug} post={p} className="h-full" />
              ))}
            </div>
          </div>
        </section>
      )}

      <FaqSection items={HOME_FAQS} />
    </>
  );
}
