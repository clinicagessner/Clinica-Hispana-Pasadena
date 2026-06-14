import type { Metadata } from "next";
import { getLocale, getTranslations, setRequestLocale } from "next-intl/server";
import { Reveal } from "@/components/animations/reveal";
import { BlogCard } from "@/components/blog/blog-card";
import { FaqSection } from "@/components/sections/faq-section";
import { JsonLdBreadcrumb, JsonLdCollectionPage } from "@/components/seo/json-ld";
import { HOME_FAQS } from "@/lib/home-faqs";
import { getAllPosts } from "@/lib/blog";
import { absoluteUrl, buildAlternates } from "@/lib/seo";
import { routing } from "@/i18n/routing";
import type { Locale } from "@/types";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "BlogPage" });
  return {
    title: t("title"),
    description: t("subtitle"),
    alternates: buildAlternates("/blog", locale as Locale),
  };
}

export default async function BlogIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  const loc = (await getLocale()) as Locale;
  const t = await getTranslations("BlogPage");
  const posts = getAllPosts(loc);

  return (
    <>
      <JsonLdBreadcrumb
        items={[
          { name: "Home", url: absoluteUrl("/", loc) },
          { name: t("title"), url: absoluteUrl("/blog", loc) },
        ]}
      />
      <JsonLdCollectionPage
        name={t("title")}
        description={t("subtitle")}
        url={absoluteUrl("/blog", loc)}
        items={posts.map((p) => ({
          name: p.title,
          url: absoluteUrl(`/blog/${p.slug}`, loc),
        }))}
      />

      <section className="relative overflow-hidden bg-gradient-to-b from-cloud to-sky-bg py-16 lg:py-20">
        <div
          aria-hidden
          className="pointer-events-none absolute -left-24 -top-16 h-80 w-80 rounded-full bg-blue-soft/15 blur-3xl"
        />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-teal-deep">
              Clínica Hispana Nueva Salud Pasadena
            </p>
            <h1 className="mt-3 max-w-3xl font-heading text-4xl font-extrabold leading-tight tracking-tight text-slate-dark sm:text-5xl">
              {t("title")}
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-primary">
              {t("subtitle")}
            </p>
            <div className="mt-5 h-0.5 w-24 rounded-full bg-gradient-to-r from-blue-primary to-teal" />
          </Reveal>
        </div>
      </section>

      <section className="bg-cloud py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {posts.length === 0 ? (
            <p className="text-center text-slate-muted">{t("empty")}</p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post, i) => (
                <Reveal key={post.slug} delay={(i % 3) * 70}>
                  <BlogCard post={post} className="h-full" />
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      <FaqSection items={HOME_FAQS} className="bg-sky-bg" />
    </>
  );
}
