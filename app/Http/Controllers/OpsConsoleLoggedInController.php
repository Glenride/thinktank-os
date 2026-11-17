<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

/**
 * ops surface, logged-in state (staging routes only).
 *
 * Staff allowlist, decided Nov 17, 2026: D'Vaughn only. The gate is
 * enforced here, in the controller: no unauthenticated staff view
 * exists at any URL, and a signed-in non-staff user gets a plain
 * denial page with no staff data on it.
 *
 * The domain routes still point at OpsConsoleController. No live
 * cutover happens without his explicit tap naming it.
 */
class OpsConsoleLoggedInController extends Controller
{
    public function index(): Response|\Illuminate\Http\RedirectResponse
    {
        $user = Auth::user();

        if (! $user) {
            return redirect()->route('tress.auth.entry', ['return' => '/staging/ops-console']);
        }

        $staff = config('tress.staff_emails', []);
        if (! in_array(strtolower((string) $user->email), $staff, true)) {
            return Inertia::render('OpsConsole/LoggedIn/Denied');
        }

        return Inertia::render('OpsConsole/LoggedIn/Index', [
            'staffEmail' => $user->email,
        ]);
    }
}
