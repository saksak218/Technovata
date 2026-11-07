import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="site-container not-found">
      <span className="eyebrow">
        <span />
        404 / A LITTLE OFF COURSE
      </span>
      <h1>
        A different kind
        <br />
        of <span className="text-accent">what&apos;s next.</span>
      </h1>
      <p>
        This page isn&apos;t here. Let&apos;s get you back to the good stuff.
      </p>
      <Button
        render={<Link href="/" />}
        nativeButton={false}
        role="link"
        size="lg"
      >
        Back to home <ArrowUpRight aria-hidden="true" />
      </Button>
    </section>
  );
}
