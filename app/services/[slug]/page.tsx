import React from "react";
import { notFound } from "next/navigation";
import { individualServicesData } from "@/data/content/individualServices";
import ServicePageClient from "./ServicePageClient";

interface ServicePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return Object.keys(individualServicesData).map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: ServicePageProps) {
  const { slug } = await params;
  const data = individualServicesData[slug];
  if (!data) return { title: "Service Not Found" };

  return {
    title: `${data.title} — AxonVortex Architectural Capabilities`,
    description: data.hero.paragraphs[0] || data.hero.headline,
  };
}

export default async function IndividualServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const data = individualServicesData[slug];

  if (!data) {
    notFound();
  }

  return <ServicePageClient slug={slug} />;
}
