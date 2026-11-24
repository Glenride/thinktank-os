import ImageBandCarousel from '@/Components/ImageBandCarousel';
import InstitutionalHeader from '@/Components/InstitutionalHeader';
import SiteFooter from '@/Components/SiteFooter';
import { Head, Link } from '@inertiajs/react';
import { useCallback } from 'react';

// Body band carousel — the chain at work, below the opening sections.
const BODY_BAND_IMAGES = [
    '/images/heroes/hero-jit.webp',
    '/images/heroes/hero-retail.webp',
    '/images/heroes/hero-last-mile.webp',
    '/images/heroes/hero-resilience.webp',
];

const RESEARCH_AREAS = [
    {
        name: 'Supply-Chain Resilience',
        line: 'Understanding the systems behind essential goods, identifying vulnerabilities, and examining what happens when critical links fail.',
    },
    {
        name: 'Pharmaceutical Intelligence',
        line: 'Evaluating drug shortage information and pharmaceutical data to provide clear, source-attributed intelligence.',
    },
    {
        name: 'Applied AI and Enterprise Software',
        line: 'Building practical software systems that turn research, data, and institutional knowledge into useful capabilities.',
    },
];

const WORK_STEPS = [
    {
        verb: 'Investigate.',
        line: 'Identify vulnerabilities, examine evidence, and understand the systems behind complex problems.',
    },
    {
        verb: 'Build.',
        line: 'Develop software, analytical tools, and practical models that address what the research reveals.',
    },
    {
        verb: 'Verify.',
        line: 'Document the evidence, methodology, and results so others can independently examine the work.',
    },
];

// Branding upgrade, Nov 24, 2026 — design retained, copy shortened,
// visuals inserted in place. Standalone visuals live in public/visuals/.
// The frame fits its content height on load and whenever the content
// changes size (same-origin), so no dead space sits below a visual.
function VisualFrame({ title, src, height = 720 }) {
    const fit = useCallback((frame) => {
        if (!frame) return;
        try {
            const doc = frame.contentDocument;
            if (!doc) return;
            const h = doc.documentElement.scrollHeight;
            if (h > 0) frame.style.height = `${h}px`;
        } catch (e) {
            // Cross-origin or not loaded yet: keep the set height.
        }
    }, []);

    const onLoad = useCallback(
        (event) => {
            const frame = event.currentTarget;
            fit(frame);
            try {
                const doc = frame.contentDocument;
                if (doc && doc.body && !frame._glenrideResizeObserver) {
                    frame._glenrideResizeObserver = new ResizeObserver(() =>
                        fit(frame),
                    );
                    frame._glenrideResizeObserver.observe(doc.body);
                }
            } catch (e) {
                // Keep the set height.
            }
        },
        [fit],
    );

    return (
        <iframe
            title={title}
            src={src}
            loading="lazy"
            onLoad={onLoad}
            style={{ height: `${height}px` }}
            className="mt-10 w-full overflow-hidden rounded border border-line bg-paper dark:border-line-dark dark:bg-night-card"
        />
    );
}

const VISUAL_HEADING =
    'font-display text-3xl font-bold tracking-tight text-ink dark:text-cream sm:text-4xl';

const CURATED_FALLBACK = {
    id: 'featured-monograph-1',
    title: 'Autonomous Agentic Governance in High-Assurance Sectors',
    abstract:
        'A strategic framework addressing the latency gap between rapid algorithmic decision-making and human moral verification across clinical trial data pipelines and defense infrastructure.',
    published_at: '2026-09-15',
    attestation_public_id: null,
    record_version: null,
};

function formatDate(value) {
    if (!value) return null;
    return new Date(value).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    });
}

