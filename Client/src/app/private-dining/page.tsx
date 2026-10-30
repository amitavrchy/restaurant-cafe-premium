import type { Metadata } from "next";
import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { PrivateInquiryForm } from "@/components/private/PrivateInquiryForm";

export const metadata: Metadata = {
  title: "Private Dining",
  description: "Salon packages and private event inquiries at Maison Verdant.",
};

const packages = [
  {
    name: "Salon Lunch",
    detail: "Up to 12 guests · three courses · wine optional",
    price: "From €95 / guest",
  },
  {
    name: "Evening Tasting",
    detail: "Up to 24 guests · five courses · pairing available",
    price: "From €145 / guest",
  },
  {
    name: "Full Buyout",
    detail: "Dining room + salon · bespoke menu · dedicated brigade",
    price: "On request",
  },
];

export default function PrivateDiningPage() {
  return (
    <div>
      <section className="relative min-h-[55vh] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1550963211-0af174c8cb1b?w=1800&q=85"
          alt="Private salon"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-ink/50" />
        <div className="relative container-wide flex min-h-[55vh] items-end pb-14">
          <div className="max-w-2xl text-cream">
            <p className="text-eyebrow text-cream/70">Private dining</p>
            <h1 className="heading-display mt-4 text-cream">
              Celebrate without spectacle
            </h1>
          </div>
        </div>
      </section>

      <section className="container-wide section-pad grid gap-16 lg:grid-cols-2">
        <div>
          <Reveal>
            <p className="text-eyebrow">Packages</p>
            <h2 className="heading-xl mt-3">Composed for your table</h2>
          </Reveal>
          <ul className="mt-10 space-y-8">
            {packages.map((pkg, i) => (
              <Reveal key={pkg.name} delay={i * 0.08}>
                <li className="border-b border-line pb-8">
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="heading-md">{pkg.name}</h3>
                    <span className="font-mono-price text-[var(--text-sm)] text-muted">
                      {pkg.price}
                    </span>
                  </div>
                  <p className="mt-2 text-body">{pkg.detail}</p>
                </li>
              </Reveal>
            ))}
          </ul>
          <div className="mt-10 grid grid-cols-2 gap-3">
            {[
              "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=900&q=80",
              "https://images.unsplash.com/photo-1510817742738-060be7c38f3d?w=900&q=80",
            ].map((src) => (
              <div key={src} className="relative aspect-[4/5] overflow-hidden bg-line">
                <Image src={src} alt="" fill className="object-cover" sizes="40vw" />
              </div>
            ))}
          </div>
        </div>
        <Reveal delay={0.1}>
          <div className="border border-line bg-cream p-6 md:p-8 lg:sticky lg:top-28">
            <h2 className="heading-md">Inquire</h2>
            <p className="text-body mt-2 mb-8">
              Share a date and intention — we will compose a proposal.
            </p>
            <PrivateInquiryForm />
          </div>
        </Reveal>
      </section>
    </div>
  );
}
