import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowDown,
  ArrowUpRight,
  Check,
  Code2,
  Layers3,
  MessageCircle,
  Rocket,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SpatialCard } from "@/components/site/spatial-card";
import { ProjectCta } from "@/components/site/sections";
import { processSteps } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Our process",
  description:
    "From the first question to a considered launch: explore Technovata's approach to discovery, planning, development, and collaboration.",
};

const stageDetails = [
  {
    icon: Search,
    focus: "Find the problem worth solving.",
    description:
      "We explore the people, the business context, and what a useful outcome looks like. Existing ideas and constraints are part of the conversation, not something to work around later.",
    outputs: [
      "A shared problem statement",
      "Core users and priority journeys",
      "Goals, constraints, and open questions",
    ],
  },
  {
    icon: Layers3,
    focus: "Give the idea a clear direction.",
    description:
      "Turn the discovery into a focused scope. Map the main experience, explore the visual direction, and agree what belongs in the first release before the build gets underway.",
    outputs: [
      "Agreed scope and priorities",
      "Key journeys and interface direction",
      "A delivery roadmap and shared responsibilities",
    ],
  },
  {
    icon: Code2,
    focus: "Make it useful. Make it feel right.",
    description:
      "Design and development move together. Review working screens, discuss the decisions behind them, and refine the details against the goals we agreed at the start.",
    outputs: [
      "Working product increments to review",
      "Responsive interfaces and connected features",
      "Checks against agreed acceptance criteria",
    ],
  },
  {
    icon: Rocket,
    focus: "Bring it to life with care.",
    description:
      "Review the complete experience, resolve the release details, and prepare the handover. Launch responsibilities and any ongoing support are agreed as part of the project scope.",
    outputs: [
      "A release review and launch checklist",
      "Deployment and handover guidance",
      "An agreed next step for support or iteration",
    ],
  },
];

export default function ProcessPage() {
  return (
    <div className="story-page process-story">
      <section className="story-hero">
        <div className="site-container story-hero-grid">
          <div className="story-hero-copy">
            <span className="eyebrow">
              <span />
              HOW WE WORK
            </span>
            <h1>
              A clear path.
              <br />
              <span className="text-accent">A shared direction.</span>
            </h1>
            <p>
              From the first question to the final detail. A considered way to
              turn your idea into something people can use, with a conversation
              at every step.
            </p>
            <div className="story-hero-actions">
              <Button
                nativeButton={false}
                role="link"
                render={<Link href="/contact" />}
              >
                Tell us your idea{" "}
                <ArrowUpRight data-icon="inline-end" aria-hidden="true" />
              </Button>
              <Link href="#the-process" className="text-link">
                Explore the process <ArrowDown aria-hidden="true" />
              </Link>
            </div>
          </div>
          <div className="process-map" aria-hidden="true">
            <span className="process-map-label">
              A GOOD IDEA. MOVING FORWARD.
            </span>
            <div className="process-map-stack">
              {processSteps.map((step, index) => {
                const Icon = stageDetails[index].icon;
                return (
                  <div className="process-map-node" key={step.number}>
                    <span className="process-map-icon">
                      <Icon strokeWidth={1.5} />
                    </span>
                    <span>{step.name}</span>
                    <span className="process-map-number">/{step.number}</span>
                  </div>
                );
              })}
            </div>
            <div className="process-map-ground" />
            <span className="process-map-caption">
              THINK IT THROUGH. BRING IT TO LIFE.
            </span>
          </div>
        </div>
      </section>
      <section
        className="process-chapters section-pad"
        id="the-process"
        aria-labelledby="chapters-heading"
      >
        <div className="site-container">
          <div className="story-section-heading">
            <div>
              <span className="eyebrow">
                <span />
                FROM THE FIRST QUESTION
              </span>
              <h2 id="chapters-heading">
                Four steps.
                <br />
                <span className="text-accent">One considered journey.</span>
              </h2>
            </div>
            <p>
              A practical framework, shaped around your project.
              <br />
              Each stage leaves us with something clear to build on.
            </p>
          </div>
          <div className="process-chapters-grid">
            {processSteps.map((step, index) => {
              const detail = stageDetails[index];
              const Icon = detail.icon;
              return (
                <SpatialCard key={step.number} className="process-chapter-tilt">
                  <article className="process-chapter">
                    <div className="process-chapter-top">
                      <span className="process-chapter-number">
                        {step.number}
                      </span>
                      <Icon strokeWidth={1.5} aria-hidden="true" />
                    </div>
                    <h3>
                      {step.name}
                      <span>{detail.focus}</span>
                    </h3>
                    <p>{detail.description}</p>
                    <div className="process-outputs">
                      <span className="process-outputs-label">
                        WHAT WE LEAVE WITH
                      </span>
                      <ul>
                        {detail.outputs.map((output) => (
                          <li key={output}>
                            <Check aria-hidden="true" />
                            {output}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </article>
                </SpatialCard>
              );
            })}
          </div>
          <div className="process-collaboration">
            <span className="process-collaboration-icon">
              <MessageCircle strokeWidth={1.5} aria-hidden="true" />
            </span>
            <div>
              <h3>A conversation. Through every chapter.</h3>
              <p>
                Feedback, progress, and decisions belong in the open. Before
                work begins, we agree how we&apos;ll communicate, who makes
                decisions, and how changes to scope are handled.
              </p>
            </div>
            <Link href="/contact" className="text-link">
              Let&apos;s talk it through <ArrowUpRight aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
      <ProjectCta />
    </div>
  );
}
