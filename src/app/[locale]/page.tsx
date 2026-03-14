import { Hero } from "@/components/Hero";
import { SectionSeparator } from "@/components/SectionSeparator";
import { Method } from "@/components/Method";
import { WhyNCP } from "@/components/WhyNCP";
import { About } from "@/components/About";
import { Programs } from "@/components/Programs";
import { Booking } from "@/components/Booking";
import { Contact } from "@/components/Contact";

export default function HomePage() {
  return (
    <>
      <Hero />
      <SectionSeparator />
      <Method />
      <SectionSeparator />
      <WhyNCP />
      <About />
      <Programs />
      <Booking />
      <Contact />
    </>
  );
}
