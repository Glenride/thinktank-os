import { Link, usePage } from '@inertiajs/react';
import { TressShell } from '../../../TressColumn/components/TressShell';
import { LaunchList } from '../../../TressColumn/components/LaunchList';

export default function Index() {
    const { auth } = usePage().props;
    const user = auth?.user || null;
    const signInHref = '/auth/tress-entry?return=%2Fstaging%2Ftress-column';

    const action = user ? (
        <Link className="tc-button-primary" href="/staging/tress-column/start">
            Start a launch
        </Link>
    ) : (
        <a className="tc-button-primary" href={signInHref}>
            Sign in
        </a>
    );

    const emptyAction = user ? (
        <Link className="tc-button-primary" href="/staging/tress-column/start">
            Start a launch
        </Link>
    ) : (
        <a className="tc-button-primary" href={signInHref}>
            Sign in with Albert Pass
        </a>
    );

    return (
        <TressShell surface="tc" title="Launches" active="launches" action={action}>
            <LaunchList linkTo="launch" emptyAction={emptyAction} />
        </TressShell>
    );
}
