import { ArrowRight } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Reveal } from "@/components/animations/reveal";
import { BlogCard } from "@/components/blog/blog-card";
import { getRecentPosts } from "@/lib/blog";
import { ctaButton } from "@/lib/button-styles";
import { cn } from "@/lib/utils";
import type { Locale } from "@/types";

export async function BlogPreview() {
  const t = await getTranslations("BlogPreview");
  const locale = (await getLocale()) as Locale;
  const posts = getRecentPosts(locale, 3);

  if (posts.length === 0) return null;

  return (
    <section id="blog" className="relative overflow-hidden scroll-mt-24 bg-sand-bg py-20 lg:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-64 text-blue-deep/4 cross-pattern"
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 border-b border-blue-deep/10 pb-8 lg:flex-row lg:items-end lg:justify-between">
          <Reveal className="max-w-2xl">
            <p className="eyebrow">{t("eyebrow")}</p>
            <h2 className="mt-4 font-heading text-3xl font-semibold leading-[1.1] tracking-tight text-ink sm:text-4xl lg:text-[2.75rem]">
              <span className="ink-underline">{t("title")}</span>
            </h2>
            <p className="mt-5 max-w-xl font-sans text-base leading-relaxed text-slate-primary">
              {t("subtitle")}
            </p>
          </Reveal>
          <Reveal delay={120} className="shrink-0">
            <Link
              href="/blog"
              className={cn(ctaButton({ variant: "outline", size: "md" }))}
            >
              {t("cta")}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-7 md:grid-cols-3">
          {posts.map((post, i) => (
            <Reveal key={post.slug} delay={(i % 3) * 80} className="h-full">
              <BlogCard post={post} className="h-full" />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
