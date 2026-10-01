import { notFound } from "next/navigation";
import { CASE_STUDIES, getCaseStudyBySlug, getAllCaseStudySlugs } from "@/data/case-studies";
import { CaseStudyHero } from "@/components/case-study/hero";
import { BlockRenderer } from "@/components/case-study/blocks";
import { NextProject } from "@/components/case-study/next-project";

type Params = { slug: string };

export function generateStaticParams() {
  return getAllCaseStudySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const cs = getCaseStudyBySlug(slug);
  if (!cs) return {};
  return {
    title: `${cs.title} - Case Study - Joel Akinlosotu`,
    description: cs.tagline,
    alternates: { canonical: `https://joelakinlosotu.xyz/projects/${slug}` },
    openGraph: {
      title: `${cs.title} - Case Study`,
      description: cs.tagline,
      images: [{ url: cs.heroImage }],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${cs.title} - Case Study`,
      description: cs.tagline,
      images: [cs.heroImage],
    },
  };
}

export default async function CaseStudyPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const cs = getCaseStudyBySlug(slug);
  if (!cs) notFound();

  const next = CASE_STUDIES.find((c) => c.slug === cs.nextSlug);

  // CreativeWork schema for AI answer engines
  const creativeWorkSchema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: cs.title,
    description: cs.tagline,
    url: cs.liveUrl,
    image: cs.heroImage,
    dateCreated: cs.meta.date,
    creator: {
      "@type": "Person",
      name: "Joel Akinlosotu",
      url: "https://joelakinlosotu.xyz",
    },
    about: cs.intro.join(" "),
    keywords: cs.meta.services.join(", "),
    isPartOf: {
      "@type": "CreativeWorkSeries",
      name: "Joel Akinlosotu - Case Studies",
      url: "https://joelakinlosotu.xyz",
    },
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(creativeWorkSchema) }}
      />

      <CaseStudyHero cs={cs} />

      <section className="mx-auto max-w-3xl px-6 py-16 lg:px-12">
        <div className="space-y-6 text-base leading-relaxed text-muted-foreground sm:text-lg">
          {cs.intro.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </section>

      {cs.blocks.map((block, i) => (
        <BlockRenderer key={block.id} block={block} index={i} />
      ))}

      <NextProject next={next} />

      <footer className="border-t border-dotted border-border">
        <div className="mx-auto max-w-5xl px-6 py-8 lg:px-12">
          <div className="flex justify-between items-center">
            <a href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              ← Back to work
            </a>
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} Joel Akinlosotu
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
