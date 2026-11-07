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
          <span className="section-index">01 / CAPABILITIES</span>
        </div>
        <div className="section-heading-row">
          <div>
            <h2 id="services-heading">
              Good ideas deserve
              <br />
              great execution.
            </h2>
            <p>From your first impression to your next big product.</p>
          </div>
          <Link className="text-link" href="/services">
            Explore our services <ArrowUpRight aria-hidden="true" />
          </Link>
        </div>
        <div className="services-grid">
          {services.map((service, index) => (
            <Link
              key={service.id}
              className="service-card"
              href={`/services#${service.id}`}
            >
              <ServiceVisual kind={service.id} />
              <div className="service-card-content">
                <span className="service-number">0{index + 1}</span>
                <h3>{service.name}</h3>
                <p>{service.shortDescription}</p>
                <span className="service-card-arrow">
                  <ArrowUpRight aria-hidden="true" />
                </span>
              </div>
            </Link>
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
          <span className="section-index">02 / THE PROCESS</span>
        </div>
        <div className="section-heading-row">
          <div>
            <h2 id="process-heading">
              From a spark.
              <br />
              <span className="text-accent">To something real.</span>
            </h2>
          </div>
          <p className="section-side-copy">
            No black boxes. No unnecessary complexity.
            <br /> Just a clear path from idea to launch.
          </p>
        </div>
        <div className="process-grid">
          {processSteps.map((step, index) => {
            const Icon = processIcons[index];
            return (
              <div className="process-step" key={step.number}>
                <div className="process-step-top">
                  <span className="process-icon">
                    <Icon strokeWidth={1.5} aria-hidden="true" />
                  </span>
                  <span className="step-number">/{step.number}</span>
                  {index < 3 && (
                    <ArrowRight className="process-arrow" aria-hidden="true" />
                  )}
                </div>
                <h3>{step.name}</h3>
                <p>{step.description}</p>
              </div>
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
            Straight answers.
          </h2>
          <p>Something else on your mind?</p>
          <Link href="/contact" className="text-link">
            Let&apos;s talk it through <ArrowUpRight aria-hidden="true" />
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
            YOUR NEXT CHAPTER
          </span>
          <h2 id="project-cta-heading">
            Have something
            <br />
            in mind<span className="text-accent">?</span>
          </h2>
          <p>Let&apos;s turn “what if” into what&apos;s next.</p>
        </div>
        <Button
          size="lg"
          nativeButton={false}
          role="link"
          render={<Link href="/contact" />}
        >
          Start a project <ArrowUpRight aria-hidden="true" />
        </Button>
        <div className="cta-orbit" aria-hidden="true" />
      </div>
    </section>
  );
}
