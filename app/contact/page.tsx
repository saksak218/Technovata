import type { Metadata } from "next";
import { Lightbulb, ListChecks, MessageCircle } from "lucide-react";
import { InquiryForm } from "@/components/site/inquiry-form";

export const metadata: Metadata = {
  title: "Start a project",
  description:
    "Explore the Technovata project inquiry experience. This preview does not send or store inquiries.",
};

export default function ContactPage() {
  return (
    <div className="site-container contact-grid">
      <section className="contact-copy" aria-labelledby="contact-heading">
        <span className="eyebrow">
          <span />
          LET&apos;S MAKE SOMETHING
        </span>
        <h1 id="contact-heading">
          Your next chapter
          <br />
          <span className="text-accent">starts here.</span>
        </h1>
        <p>
          A website that feels like you. An app that solves a real problem. Tell
          us what you have in mind.
        </p>
        <div className="contact-steps">
          <div>
            <Lightbulb aria-hidden="true" />
            <div>
              <h2>Start with your idea.</h2>
              <p>
                You don&apos;t need a perfect brief. A little context goes a
                long way.
              </p>
            </div>
          </div>
          <div>
            <MessageCircle aria-hidden="true" />
            <div>
              <h2>Make space for a conversation.</h2>
              <p>A real project starts with understanding your goals.</p>
            </div>
          </div>
          <div>
            <ListChecks aria-hidden="true" />
            <div>
              <h2>Find the right next step.</h2>
              <p>The scope and proposal follow the conversation.</p>
            </div>
          </div>
        </div>
      </section>
      <InquiryForm />
    </div>
  );
}
