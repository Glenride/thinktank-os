import InstitutionalHeader from '@/Components/InstitutionalHeader';
import SiteFooter from '@/Components/SiteFooter';
import { Head, Link } from '@inertiajs/react';

export default function Index({ briefs = [], auth }) {
    return (
        <div className="min-h-screen bg-paper text-ink dark:bg-night dark:text-cream font-serif selection:bg-sienna selection:text-ink">
            <Head title="Labs" />
            <InstitutionalHeader auth={auth} active="labs" subtitle="Glenride Labs" />

            <main className="mx-auto max-w-7xl px-6 py-16 sm:py-20 lg:px-8">
                <div className="max-w-3xl">
                    <h1 className="font-display text-4xl font-bold tracking-tight text-ink dark:text-cream sm:text-5xl">
                        Labs
                    </h1>
                    <p className="mt-6 text-lg leading-relaxed text-ink-soft dark:text-cream-soft">
                        Product and bot concepts from the Glenride workshop.
                        Experiments, tools, and working software. They are
                        not policy research, so they are not in the library.
                    </p>
                    <p className="mt-4 text-sm leading-relaxed text-ink-soft dark:text-cream-soft">
                        The research is in{' '}
                        <Link
                            href={route('library.index')}
                            className="font-semibold text-sienna-deep underline underline-offset-4 dark:text-sienna"
                        >
                            the Vanguard Library
                        </Link>
                        .
                    </p>
                </div>

                <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {briefs.map((brief) => (
                        <article
                            key={brief.id}
                            className="group flex flex-col justify-between rounded-2xl border border-line dark:border-line-dark bg-paper dark:bg-night-card p-7 shadow-sm hover:shadow-md hover:border-sienna-deep/40 dark:hover:border-sienna/50 transition duration-200"
                        >
                            <div>
                                <div className="flex items-center justify-between text-xs font-mono text-ink-soft dark:text-cream-soft mb-4">
                                    <span className="text-sienna-deep dark:text-sienna font-medium">
                                        {brief.series || 'Glenride Labs'}
                                    </span>
                                    <span>
                                        {brief.published_at
                                            ? new Date(brief.published_at).toLocaleDateString('en-US', {
                                                  month: 'short',
                                                  year: 'numeric',
                                              })
                                            : 'Fall 2026'}
                                    </span>
                                </div>

                                <h2 className="font-display text-xl font-bold text-ink dark:text-cream group-hover:text-sienna-deep dark:group-hover:text-sienna transition leading-snug">
                                    <Link href={route('briefs.show', brief.slug ?? brief.id)}>
                                        {brief.title}
                                    </Link>
                                </h2>

                                <p className="mt-3 text-sm text-ink-soft dark:text-cream-soft line-clamp-3 leading-relaxed font-serif">
                                    {brief.abstract ||
                                        'A concept from the Glenride workshop: an experiment or tool, described plainly.'}
                                </p>
                            </div>

                            {brief.attestations?.[0] && (
                                <Link
                                    href={route('attestations.show', brief.attestations[0].public_id)}
                                    className="mt-4 inline-flex items-center text-xs font-mono font-semibold text-sienna-deep dark:text-sienna hover:text-ink dark:hover:text-cream transition"
                                >
                                    Witnessed by Glenride · {brief.attestations[0].public_id}
                                </Link>
                            )}

                            <div className="mt-6 pt-4 border-t border-line dark:border-line-dark flex items-center justify-between">
                                <div className="text-xs">
                                    <span className="block font-medium text-ink dark:text-cream">
                                        {brief.user?.name || 'Institutional Fellow'}
                                    </span>
                                    <span className="block text-[11px] font-mono text-ink-soft dark:text-cream-soft">
                                        {brief.word_count ? `${brief.word_count} words` : '4-Page Brief'}
                                    </span>
                                </div>
                                <Link
                                    href={route('briefs.show', brief.slug ?? brief.id)}
                                    className="text-xs font-semibold text-sienna-deep dark:text-sienna hover:text-ink dark:hover:text-cream transition"
                                >
                                    Read →
                                </Link>
                            </div>
                        </article>
                    ))}
                </div>
            </main>

            <SiteFooter />
        </div>
    );
}
