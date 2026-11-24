import HeroCarousel from '@/Components/HeroCarousel';
import ImageBandCarousel from '@/Components/ImageBandCarousel';
import InstitutionalHeader from '@/Components/InstitutionalHeader';
import SiteFooter from '@/Components/SiteFooter';
import { Head, Link } from '@inertiajs/react';

// Gateway hero slides — full-bleed images, each with its own overlay copy.
const HERO_SLIDES = [
    {
        image: '/images/heroes/hero-port-sunset.webp',
        headline: 'Supply chains, seen clearly.',
        line: 'For operators and decision-makers: Glenride tracks how critical supply chains fail, where they bend, and what keeps them running — before the break reaches you.',
        ctaLabel: 'Enter the Vanguard Library',
        ctaHref: route('library.index'),
    },
    {
        image: '/images/heroes/hero-global-network.webp',
        headline: 'Research that signs its work.',
        line: 'I wish there was a record I could check, not a claim I had to take on trust. Every brief carries its evidence, its verifier, and its date — attested, and open to challenge.',
        ctaLabel: 'View the attestations',
        ctaHref: route('attestations.index'),
    },
    {
        image: '/images/heroes/hero-ship-risk.webp',
        headline: 'Shortages, measured — not guessed.',
        line: 'I hate finding out a drug is in shortage from a pharmacist. Every Monday, Glenride publishes a weekly U.S. drug shortage digest — what is in shortage, what resolved, and why — from FDA and ASHP data. As of Q3 2026: 225 active U.S. drug shortages, 87 new this year.',
        ctaLabel: 'Read the weekly digest',
        ctaHref: route('library.index'),
    },
    {
        image: '/images/heroes/hero-port-lanes.webp',
        headline: 'Built to be checked.',
        line: 'Briefs, standards, and a store where everything has a price and nothing is promised.',
        ctaLabel: 'Visit the store',
        ctaHref: route('store.index'),
    },
    {
        image: '/images/heroes/hero-trucks.webp',
        headline: 'Every mile, accounted for.',
        line: 'Ports, rails, roads, and runways are one chain. Glenride reads it whole — and publishes what it finds.',
        ctaLabel: 'Enter the Library',
        ctaHref: route('library.index'),
    },
    {
        image: '/images/heroes/hero-air-sea.webp',
        headline: "Modes change. The record doesn't.",
        line: 'Air to sea to road, critical cargo keeps its evidence — every handoff timed, signed, and open to challenge.',
        ctaLabel: 'See the attestations',
        ctaHref: route('attestations.index'),
    },
    {
        image: '/images/heroes/hero-cold-chain.webp',
        headline: 'The cold chain, held to the degree.',
        line: 'Temperature, humidity, shock — the conditions a medicine travels in are part of its record, not a footnote.',
        ctaLabel: 'Read the Thesis',
        ctaHref: route('thesis.index'),
    },
    {
        image: '/images/heroes/hero-control-room.webp',
        headline: 'Watched, end to end.',
        line: 'A chain you can see is a chain you can fix. Exceptions surface early — and so do the people answering for them.',
        ctaLabel: 'Read the Essays',
        ctaHref: route('essays.index'),
    },
];

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
        line: 'See where the chain breaks, before harm hits.',
    },
    {
        name: 'Pharmaceutical Data Evaluation',
        line: 'What is in shortage, this week, with source and date.',
    },
    {
        name: 'Applied AI & Enterprise Software Systems',
        line: 'Working software, live. Work in progress, labeled as it stands.',
    },
];

