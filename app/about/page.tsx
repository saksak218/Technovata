import type { Metadata } from "next";
import { Compass, HeartHandshake, Info, Layers3 } from "lucide-react";
import { ProcessSection, ProjectCta } from "@/components/site/sections";

export const metadata: Metadata = {
  title: "Our approach",
  description:
    "The thinking behind Technovata: clear communication, thoughtful design, and considered engineering.",
};

const principles = [
  {
    icon: Compass,
    title: "Start with the why.",
    description:
      "Understand the real problem before choosing the technology. A useful product starts with a clear purpose.",
  },
  {
    icon: HeartHandshake,
    title: "Build it together.",
    description:
      "Keep the conversation open. Share the thinking, make decisions together, and make the next step clear.",
  },
  {
    icon: Layers3,
    title: "Care about the details.",
    description:
      "The small things shape the whole experience. Give the interface, the engineering, and the handover the same attention.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="page-intro">
        <div className="site-container">
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
            Technovata brings design and development together to turn business
            ideas into useful digital experiences. These are the principles
            behind the way we want to build.
          </p>
          <div className="sample-note">
            <Info aria-hidden="true" />
            Sample company introduction for this website preview.
          </div>
        </div>
      </section>
      <section
        className="site-container principles-grid"
        aria-label="Our working principles"
      >
        {principles.map(({ icon: Icon, title, description }) => (
          <article className="principle-card" key={title}>
            <Icon strokeWidth={1.5} aria-hidden="true" />
            <h2>{title}</h2>
            <p>{description}</p>
          </article>
        ))}
      </section>
      <ProcessSection />
      <ProjectCta />
    </>
  );
}
