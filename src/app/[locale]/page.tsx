import { Hero } from "@/components/Hero";
import { WhyNCP } from "@/components/WhyNCP";
import { About } from "@/components/About";
import { Programs } from "@/components/Programs";
import { Booking } from "@/components/Booking";
import { Contact } from "@/components/Contact";

export default function HomePage() {
  return (
    <>
      <Hero />
      <WhyNCP />
      <About />
      <Programs />
      <Booking />
      <Contact />
    </>
  );
}
