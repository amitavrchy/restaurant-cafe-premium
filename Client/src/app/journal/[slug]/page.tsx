"use client";

import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { use } from "react";
import { fetchJournalPost } from "@/lib/api";
import { openReserve } from "@/features/ui/uiSlice";
import { useAppDispatch } from "@/store/hooks";

export default function JournalPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const dispatch = useAppDispatch();
  const { data: post, isLoading, isError } = useQuery({
    queryKey: ["journal", slug],
    queryFn: () => fetchJournalPost(slug),
  });

  if (isLoading) {
    return (
      <div className="container-page section-pad">
        <p className="text-muted">Loading…</p>
      </div>
    );
  }

  if (isError || !post) {
    return (
      <div className="container-page section-pad">
        <Link href="/journal" className="text-crumb">
          ← Back to journal
        </Link>
        <p className="mt-8 text-terracotta" role="alert">
          Post not found.
        </p>
      </div>
    );
  }

  const paragraphs = post.body
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean);
  const [lead, ...rest] = paragraphs;
  const mid = Math.max(1, Math.floor(rest.length / 2));
  const beforeQuote = rest.slice(0, mid);
  const afterQuote = rest.slice(mid);
  const published = post.publishedAt
    ? format(new Date(post.publishedAt), "MMMM d, yyyy")
    : null;

  return (
    <article className="pb-24">
      <div className="container-page section-pad pb-8 pt-14">
        <nav aria-label="Breadcrumb" className="breadcrumb-trail">
          <Link href="/" className="text-crumb">
            Home
          </Link>
          <span className="breadcrumb-sep" aria-hidden>
            /
          </span>
          <Link href="/journal" className="text-crumb">
            Journal
          </Link>
          <span className="breadcrumb-sep" aria-hidden>
            /
          </span>
          <span className="text-crumb !bg-terracotta">
            {post.title}
          </span>
        </nav>

        <p className="text-eyebrow mt-10">From the house</p>
        <h1 className="heading-display mt-4 max-w-3xl">{post.title}</h1>
        <div className="mt-5 flex flex-wrap items-center gap-3 text-[var(--text-sm)] text-muted">
          <span>Maison Verdant</span>
          {published ? (
            <>
              <span className="text-line">·</span>
              <time dateTime={post.publishedAt ?? undefined}>{published}</time>
            </>
          ) : null}
        </div>
      </div>

      {post.coverImage ? (
        <div className="container-wide">
          <div className="media-frame relative aspect-[16/9] max-h-[480px] w-full md:aspect-[2.2/1]">
            <Image
              src={post.coverImage}
              alt=""
              fill
              className="object-cover"
              sizes="90vw"
              priority
            />
          </div>
        </div>
      ) : null}

      <div className="container-page mt-12 md:mt-16">
        <div className="mx-auto max-w-2xl">
          {lead ? (
            <p className="font-display text-[clamp(1.35rem,2.4vw,1.75rem)] leading-[1.45] text-ink">
              {lead}
            </p>
          ) : null}

          <div className="prose-journal mt-8 space-y-6">
            {beforeQuote.map((p) => (
              <p
                key={p.slice(0, 32)}
                className="text-[var(--text-lg)] leading-[1.75] text-muted"
              >
                {p}
              </p>
            ))}
          </div>

          {afterQuote.length > 0 ? (
            <blockquote className="my-12 border-l-2 border-gold pl-6 md:pl-8">
              <p className="font-display text-[clamp(1.4rem,2.6vw,1.85rem)] leading-snug text-olive">
                An evening composed like a tasting menu — paced, seasonal, and
                meant to be shared.
              </p>
            </blockquote>
          ) : null}

          <div className="space-y-6">
            {afterQuote.map((p) => (
              <p
                key={p.slice(0, 32)}
                className="text-[var(--text-lg)] leading-[1.75] text-muted"
              >
                {p}
              </p>
            ))}
          </div>

          <div className="mt-14 flex flex-wrap items-center gap-3 border-t border-line pt-10">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => dispatch(openReserve())}
            >
              Reserve a table
            </button>
            <Link href="/journal" className="btn btn-ghost">
              More notes
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
