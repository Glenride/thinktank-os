<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;

/**
 * tc surface, logged-in state (staging routes only).
 *
 * The domain routes still point at TressColumnController. No live
 * cutover happens without his explicit tap naming it.
 */
class TressColumnLoggedInController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('TressColumn/LoggedIn/Index');
    }

    public function show(string $id): Response
    {
        abort_unless(ctype_digit($id) && (int) $id >= 1, 404);

        return Inertia::render('TressColumn/LoggedIn/Show', [
            'launchId' => (int) $id,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('TressColumn/LoggedIn/Create');
    }

    public function mine(): Response
    {
        return Inertia::render('TressColumn/LoggedIn/Mine');
    }
}
