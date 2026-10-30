import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { fetchJournal, fetchJournalPost } from "@/lib/api";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  try {
    const posts = await fetchJournal();
    return posts.map((p) => ({ slug: p.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const post = await fetchJournalPost(slug);
    return { title: post.title, description: post.body.slice(0, 140) };
  } catch {
    return { title: "Journal" };
  }
}

export default async function JournalPostPage({ params }: Props) {
  const { slug } = await params;
  let post;
  try {
    post = await fetchJournalPost(slug);
  } catch {
    notFound();
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
