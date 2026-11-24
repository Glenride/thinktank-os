<?php

namespace App\Http\Controllers;

use App\Models\Attestation;
use App\Models\Manuscript;
use App\Support\SiteConfig;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\View;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    /**
     * The Glenride institutional front door (glenride.com root).
     *
     * The Vanguard Library lives at /library; this page introduces the
     * institution, its research areas, its attestation proof layer, and
     * the latest published briefs.
     */
    public function index(Request $request): Response
    {
        // Homepage Organization + WebSite JSON-LD, from the same site
        // config as llms.txt and ai.txt (rendered by the Blade root view).
        View::share('pageJsonLd', SiteConfig::organizationJsonLdString());

        $attestationIssued = Attestation::count();
        $attestationInForce = Attestation::active()->count();
        $attestationAnchored = Attestation::whereNotNull('anchor_tx')->count();
        $publishedCount = Manuscript::published()->library()->count();

        // Plain-text homepage pitch for crawlers that don't run JS
        // (Blade <noscript>, same words as the interactive homepage).
        View::share('homeSeo', [
            'headline' => 'Supply chains, seen clearly.',
            'principle' => 'Built to be checked.',
            'hero' => [
                'Critical systems rarely fail without warning. The signals are there—in the data, the dependencies, and the decisions made along the way.',
                'Glenride investigates vulnerabilities in the systems modern life depends on, turning fragmented information into actionable intelligence that people can examine, verify, and use.',
            ],
            'areas' => [
                ['name' => 'Supply-Chain Resilience', 'line' => 'Understanding the systems behind essential goods, identifying vulnerabilities, and examining what happens when critical links fail.'],
                ['name' => 'Pharmaceutical Intelligence', 'line' => 'Evaluating drug shortage information and pharmaceutical data to provide clear, source-attributed intelligence.'],
                ['name' => 'Applied AI and Enterprise Software', 'line' => 'Building practical software systems that turn research, data, and institutional knowledge into useful capabilities.'],
            ],
            'proof' => "{$attestationIssued} attestations issued. {$attestationInForce} in force. {$attestationAnchored} anchored. Across {$publishedCount} published briefs in the Vanguard Library.",
            'scholars' => 'ThinkTank OS is the route for scholars: submit your work, and Glenride attests the record and anchors it to the blockchain.',
            'closing' => 'Independent thinking. Verifiable work.',
        ]);

        $featuredBriefs = Manuscript::published()
            ->library()
            ->latest('published_at')
            ->take(3)
            ->get(['id', 'title', 'abstract', 'published_at'])
            ->map(function (Manuscript $brief) {
                return [
                    'id' => $brief->id,
                    'title' => $brief->title,
                    'abstract' => $brief->abstract,
                    'published_at' => $brief->published_at,
                    'attestation_public_id' => $brief->activeAttestation()?->public_id,
                    'record_version' => $brief->latestRecord?->version,
                ];
            });

        return Inertia::render('Home/Landing', [
            'featuredBriefs' => $featuredBriefs,
            'publishedCount' => $publishedCount,
            'attestationCount' => $attestationInForce,
            'attestationIssuedCount' => $attestationIssued,
            'attestationAnchoredCount' => $attestationAnchored,
            'essayCount' => count(EssayController::publishedSlugs()),
        ]);
    }

    /**
     * The About page: who runs Glenride, how it is funded, and how to
     * reach it. Facts only, from the canonical About and the record.
     */
    public function about(): Response
    {
        return Inertia::render('About');
    }
}
