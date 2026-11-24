import InstitutionalHeader from '@/Components/InstitutionalHeader';
import SiteFooter from '@/Components/SiteFooter';
import { Head, Link } from '@inertiajs/react';

export default function Attestations({ study, auth }) {
    const title = `Glenride Attestations ${study.year}: ${study.total} Issued`;
    const month = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

    return (
        <div className="min-h-screen bg-paper text-ink dark:bg-night dark:text-cream font-serif selection:bg-sienna selection:text-ink">
            <Head title={`${title}`} />
            <InstitutionalHeader auth={auth} active="research" subtitle="Glenride Research" />

            <main className="mx-auto max-w-3xl px-6 py-16 sm:py-20 lg:px-8">
                <p className="font-mono text-xs uppercase tracking-widest text-sienna-deep dark:text-sienna">
                    Glenride Research · {study.year}
                </p>
                <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-ink dark:text-cream sm:text-5xl">
                    {title}
                </h1>
                <p className="mt-6 text-lg leading-relaxed text-ink-soft dark:text-cream-soft">
                    {study.headline}
                </p>

                <section className="mt-12">
                    <h2 className="font-display text-3xl font-bold text-ink dark:text-cream">Key findings</h2>
                    {study.findings.map((finding) => (
                        <article key={finding.id} id={finding.id} className="mt-8 scroll-mt-24">
                            <h3 className="font-display text-xl font-bold leading-snug text-ink dark:text-cream">
                                {finding.text}
                            </h3>
                            <p className="mt-2 font-mono text-xs text-ink-soft dark:text-cream-soft">
                                <a href={`#${finding.id}`} className="underline underline-offset-4">
                                    Link to this finding
                                </a>
                            </p>
                        </article>
                    ))}
                </section>

                <section className="mt-12">
                    <h2 className="font-display text-3xl font-bold text-ink dark:text-cream">Breakdown by status</h2>
                    <table className="mt-6 w-full text-left text-sm">
                        <thead>
                            <tr className="border-b border-line dark:border-line-dark">
                                <th className="py-2 pr-4">Status</th>
                                <th className="py-2 pr-4">Count</th>
                                <th className="py-2">Share</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.entries(study.by_status).map(([status, count]) => (
                                <tr key={status} className="border-b border-line dark:border-line-dark">
                                    <td className="py-2 pr-4 capitalize">{status}</td>
                                    <td className="py-2 pr-4">{count}</td>
                                    <td className="py-2">{study.shares[status]}%</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>

                <section className="mt-12">
                    <h2 className="font-display text-3xl font-bold text-ink dark:text-cream">Breakdown by subject kind</h2>
                    <table className="mt-6 w-full text-left text-sm">
                        <thead>
                            <tr className="border-b border-line dark:border-line-dark">
                                <th className="py-2 pr-4">Subject kind</th>
                                <th className="py-2">Count</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.entries(study.by_subject_kind).map(([kind, count]) => (
                                <tr key={kind} className="border-b border-line dark:border-line-dark">
                                    <td className="py-2 pr-4">{kind.replaceAll('_', ' ')}</td>
                                    <td className="py-2">{count}</td>
                                </tr>
                            ))}
                            {Object.keys(study.by_subject_kind).length === 0 && (
                                <tr>
                                    <td className="py-2 pr-4">—</td>
                                    <td className="py-2">0</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </section>

                <section className="mt-12">
                    <h2 className="font-display text-3xl font-bold text-ink dark:text-cream">Methodology</h2>
                    <ul className="mt-4 list-disc space-y-2 pl-6 leading-relaxed text-ink-soft dark:text-cream-soft">
                        <li>
                            <strong className="text-ink dark:text-cream">Source:</strong> the Glenride
                            attestations table — every attestation Glenride has issued,
                            including challenged and revoked records. Counts come from
                            the live registry.
                        </li>
                        <li>
                            <strong className="text-ink dark:text-cream">Excluded:</strong> nothing
                            is excluded. Challenged and revoked attestations stay in the
                            totals and are shown in the status breakdown.
                        </li>
                        <li>
                            <strong className="text-ink dark:text-cream">Refresh:</strong> this page
                            updates whenever an attestation is issued, challenged,
                            revoked, or anchored.
                        </li>
                    </ul>
                </section>

                <section className="mt-12">
                    <h2 className="font-display text-3xl font-bold text-ink dark:text-cream">Frequently asked questions</h2>
                    <div id="faq-how-many" className="mt-6 scroll-mt-24">
                        <h3 className="font-display text-xl font-bold text-ink dark:text-cream">
                            How many attestations has Glenride issued?
                        </h3>
                        <p className="mt-2 leading-relaxed text-ink-soft dark:text-cream-soft">
                            {study.total} attestations have been issued in total, of which{' '}
                            {study.in_force} remain in force.{' '}
                            <a href="#faq-how-many" className="font-mono text-xs underline underline-offset-4">
                                Link to this answer
                            </a>
                        </p>
                    </div>
                    <div id="faq-anchored-share" className="mt-6 scroll-mt-24">
                        <h3 className="font-display text-xl font-bold text-ink dark:text-cream">
                            What share of Glenride attestations are anchored on-chain?
                        </h3>
                        <p className="mt-2 leading-relaxed text-ink-soft dark:text-cream-soft">
                            {study.anchored} of {study.total} attestations ({study.anchored_share}
                            %) carry an on-chain anchor.{' '}
                            <a href="#faq-anchored-share" className="font-mono text-xs underline underline-offset-4">
                                Link to this answer
                            </a>
                        </p>
                    </div>
                </section>

                <section className="mt-12 rounded-2xl border border-line bg-paper-deep p-6 dark:border-line-dark dark:bg-night-card">
                    <h2 className="font-display text-2xl font-bold text-ink dark:text-cream">Suggested citation</h2>
                    <p className="mt-3 text-sm leading-relaxed text-ink-soft dark:text-cream-soft">
                        Glenride. &ldquo;Glenride Attestations {study.year}: {study.total} Issued.&rdquo;{' '}
                        https://glenride.com/research/attestations ({month}).
                    </p>
                    <p className="mt-4 font-mono text-xs text-ink-soft dark:text-cream-soft">
                        <a href="/research/attestations.md" className="underline underline-offset-4">
                            View as Markdown
                        </a>
                        {' · '}
                        <Link href="/attestations" className="underline underline-offset-4">
                            Browse the registry
                        </Link>
                    </p>
                </section>
            </main>

            <SiteFooter />
        </div>
    );
}
