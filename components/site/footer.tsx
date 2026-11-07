import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Brand } from "@/components/site/brand";
import { services } from "@/lib/site-content";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-container">
        <div className="footer-main">
          <div className="footer-brand-column">
            <Brand />
            <p>
              Thoughtful design. Considered engineering.
              <br />A world of possibilities.
            </p>
            <Link href="/contact" className="footer-conversation">
              Let&apos;s make something matter{" "}
              <ArrowUpRight aria-hidden="true" />
            </Link>
          </div>
          <div className="footer-link-column">
            <span className="footer-column-label">Explore</span>
            <nav aria-label="Footer navigation">
              <Link href="/">Home</Link>
              <Link href="/about">About us</Link>
              <Link href="/process">Our process</Link>
              <Link href="/contact">Contact</Link>
            </nav>
          </div>
          <div className="footer-link-column">
            <span className="footer-column-label">What we build</span>
            <nav aria-label="Footer services">
              {services.map((service) => (
                <Link key={service.id} href={`/services/${service.id}`}>
                  {service.name}
                  <ArrowUpRight aria-hidden="true" />
                </Link>
              ))}
            </nav>
          </div>
          <div className="footer-outlook">
            <span className="footer-column-label">The next chapter</span>
            <p>
              Good software starts
              <br />
              with a good question.
            </p>
            <Link href="/contact">
              What&apos;s yours?
              <ArrowUpRight aria-hidden="true" />
            </Link>
          </div>
        </div>
        <div className="footer-wordmark" aria-hidden="true">
          Technovata<span>.</span>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Technovata</span>
          <span>
            Website preview · Sample company content · Inquiries are not sent.
          </span>
          <span className="footer-note">
            <span className="status-dot" />
            Built for what&apos;s next.
          </span>
        </div>
      </div>
    </footer>
  );
}
