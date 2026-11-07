import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Code2,
  Layers3,
  Rocket,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ServiceVisual } from "@/components/site/service-visual";
import { SpatialCard } from "@/components/site/spatial-card";
import { faqs, processSteps, services } from "@/lib/site-content";

export function ServicesSection() {
  return (
    <section
      className="services-band"
      id="services"
      aria-labelledby="services-heading"
    >
      <div className="site-container">
        <div className="section-topline">
          <span className="eyebrow">
            <span />
            WHAT WE DO
          </span>
          <span className="section-index">01 — FOUR WAYS FORWARD</span>
        </div>
        <div className="section-heading-row">
          <div>
            <h2 id="services-heading">
              From your first impression.
              <br />
              <span className="text-accent">To your next big thing.</span>
            </h2>
            <p>Four capabilities. One considered digital experience.</p>
          </div>
          <Link className="text-link" href="/services">
            Explore all services <ArrowUpRight aria-hidden="true" />
          </Link>
        </div>
        <div className="services-grid">
          {services.map((service, index) => (
            <SpatialCard className="service-tilt" key={service.id}>
              <Link className="service-card" href={`/services/${service.id}`}>
                <div className="service-card-top">
                  <span className="service-number">0{index + 1}</span>
                  <ArrowUpRight aria-hidden="true" />
                </div>
                <ServiceVisual kind={service.id} />
                <div className="service-card-content">
                  <h3>{service.name}</h3>
                  <p>{service.shortDescription}</p>
                  <span className="service-explore">
                    Explore service <ArrowRight aria-hidden="true" />
                  </span>
                </div>
              </Link>
            </SpatialCard>
          ))}
        </div>
      </div>
    </section>
  );
}

const processIcons = [Search, Layers3, Code2, Rocket];
export function ProcessSection() {
  return (
    <section
      className="process-section section-pad"
      id="process"
      aria-labelledby="process-heading"
    >
      <div className="site-container">
        <div className="section-topline">
          <span className="eyebrow">
            <span />
            HOW WE WORK
          </span>
          <span className="section-index">02 — FROM IDEA TO IMPACT</span>
        </div>
        <div className="section-heading-row">
          <div>
            <h2 id="process-heading">
              From a spark.
              <br />
              <span className="text-accent">To something real.</span>
            </h2>
          </div>
          <div className="process-intro">
            <p className="section-side-copy">
              A clear path. A shared direction.
              <br />
              And care in every step along the way.
            </p>
            <Link className="text-link" href="/process">
              Our process in detail <ArrowUpRight aria-hidden="true" />
            </Link>
          </div>
        </div>
        <div className="process-grid">
          {processSteps.map((step, index) => {
            const Icon = processIcons[index];
            return (
              <SpatialCard className="process-tilt" key={step.number}>
                <div className="process-step">
                  <div className="process-step-top">
                    <span className="process-icon">
                      <Icon strokeWidth={1.5} aria-hidden="true" />
                    </span>
                    <span className="step-number">/{step.number}</span>
                    {index < 3 && (
                      <ArrowRight
                        className="process-arrow"
                        aria-hidden="true"
                      />
                    )}
                  </div>
                  <h3>{step.name}</h3>
                  <p>{step.description}</p>
                </div>
              </SpatialCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function FaqSection() {
  return (
    <section className="faq-section section-pad" aria-labelledby="faq-heading">
      <div className="site-container faq-grid">
        <div>
          <span className="eyebrow">
            <span />A LITTLE CLARITY
          </span>
          <h2 id="faq-heading">
            Good questions.
            <br />
            <span className="text-accent">Straight answers.</span>
          </h2>
          <p>Before we build something, let&apos;s clear a few things up.</p>
          <Link href="/contact" className="text-link">
            Ask us something else <ArrowUpRight aria-hidden="true" />
          </Link>
        </div>
        <Accordion className="faq-accordion">
          {faqs.map((faq, index) => (
            <AccordionItem value={String(index)} key={faq.question}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>
                <p>{faq.answer}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

export function ProjectCta() {
  return (
    <section className="project-cta" aria-labelledby="project-cta-heading">
      <div className="site-container cta-inner">
        <div>
          <span className="eyebrow">
            <span />
            LET&apos;S MAKE WHAT&apos;S NEXT
          </span>
          <h2 id="project-cta-heading">
            Your next big idea.
            <br />
            <span className="text-accent">Starts with hello.</span>
          </h2>
          <p>
            A website. An app. A whole new platform.
            <br />
            Tell us what you&apos;re thinking.
          </p>
        </div>
        <div className="cta-action">
          <Button
            size="lg"
            nativeButton={false}
            role="link"
            render={<Link href="/contact" />}
          >
            Start a project <ArrowUpRight aria-hidden="true" />
          </Button>
          <span>No perfect brief required.</span>
        </div>
        <div className="cta-orbit" aria-hidden="true" />
        <div className="cta-orbit cta-orbit-second" aria-hidden="true" />
      </div>
    </section>
  );
}
