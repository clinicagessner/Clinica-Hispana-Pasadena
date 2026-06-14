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
        "group flex flex-col overflow-hidden rounded-2xl border border-blue-light bg-white transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-primary/5",
        className,
      )}
    >
      {/* Cover: foto real si existe, si no composición CSS */}
      <div className="relative flex aspect-[16/9] items-end overflow-hidden bg-gradient-to-br from-blue-primary via-blue-dark to-blue-deep p-5">
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
              className="absolute inset-0 bg-gradient-to-t from-blue-deep/80 via-blue-deep/20 to-transparent"
            />
          </>
        ) : (
          <>
            <div
              aria-hidden
              className="absolute -right-6 -top-6 h-28 w-28 rounded-full bg-white/10 blur-xl"
            />
            <Newspaper
              aria-hidden
              className="absolute right-4 top-4 h-8 w-8 text-white/30"
            />
          </>
        )}
        <span className="relative rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-white backdrop-blur">
          {post.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-4 text-xs text-slate-muted">
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays className="h-3.5 w-3.5" />
            {formatDate(post.date, locale)}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" />
            {post.readingMinutes} min
          </span>
        </div>

        <h3 className="mt-3 font-heading text-lg font-bold leading-snug text-slate-dark group-hover:text-blue-dark">
          {post.title}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-muted">
          {post.description}
        </p>

        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-blue-primary">
          {locale === "en" ? "Read article" : "Leer artículo"}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
