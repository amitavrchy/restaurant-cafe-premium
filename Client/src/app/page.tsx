import { ChefQuote } from "@/components/home/ChefQuote";
import { Hero } from "@/components/home/Hero";
import { HoursLocation } from "@/components/home/HoursLocation";
import { InstagramMosaic } from "@/components/home/InstagramMosaic";
import { Newsletter } from "@/components/home/Newsletter";
import { PrivateTeaser } from "@/components/home/PrivateTeaser";
import { SignatureCarousel } from "@/components/home/SignatureCarousel";

export default function Home() {
  return (
    <>
      <Hero />
      <SignatureCarousel />
      <ChefQuote />
      <HoursLocation />
      <PrivateTeaser />
      <InstagramMosaic />
      <Newsletter />
    </>
  );
}
