import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowUpRight,
  Compass,
  HeartHandshake,
  Info,
  Layers3,
  Sparkles,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { OrbitalScene } from "@/components/site/orbital-scene";
import { SpatialCard } from "@/components/site/spatial-card";
import { ProjectCta } from "@/components/site/sections";

export const metadata: Metadata = {
  title: "About us",
  description:
    "The thinking behind Technovata: thoughtful design, considered engineering, and software built around people.",
};

const principles = [
  {
    icon: Compass,
    number: "01",
    title: "Start with the why.",
    description:
      "Understand the real problem before choosing the technology. A useful product starts with a clear purpose, a real audience, and the right questions.",
  },
  {
    icon: HeartHandshake,
    number: "02",
    title: "Build it together.",
    description:
      "Good ideas get better in conversation. Share the thinking, make decisions together, and keep the next step clear for everyone involved.",
  },
  {
    icon: Layers3,
    number: "03",
    title: "Care about the details.",
    description:
      "The interface, the engineering, and the handover are parts of one experience. Give each the attention it needs to make the whole thing work.",
  },
];

export default function AboutPage() {
  return (
    <div className="story-page about-story">
      <section className="story-hero">
        <div className="site-container story-hero-grid">
          <div className="story-hero-copy">
            <span className="eyebrow">
              <span />
              HELLO, WE&apos;RE TECHNOVATA
            </span>
            <h1>
              Curious minds.
              <br />
              <span className="text-accent">Considered software.</span>
            </h1>
            <p>
              We see possibility where design and technology meet. Our approach
              brings both together, with the people using your product at the
              center.
            </p>
            <div className="story-hero-actions">
              <Button
                nativeButton={false}
                role="link"
                render={<Link href="/process" />}
              >
                How we work{" "}
                <ArrowUpRight data-icon="inline-end" aria-hidden="true" />
              </Button>
              <Link href="/services" className="text-link">
                What we build <ArrowUpRight aria-hidden="true" />
              </Link>
            </div>
            <div className="sample-note">
              <Info aria-hidden="true" />
              Sample company introduction for this website preview.
            </div>
          </div>
          <div className="story-orbital-stage">
            <div className="story-stage-heading">
              <Badge variant="outline">
                <Sparkles aria-hidden="true" /> A shared point of view
              </Badge>
              <span aria-hidden="true">T / 01</span>
            </div>
            <OrbitalScene />
            <div className="story-stage-caption">
              <span>DESIGN</span>
              <span className="story-caption-line" />
              <span>ENGINEERING</span>
            </div>
          </div>
        </div>
      </section>
      <section
        className="story-principles section-pad"
        aria-labelledby="principles-heading"
      >
        <div className="site-container">
          <div className="story-section-heading">
            <div>
              <span className="eyebrow">
                <span />
                WHAT GUIDES THE WORK
              </span>
              <h2 id="principles-heading">
                A little intention.
                <br />
                <span className="text-accent">In everything we do.</span>
              </h2>
            </div>
            <p>
              Tools change. Trends move on.
              <br />
              The way we think about good work stays grounded.
            </p>
          </div>
          <div className="story-principles-grid">
            {principles.map(({ icon: Icon, number, title, description }) => (
              <SpatialCard key={number} className="story-principle-tilt">
                <Card className="story-principle-card">
                  <CardHeader>
                    <div className="story-principle-top">
                      <span className="story-principle-icon">
                        <Icon strokeWidth={1.5} aria-hidden="true" />
                      </span>
                      <span>{number} /</span>
                    </div>
                    <CardTitle>
                      <h3>{title}</h3>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>{description}</p>
                  </CardContent>
                </Card>
              </SpatialCard>
            ))}
          </div>
          <div className="story-shared-direction">
            <span className="story-direction-mark" aria-hidden="true">
              {"{ + }"}
            </span>
            <div>
              <h3>Different skills. One shared direction.</h3>
              <p>
                A strong visual identity, a useful interface, and sound
                engineering should feel like parts of the same idea. That&apos;s
                the connection we want to make.
              </p>
            </div>
            <Link href="/process" className="text-link">
              Explore our process <ArrowUpRight aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
      <ProjectCta />
    </div>
  );
}
