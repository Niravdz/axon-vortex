import type { Metadata } from "next";
import { WebsiteEcommerceClient } from "./WebsiteEcommerceClient";

export const metadata: Metadata = {
  title: "Websites & E-Commerce — AxonVortex Digital Systems",
  description:
    "Your website shouldn't just exist. We design high-performance websites, landing pages and Shopify e-commerce systems engineered for conversion.",
};

export default function WebsitesEcommercePage() {
  return <WebsiteEcommerceClient />;
}
