import InstitutionalHeader from '@/Components/InstitutionalHeader';
import SiteFooter from '@/Components/SiteFooter';
import { Head, Link } from '@inertiajs/react';

export default function About({ auth }) {
    return (
        <div className="min-h-screen bg-paper text-ink dark:bg-night dark:text-cream font-serif selection:bg-sienna selection:text-ink">
            <Head title="About" />
            <InstitutionalHeader auth={auth} active="about" subtitle="About Glenride" />

            <main className="mx-auto max-w-3xl px-6 py-16 sm:py-20 lg:px-8">
                <h1 className="font-display text-4xl font-bold tracking-tight text-ink dark:text-cream sm:text-5xl">
                    Independent thinking. Verifiable work.
                </h1>

                <p className="mt-6 text-lg leading-relaxed text-ink-soft dark:text-cream-soft">
                    Glenride is an independent, AI-native think tank. We find
                    where critical systems break before the break becomes harm
                    — and we publish a record anyone can check.
                </p>
                <p className="mt-5 text-lg leading-relaxed text-ink-soft dark:text-cream-soft">
                    We study supply chains, pharmaceutical data, and the
                    software systems modern life quietly depends on. We
                    measure what others guess at, we show our sources, and we
                    sign our work. When a finding is strong enough to change a
                    rule, we carry it to the people who write the rules. When
                    an answer can become a tool, we build the tool. Our money
                    comes from our work, so our conclusions answer to evidence,
                    not to a sponsor.
                </p>
                <p className="mt-5 font-mono text-sm text-ink-soft dark:text-cream-soft">
                    — D&apos;Vaughn House, Founder
                </p>

                <h2 className="mt-14 font-display text-2xl font-bold text-ink dark:text-cream">
                    Who runs it
                </h2>
                <p className="mt-4 leading-relaxed text-ink-soft dark:text-cream-soft">
                    Glenride was founded in 2017 by D&apos;Vaughn House, an
                    Independent AI Orchestrator. He is the founder and the
                    author of the briefs in the Vanguard Library. There is
                    no outside ownership and no venture funding.
                </p>
                <p className="mt-4 leading-relaxed text-ink-soft dark:text-cream-soft">
                    The Glenride Council on AI &amp; Supply-Chain Resilience
                    is a roundtable of operators. Three of twenty seats are
                    filled, and Session 01 meets in January 2027.
                </p>

                <h2 className="mt-14 font-display text-2xl font-bold text-ink dark:text-cream">
                    How it is funded
                </h2>
                <p className="mt-4 leading-relaxed text-ink-soft dark:text-cream-soft">
                    Glenride is self-funded. The store, executive briefings,
                    and salons fund the work. There are no sponsors, and no
                    buyer or funder shapes the findings.
                </p>

                <h2 className="mt-14 font-display text-2xl font-bold text-ink dark:text-cream">
                    What it studies
                </h2>
                <ul className="mt-4 space-y-3 leading-relaxed text-ink-soft dark:text-cream-soft">
                    <li>
                        <strong className="text-ink dark:text-cream">
                            Supply-Chain Resilience:
                        </strong>{' '}
                        the systems behind essential goods, their
                        vulnerabilities, and what happens when critical links
                        fail.
                    </li>
                    <li>
                        <strong className="text-ink dark:text-cream">
                            Pharmaceutical Intelligence:
                        </strong>{' '}
                        drug shortage information and pharmaceutical data,
                        evaluated with sources attached.
                    </li>
                    <li>
                        <strong className="text-ink dark:text-cream">
                            Applied AI and Enterprise Software:
                        </strong>{' '}
                        practical software that turns research, data, and
                        institutional knowledge into useful capabilities.
                    </li>
                </ul>

                <h2 className="mt-14 font-display text-2xl font-bold text-ink dark:text-cream">
                    Contact
                </h2>
                <p className="mt-4 leading-relaxed text-ink-soft dark:text-cream-soft">
                    Reach Glenride directly at{' '}
                    <a
                        href="mailto:dvaughn@glenride.com"
                        className="font-semibold text-sienna-deep underline underline-offset-4 dark:text-sienna"
                    >
                        dvaughn@glenride.com
                    </a>
                    . The research is at{' '}
                    <Link
                        href={route('research.index')}
                        className="font-semibold text-sienna-deep underline underline-offset-4 dark:text-sienna"
                    >
                        glenride.com/research
                    </Link>
                    , and the briefs are in{' '}
                    <Link
                        href={route('library.index')}
                        className="font-semibold text-sienna-deep underline underline-offset-4 dark:text-sienna"
                    >
                        the Vanguard Library
                    </Link>
                    .
                </p>
            </main>

            <SiteFooter />
        </div>
    );
}
