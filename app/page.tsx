import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Braces,
  Check,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeroVisual } from "@/components/site/hero-visual";
import {
  FaqSection,
  ProcessSection,
  ProjectCta,
  ServicesSection,
} from "@/components/site/sections";

export default function Home() {
  return (
    <>
      <section className="hero-section" aria-labelledby="hero-heading">
        <div className="hero-grid-background" aria-hidden="true" />
        <div className="site-container hero-grid">
          <div className="hero-copy">
            <div className="hero-eyebrow">
              <span className="status-dot" />
              YOUR IDEAS. OUR NEXT CHALLENGE.
            </div>
            <h1 id="hero-heading">
              Software built
              <br />
              for <span>what&apos;s next.</span>
            </h1>
            <p>
              Websites, web apps, and mobile experiences.
              <br className="desktop-break" /> Thoughtfully designed. Built
              around you.
            </p>
            <div className="hero-buttons">
              <Button
                size="lg"
                nativeButton={false}
                role="link"
                render={<Link href="/contact" />}
              >
                Start a project <ArrowUpRight aria-hidden="true" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                nativeButton={false}
                role="link"
                render={<Link href="#services" />}
              >
                <span className="button-play">
                  <ArrowDown aria-hidden="true" />
                </span>
                Explore our services
              </Button>
            </div>
            <div className="hero-footnote">
              <span>
                <Check aria-hidden="true" /> Ideas into experiences
              </span>
              <i />
              <span>
                <Check aria-hidden="true" /> Built with purpose
              </span>
            </div>
          </div>
          <HeroVisual />
        </div>
        <div className="site-container hero-bottom">
          <span>
            <span className="small-cross">+</span> GOOD SOFTWARE STARTS WITH A
            GOOD CONVERSATION.
          </span>
          <Link href="#services" aria-label="Scroll to our services">
            <span>SCROLL TO EXPLORE</span>
            <ArrowDown aria-hidden="true" />
          </Link>
        </div>
      </section>
      <ServicesSection />
      <ProcessSection />
      <section
        className="about-section section-pad"
        aria-labelledby="about-heading"
      >
        <div className="site-container about-grid">
          <div className="about-art" aria-hidden="true">
            <div className="about-orbit orbit-a" />
            <div className="about-orbit orbit-b" />
            <div className="about-core">
              <Braces strokeWidth={1} />
              <span>IDEA → IMPACT</span>
            </div>
            <div className="floating-label label-design">
              <Sparkles />
              Designed with intention
            </div>
            <div className="floating-label label-code">
              <Braces />
              Built with care
            </div>
          </div>
          <div className="about-copy">
            <span className="eyebrow">
              <span />
              THE THINKING BEHIND THE BUILD
            </span>
            <h2 id="about-heading">
              Technology is the tool.
              <br />
              <span className="text-accent">People are the point.</span>
            </h2>
            <p>
              We believe the best digital experiences make something easier,
              clearer, or more possible for the people using them.
            </p>
            <p>
              That&apos;s the thinking behind Technovata. Thoughtful design
              meets considered engineering, with your goals at the center.
            </p>
            <Link className="text-link" href="/about">
              A little more about us <ArrowRight aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
      <FaqSection />
      <ProjectCta />
    </>
  );
}