export default function Landing({
    featuredBriefs = [],
    publishedCount = 0,
    attestationCount = 0,
    attestationIssuedCount = null,
    attestationAnchoredCount = null,
    essayCount = 0,
    auth,
}) {
    const briefs = featuredBriefs.length > 0 ? featuredBriefs : [CURATED_FALLBACK];

    return (
        <div className="min-h-screen bg-paper font-serif text-ink selection:bg-sienna selection:text-ink dark:bg-night dark:text-cream">
            <Head title="Supply chains, seen clearly." />

            <InstitutionalHeader
                auth={auth}
                active="home"
                subtitle="Independent, AI-Native Think Tank"
            />

            {/* Hero — one message, not a rotation. A visitor should know
                what Glenride is, what it does, and why it matters in the
                first screen. */}
            <section className="relative overflow-hidden bg-ink">
                <img
                    src="/images/heroes/hero-port-sunset.webp"
                    alt=""
                    fetchPriority="high"
                    className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-ink/65" />
                <div className="relative mx-auto max-w-7xl px-6 py-28 lg:px-8 lg:py-36">
                    <p className="font-mono text-xs uppercase tracking-widest text-paper/70">
                        Independent, AI-Native Think Tank
                    </p>
                    <h1 className="mt-6 max-w-3xl font-display text-5xl font-bold leading-tight tracking-tight text-paper sm:text-6xl">
                        Supply chains, seen clearly.
                    </h1>
                    <p className="mt-6 font-display text-2xl font-bold text-sienna">
                        Built to be checked.
                    </p>
                    <div className="mt-6 max-w-2xl space-y-4 text-lg leading-relaxed text-paper/85">
                        <p>
                            Critical systems rarely fail without warning. The
                            signals are there—in the data, the dependencies,
                            and the decisions made along the way.
                        </p>
                        <p>
                            Glenride investigates vulnerabilities in the
                            systems modern life depends on, turning fragmented
                            information into actionable intelligence that
                            people can examine, verify, and use.
                        </p>
                    </div>
                    <div className="mt-10 flex flex-wrap gap-4">
                        <Link
                            href={route('research.index')}
                            className="rounded-full bg-sienna px-6 py-3 text-sm font-semibold text-ink transition hover:bg-sienna-deep hover:text-paper"
                        >
                            Explore Our Research
                        </Link>
                        <Link
                            href={route('library.index')}
                            className="rounded-full border border-paper/60 px-6 py-3 text-sm font-semibold text-paper transition hover:border-paper hover:bg-paper/10"
                        >
                            Enter the Vanguard Library
                        </Link>
                    </div>
                    {!auth?.user && (
                        <p className="mt-10 font-mono text-xs uppercase tracking-widest text-paper/60">
                            Fellows and scholars —{' '}
                            <Link
                                href={route('login')}
                                className="font-semibold text-paper underline decoration-sienna decoration-2 underline-offset-4 transition hover:text-sienna"
                            >
                                Scholar sign in
                            </Link>
                        </p>
                    )}
                </div>
            </section>

            {/* What Glenride is — the power-wisdom gap */}
            <section
                id="about"
                className="border-b border-line dark:border-line-dark"
            >
                <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
                    <div className="max-w-3xl">
                        <h2 className="font-display text-3xl font-bold tracking-tight text-ink dark:text-cream sm:text-4xl">
                            Closing the power-wisdom gap.
                        </h2>
                        <div className="mt-6 space-y-5 text-lg leading-relaxed text-ink-soft dark:text-cream-soft">
                            <p>
                                Technology expands what we can do. Evidence
                                and sound judgment help us decide what we
                                should do.
                            </p>
                            <p>
                                Glenride is an independent, AI-native think
                                tank studying the vulnerabilities,
                                dependencies, and emerging risks within
                                critical systems.
                            </p>
                            <p>
                                We combine independent research, artificial
                                intelligence, and human judgment to identify
                                problems, evaluate evidence, and develop
                                practical solutions.
                            </p>
                            <p>— D'Vaughn House, Founder</p>
                        </div>

                        <VisualFrame
                            title="Power and wisdom"
                            src="/visuals/power-wisdom.html"
                            height={720}
                        />
                    </div>

                    <dl className="mt-14 border-t border-line dark:border-line-dark">
                        {RESEARCH_AREAS.map((area) => (
                            <div
                                key={area.name}
                                className="grid gap-2 border-b border-line py-7 dark:border-line-dark sm:grid-cols-3 sm:gap-8"
                            >
                                <dt className="font-display text-xl font-bold text-ink dark:text-cream">
                                    {area.name}
                                </dt>
                                <dd className="text-base leading-relaxed text-ink-soft dark:text-cream-soft sm:col-span-2">
                                    {area.line}
                                </dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </section>

            {/* Research that moves beyond the page */}
            <section className="border-b border-line dark:border-line-dark">
                <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
                    <div className="max-w-3xl">
                        <h2 className={VISUAL_HEADING}>
                            Research that moves beyond the page.
                        </h2>
                        <p className="mt-6 text-lg leading-relaxed text-ink-soft dark:text-cream-soft">
                            We believe research should do more than describe
                            problems. It should help people understand them,
                            test possible solutions, and make better decisions.
                        </p>
                    </div>
                    <div className="mt-10 grid gap-8 border-t border-line pt-10 dark:border-line-dark md:grid-cols-3">
                        {WORK_STEPS.map((step) => (
                            <div key={step.verb}>
                                <h3 className="font-display text-xl font-bold text-ink dark:text-cream">
                                    {step.verb}
                                </h3>
                                <p className="mt-3 leading-relaxed text-ink-soft dark:text-cream-soft">
                                    {step.line}
                                </p>
                            </div>
                        ))}
                    </div>
                    <p className="mt-10 max-w-3xl text-lg leading-relaxed text-ink-soft dark:text-cream-soft">
                        The objective is not simply to produce more
                        information. It is to make information more useful,
                        reliable, and accountable.
                    </p>
                </div>
            </section>

            {/* Human and AI — AI prepares, humans decide */}
            <section className="border-b border-line dark:border-line-dark">
                <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
                    <div className="max-w-3xl">
                        <h2 className={VISUAL_HEADING}>
                            AI prepares. Humans decide.
                        </h2>
                        <div className="mt-6 space-y-5 text-lg leading-relaxed text-ink-soft dark:text-cream-soft">
                            <p>
                                Artificial intelligence can accelerate
                                research, organize information, identify
                                patterns, and prepare analysis.
                            </p>
                            <p>
                                But important decisions require human judgment
                                and accountability.
                            </p>
                            <p>
                                At Glenride, AI supports the work. People
                                remain responsible for evaluating evidence,
                                interpreting findings, and making decisions.
                            </p>
                        </div>
                    </div>
                    <VisualFrame
                        title="Human and AI collaboration"
                        src="/visuals/human-ai.html"
                        height={720}
                    />
                </div>
            </section>

            {/* The chain, end to end — rotating body band */}
            <ImageBandCarousel
                images={BODY_BAND_IMAGES}
                label="The supply chain, end to end"
            />

            {/* The chain, end to end — interactive journey */}
            <section className="border-b border-line dark:border-line-dark">
                <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
                    <div className="max-w-3xl">
                        <h2 className={VISUAL_HEADING}>
                            The chain, end to end.
                        </h2>
                        <div className="mt-6 space-y-5 text-lg leading-relaxed text-ink-soft dark:text-cream-soft">
                            <p>
                                A supply chain is only as resilient as the
                                relationships connecting it.
                            </p>
                            <p>
                                We examine the full journey—from sourcing and
                                manufacturing to transportation, distribution,
                                and delivery—to understand where disruptions
                                originate, how they spread, and where
                                intervention matters most.
                            </p>
                            <p className="font-mono text-sm font-semibold tracking-wide text-ink dark:text-cream">
                                Sourcing → Manufacturing → Transportation →
                                Distribution → Delivery
                            </p>
                            <p>
                                One disruption can affect an entire system.
                                Understanding the connections makes it possible
                                to see risks that individual organizations may
                                overlook.
                            </p>
                        </div>
                        <Link
                            href={route('research.index')}
                            className="mt-8 inline-flex items-center font-mono text-sm font-semibold text-sienna-deep transition hover:text-ink dark:text-sienna dark:hover:text-cream"
                        >
                            Explore Supply-Chain Research →
                        </Link>
                    </div>
                    <VisualFrame
                        title="The chain, end to end"
                        src="/visuals/chain-journey.html"
                        height={720}
                    />
                </div>
            </section>

            {/* Pharmaceutical intelligence — Pearls */}
            <section className="border-b border-line dark:border-line-dark">
                <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
                    <div className="max-w-3xl">
                        <h2 className={VISUAL_HEADING}>
                            Pharmaceutical intelligence. With sources
                            attached.
                        </h2>
                        <div className="mt-6 space-y-5 text-lg leading-relaxed text-ink-soft dark:text-cream-soft">
                            <p>
                                Drug shortage information changes. Sources
                                differ. Reporting dates matter.
                            </p>
                            <p>
                                Glenride publishes a weekly U.S. drug shortage
                                digest that brings together information from
                                authoritative public sources, including the FDA
                                and ASHP.
                            </p>
                            <p>
                                Every reported figure is accompanied by its
                                source and reporting date. Our goal is to make
                                shortage information easier to examine,
                                understand, and verify.
                            </p>
                            <p>
                                <span className="font-semibold text-ink dark:text-cream">
                                    Pearls — Shortage Signal.
                                </span>{' '}
                                A pharmaceutical intelligence service developed
                                to make drug shortage information more
                                accessible and accountable.
                            </p>
                            <p>
                                ASHP 197 live bulletins. FDA 69 of 75. Nov
                                23, 2026. Pearls, at{' '}
                                <a
                                    href="https://pearls.glenride.com"
                                    className="font-semibold text-sienna-deep transition hover:text-ink dark:text-sienna dark:hover:text-cream"
                                >
                                    pearls.glenride.com
                                </a>
                                . Attestation GLR-AT-2026-6ZGY2J.
                            </p>
                        </div>
                        <div className="mt-8 flex flex-wrap gap-4">
                            <a
                                href="https://pearls.glenride.com"
                                className="rounded-full bg-sienna px-6 py-3 text-sm font-semibold text-ink transition hover:bg-sienna-deep hover:text-paper"
                            >
                                Explore Pearls
                            </a>
                            <Link
                                href={route('drug-shortages.current')}
                                className="rounded-full border border-line px-6 py-3 text-sm font-semibold text-ink transition hover:border-ink dark:border-line-dark dark:text-cream dark:hover:border-cream"
                            >
                                Read the Latest Weekly Digest
                            </Link>
                        </div>
                    </div>
                    <VisualFrame
                        title="Pharmaceutical data evaluation"
                        src="/visuals/pharma-dashboard.html"
                        height={800}
                    />
                </div>
            </section>

            {/* Applied AI — working software, live */}
            <section className="border-b border-line dark:border-line-dark">
                <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
                    <div className="max-w-3xl">
                        <h2 className={VISUAL_HEADING}>
                            Applied AI and enterprise software.
                        </h2>
                        <p className="mt-6 text-lg leading-relaxed text-ink-soft dark:text-cream-soft">
                            Working software, live.
                        </p>
                        <p className="mt-5 text-lg leading-relaxed text-ink-soft dark:text-cream-soft">
                            ThinkTank OS is the route for scholars: submit
                            your work, and Glenride attests the record and
                            anchors it to the blockchain.
                        </p>
                    </div>
                    <VisualFrame
                        title="Applied AI and enterprise software"
                        src="/visuals/applied-ai.html"
                        height={900}
                    />
                </div>
            </section>

            {/* The proof layer — Built to be checked */}
            <section className="border-b border-line bg-paper-deep dark:border-line-dark dark:bg-night-card">
                <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
                    <div className="max-w-3xl">
                        <h2 className="font-display text-3xl font-bold tracking-tight text-ink dark:text-cream sm:text-4xl">
                            Built to be checked.
                        </h2>
                        <div className="mt-6 space-y-5 text-lg leading-relaxed text-ink-soft dark:text-cream-soft">
                            <p>
                                A claim is only as useful as the evidence
                                supporting it.
                            </p>
                            <p>
                                Glenride&apos;s attestation framework creates
                                a public record connecting a claim to its
                                supporting evidence, verifier, and timestamp.
                            </p>
                            <p>
                                Each record is designed to make the work
                                easier to inspect and challenge.
                            </p>
                        </div>
                        <p className="mt-8 font-mono text-sm font-semibold uppercase tracking-widest text-ink dark:text-cream">
                            The record identifies:
                        </p>
                        <ul className="mt-4 space-y-2 text-lg leading-relaxed text-ink-soft dark:text-cream-soft">
                            <li>The claim being made.</li>
                            <li>The evidence supporting it.</li>
                            <li>The verification performed.</li>
                            <li>The responsible verifier.</li>
                            <li>The timestamp and record history.</li>
                        </ul>
                        <p className="mt-8 text-lg leading-relaxed text-ink-soft dark:text-cream-soft">
                            Verification should not depend on taking our word
                            for it.
                        </p>
                        <p className="mt-5 text-lg leading-relaxed text-ink-soft dark:text-cream-soft">
                            <span className="font-semibold text-ink dark:text-cream">
                                {attestationIssuedCount ?? attestationCount}{' '}
                                attestations issued. {attestationCount} in force
                                {attestationAnchoredCount !== null &&
                                    `. ${attestationAnchoredCount} anchored`}
                                .
                            </span>{' '}
                            Across{' '}
                            <span className="font-semibold text-ink dark:text-cream">
                                {publishedCount}{' '}
                                {publishedCount === 1
                                    ? 'published brief'
                                    : 'published briefs'}
                            </span>{' '}
                            in the Vanguard Library.
                        </p>
                        <VisualFrame
                            title="Proof, not promises"
                            src="/visuals/proof.html"
                            height={800}
                        />
                        <Link
                            href={route('attestations.index')}
                            className="mt-8 inline-flex items-center font-mono text-sm font-semibold text-sienna-deep transition hover:text-ink dark:text-sienna dark:hover:text-cream"
                        >
                            Browse the Public Attestation Registry →
                        </Link>
                    </div>
                </div>
            </section>

            {/* From the Vanguard Library */}
            <section className="border-b border-line dark:border-line-dark">
                <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
                    <div className="flex flex-wrap items-end justify-between gap-4">
                        <div>
                            <h2 className="font-display text-3xl font-bold tracking-tight text-ink dark:text-cream sm:text-4xl">
                                Research you can examine.
                            </h2>
                            <p className="mt-3 font-display text-xl font-bold text-ink dark:text-cream">
                                The Vanguard Library
                            </p>
                        </div>
                        <Link
                            href={route('library.index')}
                            className="font-mono text-sm font-semibold text-sienna-deep transition hover:text-ink dark:text-sienna dark:hover:text-cream"
                        >
                            All monographs →
                        </Link>
                    </div>

                    <div className="mt-6 max-w-3xl space-y-5 text-lg leading-relaxed text-ink-soft dark:text-cream-soft">
                        <p>
                            The Vanguard Library is Glenride&apos;s public
                            research collection.
                        </p>
                        <p>
                            It brings together original research, technical
                            briefs, independent analysis, and computational
                            replications.
                        </p>
                        <p>
                            We publish not only conclusions, but also the
                            supporting methodology, relevant evidence, and
                            technical records wherever available.
                        </p>
                        <p>
                            15 published briefs. Research across disciplines.
                            Evidence open to examination.
                        </p>
                    </div>
                    <VisualFrame
                        title="Vanguard Library"
                        src="/visuals/library.html"
                        height={900}
                    />

                    <div className="mt-10 border-t border-line dark:border-line-dark">
                        {briefs.map((brief) => (
                            <article
                                key={brief.id}
                                className="group border-b border-line py-8 dark:border-line-dark"
                            >
                                <div className="flex flex-wrap items-baseline justify-between gap-3">
                                    <h3 className="max-w-3xl font-display text-2xl font-bold leading-snug text-ink transition group-hover:text-sienna-deep dark:text-cream dark:group-hover:text-sienna">
                                        <Link href={route('briefs.show', brief.id)}>
                                            {brief.title}
                                        </Link>
                                    </h3>
                                    {formatDate(brief.published_at) && (
                                        <span className="font-mono text-xs text-ink-soft dark:text-cream-soft">
                                            {formatDate(brief.published_at)}
                                        </span>
                                    )}
                                </div>
                                {brief.abstract && (
                                    <p className="mt-3 max-w-3xl leading-relaxed text-ink-soft dark:text-cream-soft">
                                        {brief.abstract}
                                    </p>
                                )}
                                {brief.attestation_public_id && (
                                    <p className="mt-4 font-mono text-xs font-semibold text-sienna-deep dark:text-sienna">
                                        Witnessed by Glenride · {brief.attestation_public_id}
                                    </p>
                                )}
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            {/* Innovation flywheel — from research to practical application */}
            <section className="border-b border-line dark:border-line-dark">
                <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
                    <div className="max-w-3xl">
                        <h2 className={VISUAL_HEADING}>
                            From research to practical application.
                        </h2>
                        <div className="mt-6 space-y-5 text-lg leading-relaxed text-ink-soft dark:text-cream-soft">
                            <p>
                                We believe important ideas should have the
                                opportunity to become useful things.
                            </p>
                            <p>
                                Glenride connects research with software
                                development, experimentation, and venture
                                creation. When an identified problem calls for
                                a practical solution, we explore whether that
                                solution can become a working product, service,
                                or independent business.
                            </p>
                            <p className="font-mono text-sm font-semibold tracking-wide text-ink dark:text-cream">
                                Research → Discovery → Development →
                                Application → Evaluation
                            </p>
                            <p>
                                The results of practical work can inform new
                                research, while research can reveal
                                opportunities for new products and ventures.
                            </p>
                        </div>
                    </div>
                    <VisualFrame
                        title="Innovation flywheel"
                        src="/visuals/flywheel.html"
                        height={720}
                    />
                </div>
            </section>

            {/* Closing */}
            <section className="border-b border-line bg-ink dark:border-line-dark">
                <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
                    <div className="max-w-3xl">
                        <h2 className="font-display text-3xl font-bold tracking-tight text-paper sm:text-4xl">
                            Independent thinking. Verifiable work.
                        </h2>
                        <div className="mt-6 space-y-5 text-lg leading-relaxed text-paper/85">
                            <p>
                                Glenride exists to help close the distance
                                between what humanity can do and what humanity
                                can responsibly accomplish.
                            </p>
                            <p>
                                We study critical systems, develop practical
                                intelligence, and build tools that help people
                                make better-informed decisions.
                            </p>
                            <p>
                                We believe the greatest value of knowledge is
                                realized when it can be put to work—and when
                                the work can stand up to scrutiny.
                            </p>
                        </div>
                        <p className="mt-8 font-display text-2xl font-bold text-sienna">
                            Glenride. Built to be checked.
                        </p>
                        <div className="mt-8 flex flex-wrap gap-4">
                            <Link
                                href={route('research.index')}
                                className="rounded-full bg-sienna px-6 py-3 text-sm font-semibold text-ink transition hover:bg-sienna-deep hover:text-paper"
                            >
                                Explore Our Work
                            </Link>
                            <Link
                                href={route('library.index')}
                                className="rounded-full border border-paper/60 px-6 py-3 text-sm font-semibold text-paper transition hover:border-paper hover:bg-paper/10"
                            >
                                Enter the Vanguard Library
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Doors */}
            <section>
                <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
                    <h2 className="font-display text-3xl font-bold tracking-tight text-ink dark:text-cream sm:text-4xl">
                        Go deeper
                    </h2>
                    <div className="mt-10 border-t border-line dark:border-line-dark">
                        <Link
                            href={route('essays.index')}
                            className="group flex flex-wrap items-baseline justify-between gap-2 border-b border-line py-6 transition dark:border-line-dark"
                        >
                            <span className="font-display text-xl font-bold text-ink transition group-hover:text-sienna-deep dark:text-cream dark:group-hover:text-sienna">
                                Essays
                            </span>
                            <span className="text-sm text-ink-soft dark:text-cream-soft">
                                Long-form foundational writing
                                {essayCount > 0
                                    ? ` — ${essayCount} published`
                                    : ''}{' '}
                                →
                            </span>
                        </Link>
                        <Link
                            href={route('standards.show')}
                            className="group flex flex-wrap items-baseline justify-between gap-2 border-b border-line py-6 transition dark:border-line-dark"
                        >
                            <span className="font-display text-xl font-bold text-ink transition group-hover:text-sienna-deep dark:text-cream dark:group-hover:text-sienna">
                                Standards
                            </span>
                            <span className="text-sm text-ink-soft dark:text-cream-soft">
                                The standards Glenride works to →
                            </span>
                        </Link>
                        <Link
                            href={route('store.index')}
                            className="group flex flex-wrap items-baseline justify-between gap-2 border-b border-line py-6 transition dark:border-line-dark"
                        >
                            <span className="font-display text-xl font-bold text-ink transition group-hover:text-sienna-deep dark:text-cream dark:group-hover:text-sienna">
                                Store
                            </span>
                            <span className="text-sm text-ink-soft dark:text-cream-soft">
                                Commercial work and executive salons →
                            </span>
                        </Link>
                        <Link
                            href={route('research.index')}
                            className="group flex flex-wrap items-baseline justify-between gap-2 border-b border-line py-6 transition dark:border-line-dark"
                        >
                            <span className="font-display text-xl font-bold text-ink transition group-hover:text-sienna-deep dark:text-cream dark:group-hover:text-sienna">
                                Research
                            </span>
                            <span className="text-sm text-ink-soft dark:text-cream-soft">
                                Original statistics from Glenride&apos;s own data →
                            </span>
                        </Link>
                        <div className="border-b border-line py-6 dark:border-line-dark">
                            <p className="font-display text-xl font-bold text-ink dark:text-cream">
                                What you can check before you reach out
                            </p>
                            <ul className="mt-3 space-y-2 text-sm leading-relaxed text-ink-soft dark:text-cream-soft">
                                <li>Published daily — The Dispatch.</li>
                                <li>
                                    Every Monday — a public weekly U.S. drug
                                    shortage digest, from FDA and ASHP data:
                                    ASHP 197 live bulletins, FDA 69 of 75, Nov
                                    23, 2026.
                                </li>
                                <li>
                                    Attested — every record in the public registry
                                    carries its evidence, verifier, and timestamp.{' '}
                                    <Link
                                        href={route('attestations.index')}
                                        className="font-semibold text-sienna-deep transition hover:text-ink dark:text-sienna dark:hover:text-cream"
                                    >
                                        Browse the registry →
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <a
                            id="contact"
                            href="mailto:dvaughn@dvaughnhouse.com"
                            className="group flex flex-wrap items-baseline justify-between gap-2 border-b border-line py-6 transition dark:border-line-dark"
                        >
                            <span className="font-display text-xl font-bold text-ink transition group-hover:text-sienna-deep dark:text-cream dark:group-hover:text-sienna">
                                Contact
                            </span>
                            <span className="text-sm text-ink-soft dark:text-cream-soft">
                                dvaughn@dvaughnhouse.com →
                            </span>
                        </a>
                    </div>
                </div>
            </section>

            <SiteFooter />
        </div>
    );
}
