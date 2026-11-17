// Sign-in entry. Albert Pass is the one shared identity. The provider
// under the hood is never named in this UI.

import { TressShell } from '../../../TressColumn/components/TressShell';

export default function Entry({ workosReady, workosUrl, loginUrl }) {
    return (
        <TressShell surface="tc" title="Sign in" active="launches">
            <div className="tc-empty">
                <p className="tc-empty-title">Sign in with Albert Pass.</p>
                <p className="tc-empty-body">
                    One identity for Tress Column, Markets, the ops console, and Plus+.
                    Each surface keeps its own session. Sessions last 50 minutes.
                </p>
                {workosReady ? (
                    <a className="tc-button-primary" href={workosUrl}>
                        Continue with Albert Pass
                    </a>
                ) : (
                    <div>
                        <p className="tc-empty-body">
                            Albert Pass is not connected yet.
                        </p>
                        <a className="tc-button-primary" href={loginUrl}>
                            Sign in with your account
                        </a>
                    </div>
                )}
            </div>
        </TressShell>
    );
}
