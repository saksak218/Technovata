import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  Check,
  Compass,
  Layers3,
  PackageCheck,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ServiceVisual } from "@/components/site/service-visual";
import { SpatialCard } from "@/components/site/spatial-card";
import { ProjectCta } from "@/components/site/sections";
import { services, type ServiceId } from "@/lib/site-content";

const serviceStories = {
  websites: {
    headline: "A first impression. A lasting connection.",
    description:
      "Give your business a home that communicates clearly and feels unmistakably yours. We map the pages around what visitors need to understand, design the experience for phone and desktop, and build a site your team can maintain.",
    focus: [
      "Brand and content direction",
      "Responsive page design",
      "Accessible, considered interactions",
    ],
    audience:
      "For businesses ready for a new digital presence, a clearer story, or a thoughtful website redesign.",
  },
  "web-apps": {
    headline: "Complex behind the scenes. Clear on the surface.",
    description:
      "Turn a real business problem into a useful digital workspace. We map the workflow, design the data model and permissions, and connect the interfaces and integrations your team needs to do the job.",
    focus: [
      "User journeys and workflow design",
      "Role-aware application experiences",
      "Data, integrations, and useful interfaces",
    ],
    audience:
      "For teams with a workflow to improve, a service to bring online, or a custom product to build.",
  },
  "mobile-apps": {
    headline: "Made for the way people move.",
    description:
      "Create a mobile experience that belongs in someone's everyday life. We map the core tasks, prototype the important screens, and build the application and API connections around the way it will be used.",
    focus: [
      "Mobile product and interaction design",
      "iOS and Android application experiences",
      "Device-aware flows and integrations",
    ],
    audience:
      "For businesses whose product needs to be close at hand, with a mobile experience shaped around real use.",
  },
  saas: {
    headline: "Start with a useful product. Build for what's next.",
    description:
      "Bring a software product to life with a clear first release. We help prioritise the first release, design tenant and role boundaries, and build onboarding, workspaces, and billing integrations around your business model.",
    focus: [
      "MVP scope and product journeys",
      "Tenant, role, and workspace experiences",
      "Subscription and onboarding flows",
    ],
    audience:
      "For founders and teams turning a recurring customer need into a software product, or improving an existing SaaS experience.",
  },
};

export function ServicePage({ id }: { id: ServiceId }) {
  const service = services.find((service) => service.id === id)!;
  const story = serviceStories[service.id];
  return (
    <>
      <section className="page-intro service-page-intro">
        <div className="site-container service-hero-grid">
          <div>
            <Link className="text-link back-link" href="/services">
              <ArrowLeft aria-hidden="true" />
              All services
            </Link>
            <span className="eyebrow">
              <span />
              {service.eyebrow.toUpperCase()}
            </span>
            <h1>
              {service.name}.
              <span className="text-accent">Built around you.</span>
            </h1>
            <p>{story.description}</p>
            <Button
              size="lg"
              nativeButton={false}
              render={<Link href="/contact" />}
              role="link"
            >
              Let&apos;s explore your idea
              <ArrowUpRight aria-hidden="true" />
            </Button>
          </div>
          <SpatialCard className="service-hero-art">
            <div className="service-detail-stage">
              <Badge variant="outline">DESIGN × DEVELOPMENT</Badge>
              <ServiceVisual kind={service.id} />
              <span className="service-art-caption">IDEAS, ENGINEERED.</span>
            </div>
          </SpatialCard>
        </div>
      </section>
      <section className="section-pad service-outcomes">
        <div className="site-container service-outcomes-grid">
          <div>
            <span className="eyebrow">
              <span />A CONSIDERED APPROACH
            </span>
            <h2>{story.headline}</h2>
            <p>{story.audience}</p>
            <Link href="/process" className="text-link">
              How we get there
              <ArrowUpRight aria-hidden="true" />
            </Link>
          </div>
          <div className="scope-card">
            <h3>What we can shape together</h3>
            <ul className="deliverables">
              {service.deliverables.map((item) => (
                <li key={item}>
                  <Check aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="scope-divider" />
            <p>
              Every project starts with a conversation. The final scope,
              integrations, and delivery approach are agreed around your goals.
            </p>
          </div>
        </div>
      </section>
      <section className="service-foundations section-pad">
        <div className="site-container">
          <div className="section-heading-row">
            <h2>More than the finished screen.</h2>
            <p className="section-side-copy">
              A useful product needs the thinking behind it.
            </p>
          </div>
          <div className="principles-grid service-foundation-grid">
            {[
              {
                icon: Compass,
                title: "The right starting point",
                text: story.focus[0],
              },
              {
                icon: Layers3,
                title: "A connected experience",
                text: story.focus[1],
              },
              {
                icon: PackageCheck,
                title: "Ready for the next step",
                text: `${story.focus[2]}. Source code, setup notes, release checks, and a walkthrough are included in the agreed handover scope.`,
              },
            ].map(({ icon: Icon, title, text }) => (
              <article className="principle-card" key={title}>
                <Icon aria-hidden="true" />
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
          <div className="related-services">
            <span>Explore another possibility</span>
            {services
              .filter(({ id }) => id !== service.id)
              .map((other) => (
                <Link key={other.id} href={`/services/${other.id}`}>
                  {other.name}
                  <ArrowUpRight aria-hidden="true" />
                </Link>
              ))}
          </div>
        </div>
      </section>
      <ProjectCta />
    </>
  );
}
