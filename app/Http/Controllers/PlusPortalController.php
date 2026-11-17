<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;

/**
 * Plus+ portal, logged-in state (staging route only).
 *
 * Surface: plus.dvaughnhouse.com, picked Nov 17, 2026. No DNS or
 * tunnel change ships with this build; the portal stages at
 * /staging/plus until a cutover is tapped.
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
