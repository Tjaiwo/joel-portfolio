import { notFound } from "next/navigation";
import { CASE_STUDIES, getCaseStudyBySlug, getAllCaseStudySlugs } from "@/data/case-studies";
import { CaseStudyHero } from "@/components/case-study/hero";
import { CaseStudyIntro } from "@/components/case-study/intro";
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
    title: `${cs.title} — Case Study — Joel Akinlosotu`,
    description: cs.tagline,
    openGraph: {
      title: `${cs.title} — Case Study`,
      description: cs.tagline,
      images: [{ url: cs.heroImage }],
    },
  };
}

export default async function CaseStudyPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const cs = getCaseStudyBySlug(slug);
  if (!cs) notFound();
  const next = CASE_STUDIES.find((c) => c.slug === cs.nextSlug);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <CaseStudyHero cs={cs} />
      <CaseStudyIntro cs={cs} />
      {cs.blocks.map((block, i) => (
        <BlockRenderer key={block.id} block={block} index={i} />
      ))}
      {cs.resultsFootnote && (
        <p className="mx-auto max-w-6xl px-6 pb-8 lg:px-12 text-xs text-muted-foreground italic">{cs.resultsFootnote}</p>
      )}
      <NextProject next={next} />
      <footer className="border-t border-border/40 bg-background">
        <div className="mx-auto max-w-6xl px-6 py-8 lg:px-12">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <a href="/" className="text-sm text-muted-foreground transition-colors hover:text-foreground">← Back to portfolio</a>
            <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} Joel Akinlosotu</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
