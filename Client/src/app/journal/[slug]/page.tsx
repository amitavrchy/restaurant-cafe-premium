"use client";

import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { use } from "react";
import { fetchJournalPost } from "@/lib/api";

export default function JournalPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
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
        <Link href="/journal" className="text-eyebrow hover:text-ink">
          ← Journal
        </Link>
        <p className="mt-8 text-terracotta" role="alert">
          Post not found.
        </p>
      </div>
    );
  }

  return (
    <article className="container-page section-pad">
      <Link href="/journal" className="text-eyebrow hover:text-ink">
        ← Journal
      </Link>
      <h1 className="heading-display mt-6 max-w-3xl">{post.title}</h1>
      {post.coverImage ? (
        <div className="relative mt-10 aspect-[16/9] overflow-hidden bg-line">
          <Image
            src={post.coverImage}
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        </div>
      ) : null}
      <p className="text-body-lg mt-10 max-w-2xl whitespace-pre-line">
        {post.body}
      </p>
    </article>
  );
}
