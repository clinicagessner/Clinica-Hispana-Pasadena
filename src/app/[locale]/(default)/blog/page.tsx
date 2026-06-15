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

      <section className="relative overflow-hidden border-b border-blue-deep/10 bg-sand-bg py-16 lg:py-24">
        <div
          aria-hidden
          className="cross-pattern pointer-events-none absolute inset-0 opacity-[0.35]"
        />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className="eyebrow text-teal-deep">
              Clínica Hispana Nueva Salud Pasadena
            </p>
            <h1 className="mt-4 max-w-3xl font-heading text-4xl font-semibold leading-[1.05] tracking-tight text-slate-dark sm:text-5xl lg:text-6xl">
              {t("title")}
            </h1>
            <p className="mt-5 max-w-2xl font-sans text-lg leading-relaxed text-slate-primary">
              {t("subtitle")}
            </p>
            <span className="mt-7 block h-px w-28 bg-red-accent" />
          </Reveal>
        </div>
      </section>

      <section className="bg-white py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {posts.length === 0 ? (
            <p className="text-center font-sans text-slate-muted">{t("empty")}</p>
          ) : (
            <>
              {/* Featured: primer post destacado a mayor ancho */}
              <Reveal>
                <BlogCard
                  post={posts[0]}
                  className="mx-auto max-w-4xl"
                />
              </Reveal>

              {posts.length > 1 && (
                <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {posts.slice(1).map((post, i) => (
                    <Reveal key={post.slug} delay={(i % 3) * 70}>
                      <BlogCard post={post} className="h-full" />
                    </Reveal>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>

      <FaqSection items={HOME_FAQS} />
    </>
  );
}
