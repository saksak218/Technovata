import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Braces,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { HeroVisual } from "@/components/site/hero-visual";
import {
  FaqSection,
  ProcessSection,
  ProjectCta,
  ServicesSection,
} from "@/components/site/sections";
import {
  CollaborationSection,
  ExperienceSection,
  FoundationStrip,
  TestimonialsSection,
} from "@/components/site/experience-sections";

export default function Home() {
  return (
    <>
      <section
        className="hero-section hero-section-v2"
        aria-labelledby="hero-heading"
      >
        <div className="hero-grid-background" aria-hidden="true" />
        <div className="site-container hero-grid">
          <div className="hero-copy">
            <Badge className="hero-intro-badge" variant="outline">
              <span className="status-dot" /> DESIGN-LED. ENGINEERING-MINDED.
            </Badge>
            <h1 id="hero-heading">
              Software built
              <br />
              for <span>what&apos;s next.</span>
            </h1>
            <p>
              Websites that stand out. Apps that make sense.
              <br className="desktop-break" /> SaaS products with a bigger
              picture.
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
                render={<Link href="/services" />}
              >
                Explore our services <ArrowRight aria-hidden="true" />
              </Button>
            </div>
            <div className="hero-footnote">
              <span>
                <Check aria-hidden="true" /> Considered design
              </span>
              <span>
                <Check aria-hidden="true" /> Connected thinking
              </span>
            </div>
            <div className="hero-capabilities">
              <span>WEBSITES</span>
              <i />
              <span>WEB APPS</span>
              <i />
              <span>MOBILE</span>
              <i />
              <span>SAAS</span>
            </div>
          </div>
          <HeroVisual />
        </div>
        <div className="site-container hero-bottom">
          <span>
            <Braces aria-hidden="true" /> GOOD IDEAS DESERVE TO BE BUILT WELL.
          </span>
          <Link href="#services" aria-label="Scroll to our services">
            <span>A DIFFERENT PERSPECTIVE AWAITS</span>
            <ArrowDown aria-hidden="true" />
          </Link>
        </div>
      </section>
      <FoundationStrip />
      <ServicesSection />
      <ExperienceSection />
      <ProcessSection />
      <CollaborationSection />
      <TestimonialsSection />
      <FaqSection />
      <ProjectCta />
    </>
  );
}
