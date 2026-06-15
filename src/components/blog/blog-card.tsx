import Image from "next/image";
import { ArrowRight, CalendarDays, Clock, Newspaper } from "lucide-react";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { formatDate } from "@/lib/utils";
import { cn } from "@/lib/utils";
import type { BlogPost, Locale } from "@/types";

export function BlogCard({
  post,
  className,
}: {
  post: BlogPost;
  className?: string;
}) {
  const locale = useLocale() as Locale;

  return (
    <Link
      href={`/blog/${post.slug}`}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl border border-blue-deep/10 bg-white transition-all duration-300 hover:-translate-y-1.5 hover:border-red-accent/40 hover:shadow-[0_18px_40px_-22px_rgba(0,0,0,0.35)]",
        className,
      )}
    >
      {/* Accent rail revealed on hover */}
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 z-10 h-1 origin-left scale-x-0 bg-red-accent transition-transform duration-300 group-hover:scale-x-100"
      />

      {/* Cover: foto real si existe, si no composición CSS */}
      <div className="relative aspect-video overflow-hidden rounded-2xl bg-sand-deep">
        {post.hasCover ? (
          <>
            <Image
              src={post.cover}
              alt={post.coverAlt || post.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-linear-to-t from-ink/55 via-ink/5 to-transparent"
            />
          </>
        ) : (
          <div
            aria-hidden
            className="cross-pattern absolute inset-0 flex items-center justify-center bg-blue-soft/40 text-blue-deep/30"
          >
            <Newspaper className="h-10 w-10" />
          </div>
        )}
        <span className="absolute bottom-3 left-3 rounded-md border border-white/30 bg-ink/55 px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-sm">
          {post.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-4 text-[0.7rem] font-medium uppercase tracking-[0.14em] text-slate-muted">
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays className="h-3.5 w-3.5 text-teal" />
            {formatDate(post.date, locale)}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5 text-teal" />
            {post.readingMinutes} min
          </span>
        </div>

        <h3 className="mt-3 font-heading text-xl font-semibold leading-snug text-slate-dark transition-colors group-hover:text-red-dark">
          {post.title}
        </h3>
        <p className="mt-2.5 flex-1 font-sans text-sm leading-relaxed text-slate-primary">
          {post.description}
        </p>

        <span className="mt-5 inline-flex items-center gap-1.5 font-sans text-sm font-semibold text-red-accent">
          {locale === "en" ? "Read article" : "Leer artículo"}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
