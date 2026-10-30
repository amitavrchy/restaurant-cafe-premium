"use client";

import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { fetchJournal } from "@/lib/api";

function excerpt(body: string) {
  const first = body.split(/\n\n+/)[0] ?? body;
  return first.length > 140 ? `${first.slice(0, 140).trim()}…` : first;
}

export function JournalList() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["journal"],
    queryFn: fetchJournal,
  });

  if (isLoading) {
    return <p className="mt-12 text-muted">Loading journal…</p>;
  }

  if (isError) {
    return (
      <p className="mt-12 text-terracotta" role="alert">
        Journal unavailable — start the API to load posts.
      </p>
    );
  }

  return (
    <div className="mt-14 grid gap-10 md:grid-cols-3">
      {(data ?? []).map((post, i) => (
        <Reveal key={post.id} delay={i * 0.08}>
          <Link href={`/journal/${post.slug}`} className="group block">
            <div className="media-frame dish-zoom relative aspect-[4/3]">
              {post.coverImage ? (
                <Image
                  src={post.coverImage}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 90vw, 30vw"
                />
              ) : null}
            </div>
            <p className="text-eyebrow mt-5">Journal</p>
            <h2 className="heading-md mt-2 group-hover:text-olive">
              {post.title}
            </h2>
            <p className="mt-2 line-clamp-3 text-body">{excerpt(post.body)}</p>
            <span className="text-crumb mt-4 inline-block">Read note →</span>
          </Link>
        </Reveal>
      ))}
    </div>
  );
}
