import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { ServiceVisual } from "@/components/site/service-visual";
import { SpatialCard } from "@/components/site/spatial-card";
import { ProjectCta } from "@/components/site/sections";
import { services } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Our services",
  description:
    "Explore Technovata's website, web application, mobile application, and SaaS development capabilities.",
};

export default function ServicesPage() {
  return (
    <>
      <section className="page-intro services-page-intro">
        <div className="site-container">
          <span className="eyebrow">
            <span />
            FOUR CAPABILITIES. CONNECTED THINKING.
          </span>
          <h1>
            Your ambition.
            <br />
            <span className="text-accent">Our next challenge.</span>
          </h1>
          <div className="services-intro-bottom">
            <p>
              A digital presence. A better way to work. Your next SaaS product.
              Bring the idea; let&apos;s find the right way to build it.
            </p>
            <nav className="service-jump-links" aria-label="Service areas">
              {services.map(({ id, name }) => (
                <a href={`#${id}`} key={id}>
                  {name}
                  <ArrowUpRight aria-hidden="true" />
                </a>
              ))}
            </nav>
          </div>
        </div>
      </section>
      <div className="site-container">
        {services.map((service, index) => (
          <section
            className="service-detail"
            id={service.id}
            key={service.id}
            aria-labelledby={`${service.id}-heading`}
          >
            <SpatialCard className="detail-art">
              <ServiceVisual kind={service.id} />
              <span className="detail-art-label">
                0{index + 1} / {service.name.toUpperCase()}
              </span>
            </SpatialCard>
            <div>
              <span className="eyebrow">
                <span />
                {service.eyebrow.toUpperCase()}
              </span>
              <h2 id={`${service.id}-heading`}>{service.name}</h2>
              <p>{service.description}</p>
              <ul className="deliverables">
                {service.deliverables.map((item) => (
                  <li key={item}>
                    <Check aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                className="text-link service-detail-link"
                href={`/services/${service.id}`}
              >
                Explore {service.name.toLowerCase()}
                <ArrowUpRight aria-hidden="true" />
              </Link>
            </div>
          </section>
        ))}
      </div>
      <section className="section-pad service-unsure">
        <div className="site-container">
          <span className="eyebrow">
            <span />
            START WITH THE PROBLEM
          </span>
          <h2>
            Not sure which shape
            <br />
            your idea should take?
          </h2>
          <p>
            That is a useful place to start. We can explore the audience, the
            purpose, and the experience before settling on the technology.
          </p>
          <Link href="/contact" className="text-link">
            Let&apos;s work it out together
            <ArrowUpRight aria-hidden="true" />
          </Link>
        </div>
      </section>
      <ProjectCta />
    </>
  );
}
