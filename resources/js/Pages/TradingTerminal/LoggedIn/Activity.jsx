// My activity: swaps the signed-in wallet made through the terminal,
// newest first. History covers swaps made through this terminal on
// this device, read back from receipts. Chain-wide history needs the
// indexer, which is not built. Until then, no partial history is
// invented: the screen shows exactly what the receipts prove.

import { useEffect, useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { TOPICS } from '../../../TressColumn/tressConfig';
import {
    decodePoolSwapLog,
    decodeSwapRecordedLog,
    ethGetTransactionReceipt,
} from '../../../TressColumn/rpc';
import { useAsyncData } from '../../../TressColumn/useChain';
import { useWallet } from '../../../TressColumn/useWallet';
import { loadTxRecords } from '../../../TressColumn/wallet';
import { formatDateTime } from '../../../TressColumn/format';
import { SignInPrompt, TressShell } from '../../../TressColumn/components/TressShell';
import { AddressLink, EmptyState, ErrorFix, SkeletonRows } from '../../../TressColumn/components/primitives';

function useActivity(address) {
    return useAsyncData(async () => {
        if (!address) return [];
        const mine = loadTxRecords()
            .filter((r) => r.from === address.toLowerCase())
            .sort((a, b) => b.submittedAt - a.submittedAt);
        const rows = await Promise.all(
            mine.map(async (record) => {
                const receipt = await ethGetTransactionReceipt(record.hash).catch(() => null);
                let fee = null;
                let swap = null;
                if (receipt) {
                    for (const log of receipt.logs || []) {
                        if (log.topics?.[0] === TOPICS.swapRecorded) {
                            fee = decodeSwapRecordedLog(log);
                        }
                        if (log.topics?.[0] === TOPICS.poolSwap) {
                            swap = decodePoolSwapLog(log);
                        }
                    }
                }
                return {
                    ...record,
                    receipt,
                    status: receipt ? (receipt.status === '0x1' ? 'confirmed' : 'failed') : 'pending',
                    fee,
                    swap,
                };
            }),
        );
        return rows;
    }, [address], 'activity');
}

export default function Activity() {
    const { auth } = usePage().props;
    const user = auth?.user || null;
    const wallet = useWallet();
    const [refreshKey, setRefreshKey] = useState(0);
    const activity = useActivity(wallet.address);

    useEffect(() => {
        if (refreshKey > 0) activity.retry();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [refreshKey]);

    return (
        <TressShell surface="trade" title="My activity" active="activity">
            {!user && <SignInPrompt what="see your activity" returnTo="/staging/terminal/activity" />}

            {user && !wallet.address && (
                <div className="tc-empty">
                    <p className="tc-empty-title">Connect a wallet to see your activity.</p>
                    <p className="tc-empty-body">
                        Activity is found by wallet address. Signing in does not connect a
                        wallet. Connecting a wallet does not sign you in.
                    </p>
                    <button type="button" className="tc-button-primary" onClick={wallet.connect} disabled={wallet.connecting}>
                        Connect a wallet
                    </button>
                    {wallet.error && <p className="tc-field-error">{wallet.error.message}</p>}
                </div>
            )}

            {user && wallet.address && (
                <div>
                    <p className="tc-lede">
                        Swaps made through this terminal on this device. Chain-wide history
                        needs the indexer, which is not built.
                    </p>
                    {activity.loading && <SkeletonRows copy="Loading activity." />}
                    {activity.error && (
                        <ErrorFix
                            title="The chain read failed."
                            fix="Check the network and try again."
                            onRetry={activity.retry}
                        />
                    )}
                    {!activity.loading && !activity.error && activity.data?.length === 0 && (
                        <EmptyState
                            title="No swaps yet."
                            body="Swaps you make through the terminal appear here, newest first."
                            action={
                                <Link className="tc-button-primary" href="/staging/terminal">
                                    Go to Markets
                                </Link>
                            }
                        />
                    )}
                    {!activity.loading && !activity.error && activity.data && activity.data.length > 0 && (
                        <div>
                            <div className="tc-column-heads" aria-hidden="true">
                                <span>Transaction</span>
                                <span>Fee paid</span>
                                <span>Status</span>
                                <span>Time</span>
                            </div>
                            {activity.data.map((row) => (
                                <div className="tc-row" key={row.hash}>
                                    <span className="tc-row-identity">
                                        <span>
                                            <span className="tc-row-name">{row.label}</span>
                                            <span className="tc-row-creator">
                                                <AddressLink address={row.hash} kind="tx" />
                                            </span>
                                        </span>
                                    </span>
                                    <span className="tc-row-meta tc-row-hide-phone">
                                        {row.fee ? `${row.fee.fee.toString()} quote units` : 'See receipt.'}
                                    </span>
                                    <span className="tc-row-meta tc-row-hide-phone">{row.status}</span>
                                    <span className="tc-row-meta">
                                        {formatDateTime(Math.floor(row.submittedAt / 1000))}
                                    </span>
                                </div>
                            ))}
                            <div className="tc-block-gap-top">
                                <button type="button" className="tc-button-quiet" onClick={() => setRefreshKey((k) => k + 1)}>
                                    Refresh receipts
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </TressShell>
    );
}