// Branding upgrade, Nov 24, 2026 — design retained, copy shortened,
// visuals inserted in place. Standalone visuals live in public/visuals/.
function VisualFrame({ title, src, height = 720 }) {
    return (
        <iframe
            title={title}
            src={src}
            loading="lazy"
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
            <Head title="Weekly U.S. Drug Shortage Digest | Glenride" />

            <InstitutionalHeader
                auth={auth}
                active="home"
                subtitle="Independent, AI-Native Think Tank"
            />

            {/* Gateway — this landing page is the site's Routing Hub.
                Hero: full-bleed rotating image carousel with a flat ink
                scrim; the Glenride wordmark stays the persistent H1 and
                each slide carries its own headline, line, and CTA. */}
            <HeroCarousel slides={HERO_SLIDES}>
                {!auth?.user && (
                    <p className="mt-10 font-mono text-xs uppercase tracking-widest text-paper/60 dark:text-cream-soft">
                        Fellows and scholars —{' '}
                        <Link
                            href={route('login')}
                            className="font-semibold text-paper underline decoration-sienna decoration-2 underline-offset-4 transition hover:text-sienna dark:text-cream"
                        >
                            Scholar sign in
                        </Link>
                    </p>
                )}
            </HeroCarousel>

            {/* What Glenride is */}
            <section
                id="about"
                className="border-b border-line dark:border-line-dark"
            >
                <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
                    <div className="max-w-3xl">
                        <h2 className="font-display text-3xl font-bold tracking-tight text-ink dark:text-cream sm:text-4xl">
                            Built to close the power-wisdom gap
                        </h2>
                        <div className="mt-6 space-y-5 text-lg leading-relaxed text-ink-soft dark:text-cream-soft">
                            <p>Capability grows fast. Wisdom has to keep up.</p>
                            <p>
                                Glenride is an independent, AI-native think tank.
                                We find where critical systems break before the
                                break becomes harm — and we publish a record
                                anyone can check.
                            </p>
                            <p>
                                We study supply chain vulnerabilities,
                                pharmaceutical data, and the software systems
                                modern life quietly depends on. Every Monday we
                                publish a weekly U.S. drug shortage digest,
                                with source and date on every number.
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

            {/* Human and AI — AI prepares, humans decide */}
            <section className="border-b border-line dark:border-line-dark">
                <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
                    <div className="max-w-3xl">
                        <h2 className={VISUAL_HEADING}>
                            AI prepares, humans decide.
                        </h2>
                        <p className="mt-6 text-lg leading-relaxed text-ink-soft dark:text-cream-soft">
                            Machines propose, but humans are the source of all
                            decisions.
                        </p>
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
                overlayLine="The chain, end to end."
                label="The supply chain, end to end"
            />

            {/* The chain, end to end — interactive journey */}
            <section className="border-b border-line dark:border-line-dark">
                <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
                    <div className="max-w-3xl">
                        <h2 className={VISUAL_HEADING}>
                            The chain, end to end.
                        </h2>
                        <p className="mt-6 text-lg leading-relaxed text-ink-soft dark:text-cream-soft">
                            One medicine, six stages. Tap a stage to see where
                            it breaks.
                        </p>
                    </div>
                    <VisualFrame
                        title="The chain, end to end"
                        src="/visuals/chain-journey.html"
                        height={720}
                    />
                </div>
            </section>

            {/* Pharmaceutical data evaluation — Pearls */}
            <section className="border-b border-line dark:border-line-dark">
                <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
                    <div className="max-w-3xl">
                        <h2 className={VISUAL_HEADING}>
                            What is in shortage, this week.
                        </h2>
                        <p className="mt-6 text-lg leading-relaxed text-ink-soft dark:text-cream-soft">
                            ASHP 197 live bulletins. FDA 69 of 75. Nov 23,
                            2026. Pearls, at{' '}
                            <a
                                href="https://pearls.glenride.com"
                                className="font-semibold text-sienna-deep transition hover:text-ink dark:text-sienna dark:hover:text-cream"
                            >
                                pearls.glenride.com
                            </a>
                            . Attestation GLR-AT-2026-6ZGY2J.
                        </p>
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
                            Built to be checked.
                        </h2>
                        <p className="mt-6 text-lg leading-relaxed text-ink-soft dark:text-cream-soft">
                            Working software, live. Work in progress, labeled
                            as it stands.
                        </p>
                    </div>
                    <VisualFrame
                        title="Applied AI and enterprise software"
                        src="/visuals/applied-ai.html"
                        height={900}
                    />
                </div>
            </section>

            {/* Innovation flywheel — research to business, and back */}
            <section className="border-b border-line dark:border-line-dark">
                <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
                    <div className="max-w-3xl">
                        <h2 className={VISUAL_HEADING}>
                            Research to business, and back.
                        </h2>
                        <p className="mt-6 text-lg leading-relaxed text-ink-soft dark:text-cream-soft">
                            Ventures means businesses. A model, not measured
                            results.
                        </p>
                    </div>
                    <VisualFrame
                        title="Innovation flywheel"
                        src="/visuals/flywheel.html"
                        height={720}
                    />
                </div>
            </section>

            {/* The proof layer */}
            <section className="border-b border-line bg-paper-deep dark:border-line-dark dark:bg-night-card">
                <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
                    <div className="max-w-3xl">
                        <h2 className="font-display text-3xl font-bold tracking-tight text-ink dark:text-cream sm:text-4xl">
                            Proof, not promises.
                        </h2>
                        <p className="mt-6 text-lg leading-relaxed text-ink-soft dark:text-cream-soft">
                            Every attested work carries a signed Glenride
                            record: the claim, the evidence, the verifier, and
                            the timestamp. The record is public, and anyone can
                            verify it, or challenge it.
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
                            Browse the public registry →
                        </Link>
                    </div>
                </div>
            </section>

            {/* From the Vanguard Library */}
            <section className="border-b border-line dark:border-line-dark">
                <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
                    <div className="flex flex-wrap items-end justify-between gap-4">
                        <h2 className="font-display text-3xl font-bold tracking-tight text-ink dark:text-cream sm:text-4xl">
                            From the Vanguard Library
                        </h2>
                        <Link
                            href={route('library.index')}
                            className="font-mono text-sm font-semibold text-sienna-deep transition hover:text-ink dark:text-sienna dark:hover:text-cream"
                        >
                            All monographs →
                        </Link>
                    </div>

                    <p className="mt-6 max-w-3xl text-lg leading-relaxed text-ink-soft dark:text-cream-soft">
                        15 published briefs. Covers, abstracts, categories,
                        full publication links.
                    </p>
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
                                {(brief.attestation_public_id || brief.record_version) && (
                                    <p className="mt-4 font-mono text-xs font-semibold text-sienna-deep dark:text-sienna">
                                        {brief.attestation_public_id && (
                                            <>Witnessed by Glenride · {brief.attestation_public_id}</>
                                        )}
                                        {brief.attestation_public_id && brief.record_version && ' · '}
                                        {brief.record_version && (
                                            <>SpinWave record v{brief.record_version}</>
                                        )}
                                    </p>
                                )}
                            </article>
                        ))}
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
                                The record, before you reach out
                            </p>
                            <ul className="mt-3 space-y-2 text-sm leading-relaxed text-ink-soft dark:text-cream-soft">
                                <li>
                                    Published daily — The Dispatch, triple-checked
                                    before it posts.
                                </li>
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
                            href="https://dvaughnhouse.com/#contact"
                            className="group flex flex-wrap items-baseline justify-between gap-2 border-b border-line py-6 transition dark:border-line-dark"
                        >
                            <span className="font-display text-xl font-bold text-ink transition group-hover:text-sienna-deep dark:text-cream dark:group-hover:text-sienna">
                                Contact
                            </span>
                            <span className="text-sm text-ink-soft dark:text-cream-soft">
                                Reach Glenride through the routing hub →
                            </span>
                        </a>
                    </div>
                </div>
            </section>

            <SiteFooter />
        </div>
    );
}
