<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;

/**
 * Plus+ portal, logged-in state.
 *
 * Surface: plus.dvaughnhouse.com, picked Nov 17, 2026. Live there
 * since the Nov 20, 2026 cutover (his tap); staging at /staging/plus
 * stays as the pre-live check.
 *
 * Billing state is reported as a boolean only. Keys are never read
 * into a prop, never printed, never invented. When billing is not
 * connected, the portal says so and offers no payment action.
 */
class PlusPortalController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('PlusPortal/Index', [
            'billingConnected' => ! empty(config('services.stripe.key')),
        ]);
    }
}
