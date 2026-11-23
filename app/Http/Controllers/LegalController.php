<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;

/**
 * Public Glenride legal documents (glenride.com/terms, glenride.com/privacy).
 *
 * Text ported verbatim from the gateway's LEGAL_DOCS
 * (gateway-com/src/data/site-content.js), updated October 11, 2026.
 * These are working placeholders while formal documents are prepared
 * with counsel; do not rewrite the wording here — update the source
 * text and re-port it.
 */
class LegalController extends Controller
{
    /**
     * Display the Terms of Service.
     */
    public function terms(): Response
    {
        return Inertia::render('Legal/Show', [
            'document' => [
                'title' => 'Terms of Service',
                'updated' => 'October 11, 2026',
                'intro' => 'These terms are a working placeholder while formal terms are prepared with counsel. By using this site, you agree to these plain-language terms.',
                'sections' => [
                    [
                        'heading' => 'Use of the site',
                        'body' => 'You may read, share, and link to the public content here. You may not scrape the site at abusive volume, misrepresent the content as your own, or use the site to break the law.',
                    ],
                    [
                        'heading' => 'Intellectual property',
                        'body' => 'Essays, research, artwork, and brand marks on this site belong to D\'Vaughn House unless credited otherwise. You may quote brief passages with attribution; any other reproduction needs written permission.',
                    ],
                    [
                        'heading' => 'Purchases',
                        'body' => 'Products sold through the store are covered by the terms shown at checkout: what you get, the license scope, and the refund terms are stated before any payment is accepted. No product takes payment before its price and terms are published.',
                    ],
                    [
                        'heading' => 'No professional advice',
                        'body' => 'Nothing on this site is financial, legal, investment, or medical advice. Token and market content is educational. You are responsible for your own decisions.',
                    ],
                    [
                        'heading' => 'Limitation of liability',
                        'body' => 'The site is provided as-is. To the extent the law allows, D\'Vaughn House is not liable for damages arising from your use of the site.',
                    ],
                    [
                        'heading' => 'Changes',
                        'body' => 'These terms may be updated as the work grows. The current version always lives at this address, with its last-updated date shown above.',
                    ],
                ],
            ],
        ]);
    }

    /**
     * Display the Privacy Policy.
     */
    public function privacy(): Response
    {
        return Inertia::render('Legal/Show', [
            'document' => [
                'title' => 'Privacy Policy',
                'updated' => 'October 11, 2026',
                'intro' => 'This policy is a working placeholder while a formal policy is prepared. In plain language, here is how your information is handled.',
                'sections' => [
                    [
                        'heading' => 'What is collected',
                        'body' => 'If you use the contact form: your name, email address, and message. The site does not run third-party advertising trackers. Standard server logs (used for security and reliability) may record visits in anonymized or aggregate form.',
                    ],
                    [
                        'heading' => 'How it is used',
                        'body' => 'Contact details are used only to reply to you. They are never sold, rented, or shared with marketers.',
                    ],
                    [
                        'heading' => 'Cookies',
                        'body' => 'The site does not set advertising cookies. Basic functional storage in your browser may be used for preferences like display theme.',
                    ],
                    [
                        'heading' => 'Data retention',
                        'body' => 'Messages sent through the contact form are kept as long as needed to respond and for legitimate record-keeping, then removed on request.',
                    ],
                    [
                        'heading' => 'Your rights',
                        'body' => 'You may ask what information is held about you, ask for a correction, or ask for deletion, through the contact page. Requests are answered personally.',
                    ],
                    [
                        'heading' => 'Changes',
                        'body' => 'This policy may be updated as the work grows. The current version always lives at this address, with its last-updated date shown above.',
                    ],
                ],
            ],
        ]);
    }
}
