import Hero from "@/components/hero/Hero";
import About from "@/components/about/About";
import Projects from "@/components/projects/Projects";
import Roadmap from "@/components/roadmap/Roadmap";
import Stack from "@/components/stack/Stack";
import GitHub from "@/components/github/GitHub";
import Contact from "@/components/contact/Contact";
import ScrollProgress from "@/components/motion/ScrollProgress";

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Hero />
      <About />
      <Projects />
      <Roadmap />
      <Stack />
      <GitHub />
      <Contact />
    </>
  );
}
