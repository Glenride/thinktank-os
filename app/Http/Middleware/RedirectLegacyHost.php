<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * Redirect the retired Glenride host to the canonical host.
 *
 * Everything moved from dvaughnhouse.org to glenride.com: requests to
 * dvaughnhouse.org or www.dvaughnhouse.org get a permanent (301)
 * redirect to https://glenride.com with the same path and query
 * string, for GET and HEAD only.
 *
 * Non-GET/HEAD requests pass through untouched — a POST (or PUT,
 * PATCH, DELETE) must never be turned into a redirect, or the
 * request body and method would be lost.
 *
 * All other hosts serve normally: glenride.com, www.glenride.com,
 * and every subdomain (thinktank., store., tc., trade., ops.,
 * mission., etc.) are never redirected.
 *
 * Registered globally (bootstrap/app.php) so it covers every route,
 * including /attestations/* and /library, and runs after the trusted
 * proxy handling so getHost() respects X-Forwarded-Host.
 */
class RedirectLegacyHost
{
    /** @var array<int, string> */
    private const LEGACY_HOSTS = ['dvaughnhouse.org', 'www.dvaughnhouse.org'];

    private const CANONICAL_BASE = 'https://glenride.com';

    public function handle(Request $request, Closure $next): Response
    {
        if (
            ($request->isMethod('GET') || $request->isMethod('HEAD'))
            && in_array(strtolower($request->getHost()), self::LEGACY_HOSTS, true)
        ) {
            // getRequestUri() is the path plus the query string, exactly
            // as requested — no re-encoding, nothing dropped.
            return redirect()->away(self::CANONICAL_BASE.$request->getRequestUri(), 301);
        }

        return $next($request);
    }
}
