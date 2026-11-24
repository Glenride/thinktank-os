import AttestationSeal from '@/Components/AttestationSeal';
import { Head, Link } from '@inertiajs/react';
import { useState, useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

// Brief bodies are stored as Markdown. Render them as formatted text:
// headings, bold, lists, and GitHub tables (remark-gfm). Raw HTML in a
// brief is never rendered. The page header already shows the manuscript
// title, so a leading H1 that repeats it is dropped at render time; the
// stored file is never modified.
const markdownComponents = {
    h1: ({ children }) => (
        <h2 className="font-display text-2xl font-bold text-ink dark:text-cream mt-10 mb-4">{children}</h2>
    ),
    h2: ({ children }) => (
        <h2 className="font-display text-2xl font-bold text-ink dark:text-cream mt-10 mb-4 border-b border-line dark:border-line-dark pb-2">
            {children}
        </h2>
    ),
    h3: ({ children }) => (
        <h3 className="font-display text-xl font-bold text-ink dark:text-cream mt-8 mb-3">{children}</h3>
    ),
    p: ({ children }) => <p className="mb-5 leading-relaxed">{children}</p>,
    strong: ({ children }) => <strong className="font-bold text-ink dark:text-cream">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    a: ({ href, children }) => (
        <a href={href} className="text-sienna-deep dark:text-sienna underline" target="_blank" rel="noreferrer">
            {children}
        </a>
    ),
    ul: ({ children }) => <ul className="list-disc pl-6 mb-5 space-y-2">{children}</ul>,
    ol: ({ children }) => <ol className="list-decimal pl-6 mb-5 space-y-2">{children}</ol>,
    li: ({ children }) => <li className="leading-relaxed">{children}</li>,
    hr: () => <hr className="my-8 border-line dark:border-line-dark" />,
    table: ({ children }) => (
        <div className="overflow-x-auto mb-6">
            <table className="w-full border-collapse text-sm">{children}</table>
        </div>
    ),
    th: ({ children }) => (
        <th className="border border-line dark:border-line-dark bg-paper-deep dark:bg-night-deep px-3 py-2 text-left font-mono text-xs uppercase tracking-wider">
            {children}
        </th>
    ),
    td: ({ children }) => (
        <td className="border border-line dark:border-line-dark px-3 py-2 align-top">{children}</td>
    ),
    code: ({ children }) => (
        <code className="font-mono text-sm bg-paper-deep dark:bg-night-deep px-1 rounded">{children}</code>
    ),
    pre: ({ children }) => (
        <pre className="overflow-x-auto bg-paper-deep dark:bg-night-deep p-4 rounded-lg mb-5">{children}</pre>
    ),
    blockquote: ({ children }) => (
        <blockquote className="border-l-2 border-sienna-deep pl-4 italic mb-5">{children}</blockquote>
    ),
};

export default function Show({ manuscript = {}, content = '', related = [], isPreview = false, attestation = null, latestRecord = null }) {
    const [copiedCitation, setCopiedCitation] = useState(false);

    // Build standard Glenride academic citation
    const citation = useMemo(() => {
        const author = manuscript.user?.name || 'Glenride Fellow';
        const year = manuscript.published_at ? new Date(manuscript.published_at).getFullYear() : '2026';
        return `${author} (${year}). "${manuscript.title}". Glenride Institutional Monographs, Document ID: ${manuscript.id}.`;
    }, [manuscript]);

    const handleCopyCitation = () => {
        navigator.clipboard.writeText(citation);
        setCopiedCitation(true);
        setTimeout(() => setCopiedCitation(false), 3000);
    };

    // Calculate approximate read time
    const readTime = useMemo(() => {
        const words = manuscript.word_count || (content ? content.split(/\s+/).length : 850);
        return Math.max(1, Math.ceil(words / 220));
    }, [manuscript.word_count, content]);

    // Drop a leading H1 that repeats the page title. Render-time only;
    // the stored file is untouched, so its sealed hash still holds.
    const bodyContent = useMemo(() => {
        if (!content) return '';
        const lines = content.split('\n');
        if (lines[0]?.trim() === `# ${manuscript.title}`) lines.shift();
        return lines.join('\n');
    }, [content, manuscript.title]);

    return (
        <div className="min-h-screen bg-paper text-ink dark:bg-night dark:text-cream font-serif selection:bg-sienna selection:text-ink">
            <Head title={`${manuscript.title} - The Vanguard Library`} />

            {/* Navigation Masthead */}
            <header className="sticky top-0 z-40 border-b border-line bg-paper dark:border-line-dark dark:bg-night">
                <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
                    <Link
                        href={route('library.index')}
                        className="inline-flex items-center text-xs font-mono font-semibold uppercase tracking-wider text-ink-soft dark:text-cream-soft hover:text-ink dark:hover:text-cream transition"
                    >
                        ← Back to Vanguard Library
                    </Link>

                    <div className="flex items-center space-x-3">
                        <button
                            type="button"
                            onClick={handleCopyCitation}
                            className="inline-flex items-center rounded-lg border border-line bg-paper dark:border-line-dark dark:bg-nightdark:bg-night-card px-3 py-1.5 text-xs font-mono text-ink dark:text-cream hover:bg-paper-deep dark:hover:bg-night-deep shadow-sm transition"
                        >
                            {copiedCitation ? '✓ Citation Copied' : 'Copy Citation'}
                        </button>
                        <button
                            type="button"
                            onClick={() => window.print()}
                            className="inline-flex items-center rounded-lg bg-ink px-3 py-1.5 text-xs font-mono font-semibold text-paper hover:bg-sienna hover:text-ink shadow-sm transition"
                        >
                            Print / PDF
                        </button>
                    </div>
                </div>
            </header>

            {/* Preview Banner if unpublished */}
            {isPreview && (
                <div className="border-b border-line bg-paper-deep dark:border-line-dark dark:bg-night-deep py-2.5 px-6 text-center text-xs font-mono text-ink dark:text-cream">
                    This manuscript is still being prepared and is not yet part of the public library.
                </div>
            )}

            {/* Main Reading Document */}
            <main className="mx-auto max-w-3xl px-6 py-16 sm:py-24">
                {/* Monograph Document Header */}
                <div className="border-b border-line dark:border-line-dark pb-10 mb-12">
                    <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-ink dark:text-cream leading-[1.15]">
                        {manuscript.title}
                    </h1>

                    <div className="mt-8 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-ink-soft dark:text-cream-soft border-t border-line dark:border-line-dark/60 pt-4">
                        <div>
                            <span className="block font-semibold text-ink dark:text-cream font-serif text-sm">
                                {manuscript.user?.name || 'Institutional Fellow'}
                            </span>
                            <span className="text-ink-soft dark:text-cream-soft">
                                Glenride // Policy Fellow
                            </span>
                        </div>

                        <div className="flex items-center space-x-4 text-right">
                            <div>
                                <span className="text-ink-soft dark:text-cream-soft">Date Released:</span>
                                <span className="ml-1 text-ink dark:text-cream">
                                    {manuscript.published_at
                                        ? new Date(manuscript.published_at).toLocaleDateString('en-US', {
                                              month: 'long',
                                              day: 'numeric',
                                              year: 'numeric',
                                          })
                                        : new Date().toLocaleDateString('en-US', {
                                              month: 'long',
                                              day: 'numeric',
                                              year: 'numeric',
                                          })}
                                </span>
                            </div>
                            <div>
                                <span className="text-ink-soft dark:text-cream-soft">Read Time:</span>
                                <span className="ml-1 text-ink dark:text-cream">{readTime} min read</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Glenride Attestation Seal */}
                <div className="mb-12">
                    <AttestationSeal attestation={attestation} />
                    {latestRecord && (
                        <p className="mt-3 font-mono text-xs text-ink-soft dark:text-cream-soft">
                            Recorded on SpinWave · v{latestRecord.version}
                            {latestRecord.created_at && (
                                <>
                                    {' · '}
                                    {new Date(latestRecord.created_at).toLocaleDateString('en-US', {
                                        month: 'long',
                                        day: 'numeric',
                                        year: 'numeric',
                                    })}
                                </>
                            )}
                            {latestRecord.record_hash && (
                                <span className="ml-2">{latestRecord.record_hash.slice(0, 12)}…</span>
                            )}
                        </p>
                    )}
                </div>

                {/* Abstract Callout */}
                {manuscript.abstract && (
                    <div className="rounded-2xl border border-line bg-paper-deep dark:border-line-dark dark:bg-night-deep p-6 mb-12 font-serif text-base text-ink dark:text-cream leading-relaxed italic">
                        <div className="font-mono text-xs not-italic font-bold uppercase tracking-wider text-sienna-deep dark:text-sienna mb-2">
                            Executive Abstract
                        </div>
                        {manuscript.abstract}
                    </div>
                )}

                {/* Brief Body Typography */}
                <article className="font-serif text-ink dark:text-cream leading-relaxed text-lg space-y-6">
                    {content ? (
                        <div className="brief-body font-serif text-base leading-relaxed text-ink dark:text-cream">
                            <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
                                {bodyContent}
                            </ReactMarkdown>
                        </div>
                    ) : (
                        <div className="space-y-8 font-serif text-base leading-relaxed">
                            <section>
                                <h2 className="font-display text-2xl font-bold text-ink dark:text-cream mt-8 mb-4 border-b border-line dark:border-line-dark pb-2">
                                    1. Executive Thesis & Problem Formulation
                                </h2>
                                <p className="text-ink dark:text-cream leading-relaxed">
                                    The modern operating environment forces leadership architectures to confront unprecedented velocity without sacrificing institutional stability. This Vanguard Policy Brief synthesizes primary empirical findings into actionable protocols designed to eliminate administrative latency.
                                </p>
                            </section>

                            <section>
                                <h2 className="font-display text-2xl font-bold text-ink dark:text-cream mt-8 mb-4 border-b border-line dark:border-line-dark pb-2">
                                    2. De-Jargonized Empirical Findings
                                </h2>
                                <p className="text-ink dark:text-cream leading-relaxed">
                                    Through systematic analysis of clinical data flows and high-assurance supply chains, three operational patterns emerge:
                                </p>
                                <ul className="list-disc pl-6 space-y-2 text-ink dark:text-cream mt-3">
                                    <li><strong>Velocity Without Fragility:</strong> Algorithmic orchestration delivers real-time analytical power only when combined with strict human ethical verification gates.</li>
                                    <li><strong>Supply Chain Redundancy:</strong> Decentralized localized production nodes minimize exposure to single-point maritime or political failure vectors.</li>
                                    <li><strong>Local-First IP Isolation:</strong> Core institutional intellectual capital must remain sequestered from public cloud training sets to prevent competitive degradation.</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="font-display text-2xl font-bold text-ink dark:text-cream mt-8 mb-4 border-b border-line dark:border-line-dark pb-2">
                                    3. Actionable Policy Recommendations
                                </h2>
                                <div className="space-y-4">
                                    <div className="rounded-xl border border-line bg-paper dark:border-line-dark dark:bg-nightdark:bg-night-card p-5 shadow-sm">
                                        <div className="font-bold text-ink dark:text-cream text-sm">Recommendation 1: Local-First Verification Mandates</div>
                                        <p className="text-ink-soft dark:text-cream-soft text-sm mt-1">Implement localized zero-trust ingestion protocols for all sensitive datasets, ensuring automated scrubbers operate behind institutional firewalls.</p>
                                    </div>
                                    <div className="rounded-xl border border-line bg-paper dark:border-line-dark dark:bg-nightdark:bg-night-card p-5 shadow-sm">
                                        <div className="font-bold text-ink dark:text-cream text-sm">Recommendation 2: Scholar Incentive Restructuring</div>
                                        <p className="text-ink-soft dark:text-cream-soft text-sm mt-1">Deploy automated $500 micro-grant compensation models upon verified compliance intake, accelerating independent doctoral contributions.</p>
                                    </div>
                                    <div className="rounded-xl border border-line bg-paper dark:border-line-dark dark:bg-nightdark:bg-night-card p-5 shadow-sm">
                                        <div className="font-bold text-ink dark:text-cream text-sm">Recommendation 3: Continuous Ethical Auditing</div>
                                        <p className="text-ink-soft dark:text-cream-soft text-sm mt-1">Require tripartite digital sign-offs (Ethics, Transparency, and Citation Authenticity) prior to model ingestion.</p>
                                    </div>
                                </div>
                            </section>

                            <section>
                                <h2 className="font-display text-2xl font-bold text-ink dark:text-cream mt-8 mb-4 border-b border-line dark:border-line-dark pb-2">
                                    4. Economic & Strategic Impact Projection
                                </h2>
                                <p className="text-ink dark:text-cream leading-relaxed">
                                    Adopting these strategic interventions insulates the enterprise against technological disruption while maintaining high-assurance regulatory compliance. Glenride provides ongoing executive advisory retainers to assist enterprise transitions.
                                </p>
                            </section>
                        </div>
                    )}
                </article>

                {/* Official Monograph End Note */}
                <div className="mt-16 pt-8 border-t border-line dark:border-line-dark font-mono text-xs text-ink-soft dark:text-cream-soft space-y-2">
                    <p>
                        <strong>Publication Notice:</strong> This monograph was prepared under the auspices of Glenride. Autonomous distillation executed via ThinkTank OS ContextForge. Human verification certified by institutional fellows.
                    </p>
                    <p>
                        <strong>Permanent Citation:</strong> {citation}
                    </p>
                </div>
            </main>

            {/* Footer */}
            <footer className="border-t border-line bg-paper dark:border-line-dark dark:bg-nightdark:bg-night-card py-12 text-xs text-ink-soft dark:text-cream-soft font-mono">
                <div className="mx-auto max-w-5xl px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div>© {new Date().getFullYear()} Glenride.</div>
                    <div className="flex items-center space-x-6">
                        <Link href={route('library.index')} className="hover:text-ink dark:hover:text-cream transition">
                            Vanguard Library
                        </Link>
                        <Link href={route('thesis.index')} className="hover:text-ink dark:hover:text-cream transition">
                            Institutional Thesis
                        </Link>
                        <Link href={route('dashboard')} className="hover:text-ink dark:hover:text-cream transition">
                            ThinkTank OS
                        </Link>
                        <a href="https://dvaughnhouse.com/terms" className="hover:text-ink dark:hover:text-cream transition">
                            Terms
                        </a>
                        <a href="https://dvaughnhouse.com/privacy" className="hover:text-ink dark:hover:text-cream transition">
                            Privacy
                        </a>
                        <a href="https://dvaughnhouse.com/#contact" className="hover:text-ink dark:hover:text-cream transition">
                            Contact
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    );
}
