import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Brand } from "@/components/site/brand";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-container">
        <div className="footer-main">
          <div>
            <Brand />
            <p>
              Thoughtful software.
              <br />A world of possibilities.
            </p>
          </div>
          <nav aria-label="Footer navigation">
            <Link href="/services">Services</Link>
            <Link href="/#process">Process</Link>
            <Link href="/about">About</Link>
            <Link href="/contact">
              Let&apos;s talk <ArrowUpRight aria-hidden="true" />
            </Link>
          </nav>
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
