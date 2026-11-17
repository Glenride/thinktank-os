// Plus+ portal. Passes buy tools, sight, and time. Nothing a pass
// unlocks touches a contract, a lock, a fee, or anyone else's launch.
// Every feature carries its honest state. Billing fails honestly:
// when billing is not connected, subscribing says so.

import { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { PLUS_TIERS } from '../../TressColumn/tressConfig';
import { TressShell } from '../../TressColumn/components/TressShell';
import { EmptyState, Tabs } from '../../TressColumn/components/primitives';

const TIER_KEYS = ['sapphire', 'emerald', 'ruby'];

// Honest state for each feature, in the same order as PLUS_TIERS.
// The feature text is the locked copy. The note says what is true now.
const HONEST_NOTES = {
    sapphire: [
        'No launches exist yet, so the feed is empty. The feed needs the indexer, which is not built.',
        'No airdrop campaigns exist. The radar has nothing to watch.',
        'No locks exist. There is nothing to track yet.',
    ],
    emerald: [
        'The workbench is the launch flow. Staging a launch starts there.',
        'The snapshot builder is not built.',
        'No launches exist, so there is nothing to analyze.',
        'No locks exist. There is nothing to count down.',
        'Vanity certificate URLs are not built. Certificates use their launch number.',
    ],
    ruby: [
        'No campaigns exist, so no rebate activity exists.',
        'No launches exist. There is nothing to monitor.',
        'No snapshots exist. There is nothing to export.',
        'No support channel is wired on this build.',
        'No seals have been issued.',
    ],
};

function TierScreen({ tierKey, onSubscribe, subscribeNote }) {
    const tier = PLUS_TIERS[tierKey];
    const notes = HONEST_NOTES[tierKey] || [];
    return (
        <div>
            <p className="tc-lede">
                {tier.name}, ${tier.price} per month. {tier.audience}.
            </p>
            <ul className="tc-feature-list">
                {tier.features.map((feature, index) => (
                    <li className="tc-feature" key={feature}>
                        <span className="tc-feature-name">{feature}</span>
                        <span className="tc-feature-note">
                            {notes[index] || 'Not available yet.'}
                        </span>
                    </li>
                ))}
            </ul>
            <div className="tc-block-gap-top">
                <button type="button" className="tc-button-primary" onClick={onSubscribe}>
                    Subscribe to {tier.name}
                </button>
                {subscribeNote && <p className="tc-field-error">{subscribeNote}</p>}
            </div>
        </div>
    );
}

export default function Index({ billingConnected }) {
    const { auth } = usePage().props;
    const user = auth?.user || null;
    const [active, setActive] = useState('sapphire');
    const [subscribeNote, setSubscribeNote] = useState('');

    const onSubscribe = () => {
        if (!billingConnected) {
            setSubscribeNote('Billing is not connected on this build, so subscribing is not available yet.');
        } else {
            setSubscribeNote('Checkout is not wired yet. No charge was made.');
        }
    };

    return (
        <TressShell surface="plus" title="Plus+" active="portal">
            <p className="tc-lede">
                Plus+ passes buy tools, sight, and time. Nothing a pass unlocks
                touches a contract, a lock, a fee, or anyone else's launch.
            </p>

            <Tabs
                options={TIER_KEYS.map((key) => ({
                    value: key,
                    label: `${PLUS_TIERS[key].name} · $${PLUS_TIERS[key].price}/mo`,
                }))}
                value={active}
                onChange={(key) => {
                    setActive(key);
                    setSubscribeNote('');
                }}
            />

            <TierScreen tierKey={active} onSubscribe={onSubscribe} subscribeNote={subscribeNote} />

            <section className="tc-section" aria-labelledby="tc-status-h">
                <h2 className="tc-h2" id="tc-status-h">Your subscription</h2>
                {!user && (
                    <EmptyState
                        title="Sign in to see your subscription."
                        body="Plus+ passes belong to your account."
                        action={
                            <a className="tc-button-primary" href="/auth/tress-entry?return=%2Fstaging%2Fplus">
                                Sign in with Albert Pass
                            </a>
                        }
                    />
                )}
                {user && (
                    <div>
                        <p className="tc-module-copy">No subscription on record for this account.</p>
                        <p className="tc-module-note">
                            {billingConnected
                                ? 'Billing is connected.'
                                : 'Billing is not connected on this build. Subscribing is not available yet.'}
                        </p>
                    </div>
                )}
            </section>

            <section className="tc-section" aria-labelledby="tc-workbench-h">
                <h2 className="tc-h2" id="tc-workbench-h">Start from the workbench</h2>
                <p className="tc-lede">
                    The creator workbench is the launch flow on Tress Column. It is open
                    to every signed-in account.
                </p>
                <Link className="tc-button-primary" href="/staging/tress-column/start">
                    Start a launch
                </Link>
            </section>
        </TressShell>
    );
}
