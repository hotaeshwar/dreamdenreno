import React from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { services } from "@/data/services";
import { projects } from "@/data/projects";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import ServiceFaq from "@/components/ServiceFaq";
import ServiceCta from "@/components/ServiceCta";
import { ChevronRight, Home, CheckCircle2, ChevronRightCircle } from "lucide-react";

// Slug category mapping helper
const slugToCategoryMap = {
  "full-home-renovation": "full-home",
  "legal-basement-apartment": "basement",
  "custom-homes": "custom-home",
  "kitchen-renovation": "kitchen",
  "bathroom-renovation": "bathroom",
  "basement-renovation": "basement",
  "home-addition": "custom-home",
  "interior-exterior-renovation": "full-home",
  "commercial-bar-renovation": "commercial"
};

// Generate static params for Next.js static site export
export async function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug,
  }));
}

// Generate metadata dynamically for SEO
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) {
    return { title: "Service Not Found | DreamDen" };
  }
  return {
    title: `${service.name} | Premium Toronto Renovation Services`,
    description: service.description,
    openGraph: {
      title: `${service.name} | DreamDen`,
      description: service.description,
      images: [{ url: service.image }]
    }
  };
}

export default async function ServicePage({ params }) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  // Find matching project for before/after comparison
  const targetCategory = slugToCategoryMap[slug];
  const matchingProject = projects.find((p) => p.category === targetCategory);

  return (
    <article className="min-h-screen bg-white font-sans text-dark pb-24">
      {/* Dynamic Header Banner */}
      <div className="relative h-[300px] flex items-center justify-center">
        <div className="absolute inset-0">
          <Image
            src={service.image}
            alt={service.name}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
        </div>

        {/* Header Text & Breadcrumbs */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center space-y-4">
          {/* Breadcrumbs */}
          <nav className="flex justify-center items-center gap-1.5 text-xs text-neutral-300 font-bold uppercase tracking-wider">
            <Link href="/" className="hover:text-gold flex items-center gap-1 transition-colors">
              <Home className="w-3.5 h-3.5" />
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-neutral-500" />
            <span className="text-neutral-500">Services</span>
            <ChevronRight className="w-3.5 h-3.5 text-neutral-500" />
            <span className="text-gold">{service.name}</span>
          </nav>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-extrabold text-white">
            {service.name}
          </h1>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 space-y-20">
        
        {/* Intro Split Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Details (Left) */}
          <div className="md:col-span-7 space-y-6">
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-dark">
              Premium Solutions Built with Precision
            </h2>
            <p className="text-dark font-semibold leading-relaxed text-sm sm:text-base">
              {service.description}
            </p>

            {/* What We Provide checklist */}
            <div className="space-y-4 pt-4">
              <h3 className="text-xs font-bold text-dark uppercase tracking-widest">What We Deliver</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {service.provisions.map((provision, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs font-bold uppercase tracking-wide text-neutral-600">
                    <CheckCircle2 className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                    <span>{provision}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Benefits list card (Right) */}
          <div className="md:col-span-5 bg-bg-light border border-neutral-200/60 rounded-2xl p-6 sm:p-8 space-y-6">
            <h3 className="text-dark font-serif text-lg font-bold">Key Benefits</h3>
            <ul className="space-y-4">
              {service.benefits.map((benefit, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-gold/15 text-gold flex items-center justify-center shrink-0 text-xs font-extrabold">
                    {idx + 1}
                  </span>
                  <p className="text-neutral-700 text-xs sm:text-sm font-semibold leading-relaxed">
                    {benefit}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Process Timeline Section */}
        <div className="space-y-12">
          <div className="text-center max-w-xl mx-auto">
            <span className="text-gold text-[10px] font-bold uppercase tracking-widest block mb-2">Phase Strategy</span>
            <h2 className="text-dark font-serif text-2xl sm:text-3xl font-bold">Service Delivery Process</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {service.process.map((step, idx) => (
              <div key={idx} className="bg-bg-light/40 border border-neutral-100 rounded-xl p-5 relative overflow-hidden group">
                <span className="absolute -right-2 -bottom-2 font-black text-6xl text-neutral-100/60 select-none group-hover:text-gold/10 transition-colors pointer-events-none">
                  {step.step}
                </span>
                <h4 className="text-dark font-bold text-xs uppercase tracking-wider mb-2">{step.title}</h4>
                <p className="text-neutral-700 text-xs font-semibold leading-relaxed relative z-10">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Before / After Slider Section (Loaded Dynamically) */}
        {matchingProject && (
          <div className="space-y-10 border-t border-neutral-100 pt-16">
            <div className="text-center max-w-xl mx-auto">
              <span className="text-gold text-[10px] font-bold uppercase tracking-widest block mb-2">Visual Inspection</span>
              <h2 className="text-dark font-serif text-2xl sm:text-3xl font-bold">Featured Transformation</h2>
              <p className="text-dark font-semibold text-xs mt-2">
                Slide to review the visual quality from one of our actual {service.name} contracts.
              </p>
            </div>
            <div className="max-w-3xl mx-auto">
              <BeforeAfterSlider
                beforeImage={matchingProject.beforeImage}
                afterImage={matchingProject.afterImage}
                beforeLabel={matchingProject.beforeLabel}
                afterLabel={matchingProject.afterLabel}
              />
            </div>
          </div>
        )}

        {/* FAQs Accordion */}
        <div className="space-y-10 border-t border-neutral-100 pt-16">
          <div className="text-center max-w-xl mx-auto">
            <span className="text-gold text-[10px] font-bold uppercase tracking-widest block mb-2">Support Centre</span>
            <h2 className="text-dark font-serif text-2xl sm:text-3xl font-bold">Frequently Asked Questions</h2>
          </div>
          <ServiceFaq faqs={service.faqs} />
        </div>

        {/* CTA Modal Card */}
        <div className="border-t border-neutral-100 pt-16">
          <ServiceCta serviceName={service.name} serviceSlug={service.slug} />
        </div>

      </div>
    </article>
  );
}
