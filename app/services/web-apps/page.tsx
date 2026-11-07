import type { Metadata } from "next";
import { ServicePage } from "@/components/site/service-page";

export const metadata: Metadata = { title: "Web applications" };

export default function Page() {
  return <ServicePage id="web-apps" />;
}
