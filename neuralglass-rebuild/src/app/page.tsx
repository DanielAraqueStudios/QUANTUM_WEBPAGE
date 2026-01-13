import { AnimatedBackground } from '@/components/AnimatedBackground';
import { Hero } from '@/sections/Hero';
import { Services } from '@/sections/Services';
import { WhyChooseUs } from '@/sections/WhyChooseUs';
import { CaseStudies } from '@/sections/CaseStudies';
import { Contact } from '@/sections/Contact';

export default function Home() {
  return (
    <main>
      <AnimatedBackground />
      <Hero />
      <Services />
      <WhyChooseUs />
      <CaseStudies />
      <Contact />
    </main>
  );
}

