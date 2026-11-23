import SiteFooter from '@/Components/SiteFooter';
import { Head, Link } from '@inertiajs/react';

export default function Show({ document }) {
    return (
        <div className="min-h-screen bg-paper font-serif text-ink selection:bg-sienna selection:text-ink dark:bg-night dark:text-cream">
            <Head title={`${document.title} - Glenride`} />

            <main className="mx-auto max-w-4xl px-6 py-12 lg:px-8">
                <p className="font-mono text-xs font-bold uppercase tracking-widest text-sienna-deep dark:text-sienna">
                    Glenride
                </p>
                <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-ink dark:text-cream sm:text-5xl">
                    {document.title}
                </h1>
                <p className="mt-4 text-sm text-ink-soft dark:text-cream-soft">
                    Last updated {document.updated}
                </p>
                <p className="mt-6 text-lg leading-relaxed text-ink-soft dark:text-cream-soft">
                    {document.intro}
                </p>

                <article className="mt-10">
                    {document.sections.map((section) => (
                        <section key={section.heading} className="mt-8">
                            <h2 className="border-t border-line pt-6 font-display text-2xl font-bold tracking-tight text-ink dark:border-line-dark dark:text-cream">
                                {section.heading}
                            </h2>
                            <p className="mt-3 leading-relaxed text-ink-soft dark:text-cream-soft">
                                {section.body}
                            </p>
                        </section>
                    ))}
                </article>

                <div className="mt-12 flex justify-between border-t border-line pt-6 dark:border-line-dark">
                    <Link
                        href="/"
                        className="text-sm font-medium text-sienna-deep transition hover:text-ink dark:text-sienna dark:hover:text-cream"
                    >
                        &larr; Back to Glenride
                    </Link>
                    <span className="font-mono text-[11px] uppercase tracking-widest text-ink-soft dark:text-cream-soft">
                        Every claim has a trail
                    </span>
                </div>
            </main>

            <SiteFooter />
        </div>
    );
}
