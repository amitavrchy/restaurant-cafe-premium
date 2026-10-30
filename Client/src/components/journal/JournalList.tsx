"use client";

import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { fetchJournal } from "@/lib/api";

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
            <div className="dish-zoom relative aspect-[4/5] overflow-hidden bg-line">
              {post.coverImage ? (
                <Image
                  src={post.coverImage}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              ) : null}
            </div>
            <h2 className="heading-md mt-5 group-hover:text-olive">
              {post.title}
            </h2>
            <p className="mt-2 line-clamp-3 text-body">{post.body}</p>
          </Link>
        </Reveal>
      ))}
    </div>
  );
}
