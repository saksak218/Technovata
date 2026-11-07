import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { ServiceVisual } from "@/components/site/service-visual";
import { ProjectCta } from "@/components/site/sections";
import { services } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Our services",
  description:
    "Explore Technovata's website, custom web application, and mobile development capabilities.",
};

export default function ServicesPage() {
  return (
    <>
      <section className="page-intro">
        <div className="site-container">
          <span className="eyebrow">
            <span />
            OUR CAPABILITIES
          </span>
          <h1>
            Built for your business.
            <br />
            <span className="text-accent">Designed for its people.</span>
          </h1>
          <p>
            A digital presence. A better way to work. Your next big product.
            Let&apos;s build something that moves you forward.
          </p>
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
            <div className="detail-art">
              <ServiceVisual kind={service.id} />
            </div>
            <div>
              <span className="eyebrow">
                <span />0{index + 1} / {service.eyebrow.toUpperCase()}
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
              <Link className="text-link" href="/contact">
                Let&apos;s explore your project{" "}
                <ArrowUpRight aria-hidden="true" />
              </Link>
            </div>
          </section>
        ))}
      </div>
      <ProjectCta />
    </>
  );
}
