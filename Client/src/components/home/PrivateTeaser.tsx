import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";

export function PrivateTeaser() {
  return (
    <section className="section-pad">
      <div className="container-wide grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
        <Reveal>
          <div className="media-frame relative mx-auto aspect-[4/3] w-full max-w-xl lg:mx-0 lg:max-w-none">
            <Image
              src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1100&q=80"
              alt="Private dining salon"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 90vw, 40vw"
            />
          </div>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="text-eyebrow">Private dining</p>
          <h2 className="heading-xl mt-3">
            A room for celebrations composed in quiet luxury
          </h2>
          <p className="text-body-lg mt-5 max-w-md">
            The Salon hosts eight to twenty-four guests — tasting menus, wine
            flights, and service paced to your evening.
          </p>
          <Link href="/private-dining" className="btn btn-ink mt-8">
            Plan an event
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
