import Link from "next/link";
import {
  ArrowUpRight,
  Braces,
  Check,
  Code2,
  Component,
  Fingerprint,
  Layers3,
  MessageCircle,
  Quote,
  Sparkles,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { OrbitalScene } from "@/components/site/orbital-scene";
import { SpatialCard } from "@/components/site/spatial-card";
import { demoTestimonials } from "@/lib/site-content";

export function FoundationStrip() {
  return (
    <div className="foundation-strip">
      <div className="site-container foundation-inner">
        <p>
          Big possibilities.
          <br />
          <strong>A considered foundation.</strong>
        </p>
        <div
          className="foundation-tools"
          role="group"
          aria-label="Our website technology"
        >
          <span>
            <Component aria-hidden="true" />
            React
          </span>
          <span>
            <span className="next-wordmark" aria-hidden="true">
              N
            </span>
            Next.js
          </span>
          <span>
            <Braces aria-hidden="true" />
            TypeScript
          </span>
          <span>
            <Code2 aria-hidden="true" />
            Node.js
          </span>
        </div>
      </div>
    </div>
  );
}

export function ExperienceSection() {
  return (
    <section
      className="experience-section section-pad"
      aria-labelledby="experience-heading"
    >
      <div className="site-container">
        <div className="section-topline">
          <span className="eyebrow">
            <span />
            THE DIFFERENCE IS IN THE DETAILS
          </span>
          <span className="section-index">DESIGN × ENGINEERING</span>
        </div>
        <div className="section-heading-row">
          <h2 id="experience-heading">
            Everything connects.
            <br />
            <span className="text-accent">
              That&apos;s where it gets interesting.
            </span>
          </h2>
          <p className="section-side-copy">
            A great digital product is more than its parts.
            <br />
            We think about how every layer works together.
          </p>
        </div>
        <div className="experience-bento">
          <div className="connected-world">
            <div className="connected-world-top">
              <Badge variant="outline">
                <Sparkles aria-hidden="true" /> A different perspective
              </Badge>
              <span className="technical-coordinate" aria-hidden="true">
                01 — ∞
              </span>
            </div>
            <OrbitalScene />
            <div className="connected-world-copy">
              <h3>One idea. A whole world of possibility.</h3>
              <p>
                Brand, interface, and technology. Moving in the same direction.
              </p>
            </div>
            <span className="orbit-label orbit-label-design">
              Thoughtful design
            </span>
            <span className="orbit-label orbit-label-code">
              Considered engineering
            </span>
          </div>
          <div className="experience-small-cards">
            <SpatialCard className="experience-tilt">
              <article className="experience-card">
                <div className="layered-icon layered-icon-mint">
                  <Layers3 aria-hidden="true" />
                </div>
                <span className="card-micro-label">DESIGNED AROUND PEOPLE</span>
                <h3>
                  Looks right.
                  <br />
                  Feels even better.
                </h3>
                <p>
                  Clear journeys, deliberate interactions, and a visual language
                  that feels like your business.
                </p>
                <Link href="/services" className="text-link">
                  Explore our capabilities <ArrowUpRight aria-hidden="true" />
                </Link>
              </article>
            </SpatialCard>
            <SpatialCard className="experience-tilt">
              <article className="experience-card experience-card-violet">
                <div className="layered-icon layered-icon-violet">
                  <Fingerprint aria-hidden="true" />
                </div>
                <span className="card-micro-label">BUILT WITH INTENTION</span>
                <h3>
                  Your vision.
                  <br />
                  In every detail.
                </h3>
                <p>
                  From the first conversation to the final handover. Clear
                  decisions, shared context, and a build that makes sense.
                </p>
                <Link href="/process" className="text-link">
                  See how we work <ArrowUpRight aria-hidden="true" />
                </Link>
              </article>
            </SpatialCard>
          </div>
        </div>
      </div>
    </section>
  );
}

export function TestimonialsSection() {
  return (
    <section
      className="testimonials-section section-pad"
      id="testimonials"
      aria-labelledby="testimonials-heading"
    >
      <div className="site-container">
        <div className="section-topline">
          <span className="eyebrow">
            <span />
            TESTIMONIALS · DESIGN PREVIEW
          </span>
          <MessageCircle
            className="testimonial-heading-icon"
            aria-hidden="true"
          />
        </div>
        <div className="section-heading-row">
          <h2 id="testimonials-heading">
            Good partnerships.
            <br />
            <span className="text-accent">Great possibilities.</span>
          </h2>
          <p className="testimonial-disclosure">
            Illustrative quotes and fictional people for this design preview.
            These are not client endorsements.
          </p>
        </div>
        <div className="testimonials-grid">
          {demoTestimonials.map((testimonial, index) => (
            <SpatialCard className="testimonial-tilt" key={testimonial.name}>
              <Card className={`testimonial-card testimonial-tone-${index}`}>
                <CardHeader>
                  <div className="quote-card-top">
                    <Quote aria-hidden="true" />
                    <Badge variant="outline">Sample quote</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <blockquote>
                    <p>“{testimonial.quote}”</p>
                  </blockquote>
                </CardContent>
                <CardFooter>
                  <span className="quote-avatar" aria-hidden="true">
                    {testimonial.initials}
                  </span>
                  <div>
                    <span className="quote-name">{testimonial.name}</span>
                    <span className="quote-role">{testimonial.role}</span>
                  </div>
                  <span className="quote-service">{testimonial.service}</span>
                </CardFooter>
              </Card>
            </SpatialCard>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CollaborationSection() {
  return (
    <section
      className="collaboration-section section-pad"
      aria-labelledby="collaboration-heading"
    >
      <div className="site-container collaboration-grid">
        <div>
          <span className="eyebrow">
            <span />A PARTNER IN THE THINKING
          </span>
          <h2 id="collaboration-heading">
            Less guesswork.
            <br />
            <span className="text-accent">More shared direction.</span>
          </h2>
          <p>
            You bring the ambition and the context. We bring design thinking and
            development, with room for honest conversations along the way.
          </p>
          <Link href="/about" className="text-link">
            Meet the thinking behind Technovata{" "}
            <ArrowUpRight aria-hidden="true" />
          </Link>
        </div>
        <div className="collaboration-list">
          {[
            {
              title: "Clear from the start",
              text: "The goals, the scope, and the next step. Agreed together.",
            },
            {
              title: "Designed for real people",
              text: "Every screen starts with the person who will use it.",
            },
            {
              title: "Built to make sense",
              text: "The right tools for your product, with a considered handover.",
            },
          ].map((item, index) => (
            <div key={item.title}>
              <span className="collaboration-number">0{index + 1}</span>
              <div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
              <Check aria-hidden="true" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
