"use client";

import { useRef, useState, useSyncExternalStore, type FormEvent } from "react";
import { ArrowUpRight, LockKeyhole } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { services } from "@/lib/site-content";

const subscribe = () => () => {};
type FieldName = "name" | "email" | "service" | "message";

export function InquiryForm() {
  const hydrated = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({});
  const [submitted, setSubmitted] = useState(false);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const nextErrors: Partial<Record<FieldName, string>> = {};
    if (!String(data.get("name") ?? "").trim())
      nextErrors.name = "Tell us your name.";
    const email = form.elements.namedItem("email") as HTMLInputElement;
    if (!email.value.trim() || email.validity.typeMismatch)
      nextErrors.email = "Enter a valid email address.";
    if (!services.some((service) => service.id === data.get("service")))
      nextErrors.service = "Choose a service to explore.";
    if (!String(data.get("message") ?? "").trim())
      nextErrors.message = "Tell us a little about your project.";
    setErrors(nextErrors);
    const firstError = Object.keys(nextErrors)[0];
    if (firstError) {
      setSubmitted(false);
      form.querySelector<HTMLElement>(`[name="${firstError}"]`)?.focus();
      return;
    }
    setSubmitted(true);
  }

  return (
    <form
      ref={formRef}
      className="inquiry-card"
      noValidate
      onSubmit={submit}
      onChange={() => setSubmitted(false)}
      onReset={() => {
        setErrors({});
        setSubmitted(false);
      }}
      aria-labelledby="inquiry-heading"
    >
      <h2 id="inquiry-heading">Tell us what you&apos;re thinking.</h2>
      <p className="inquiry-intro">
        Big idea or early thought, this is a good place to start.
        <br />
        All fields are required.
      </p>
      <fieldset disabled={!hydrated}>
        <legend className="sr-only">Your project inquiry</legend>
        <FieldGroup>
          <div className="form-row">
            <Field data-invalid={Boolean(errors.name)}>
              <FieldLabel htmlFor="inquiry-name">Your name</FieldLabel>
              <Input
                id="inquiry-name"
                name="name"
                placeholder="Alex Morgan"
                autoComplete="name"
                required
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? "name-error" : undefined}
              />
              {errors.name && (
                <FieldError id="name-error">{errors.name}</FieldError>
              )}
            </Field>
            <Field data-invalid={Boolean(errors.email)}>
              <FieldLabel htmlFor="inquiry-email">Email address</FieldLabel>
              <Input
                id="inquiry-email"
                name="email"
                type="email"
                placeholder="alex@company.com"
                autoComplete="email"
                required
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? "email-error" : undefined}
              />
              {errors.email && (
                <FieldError id="email-error">{errors.email}</FieldError>
              )}
            </Field>
          </div>
          <Field data-invalid={Boolean(errors.service)}>
            <FieldLabel htmlFor="inquiry-service">
              What can we help with?
            </FieldLabel>
            <select
              id="inquiry-service"
              name="service"
              required
              defaultValue=""
              aria-invalid={Boolean(errors.service)}
              aria-describedby={errors.service ? "service-error" : undefined}
            >
              <option value="" disabled>
                Select a service
              </option>
              {services.map((service) => (
                <option value={service.id} key={service.id}>
                  {service.name}
                </option>
              ))}
            </select>
            {errors.service && (
              <FieldError id="service-error">{errors.service}</FieldError>
            )}
          </Field>
          <Field data-invalid={Boolean(errors.message)}>
            <FieldLabel htmlFor="inquiry-message">
              A little about your project
            </FieldLabel>
            <Textarea
              id="inquiry-message"
              name="message"
              placeholder="What would you like to build? Who is it for? We'd love to hear the idea."
              rows={5}
              required
              aria-invalid={Boolean(errors.message)}
              aria-describedby={errors.message ? "message-error" : undefined}
            />
            {errors.message && (
              <FieldError id="message-error">{errors.message}</FieldError>
            )}
          </Field>
        </FieldGroup>
        <div className="form-actions">
          <Button type="submit" size="lg">
            Preview inquiry <ArrowUpRight aria-hidden="true" />
          </Button>
          <Button type="reset" variant="ghost">
            Reset form
          </Button>
        </div>
      </fieldset>
      <div role="status" aria-live="polite">
        {submitted && (
          <p className="form-success">Demo complete. Nothing was sent.</p>
        )}
      </div>
      <p className="form-note">
        <LockKeyhole aria-hidden="true" />
        <span>
          Demo form. Your details stay on this page and are not sent or stored.
          Use sample information to try it.
        </span>
      </p>
    </form>
  );
}
