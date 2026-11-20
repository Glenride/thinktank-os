<?php

use App\Http\Middleware\HandleInertiaRequests;
use App\Http\Middleware\MarkdownNegotiation;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets;
use Illuminate\Http\Request;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        commands: __DIR__.'/../routes/console.php',
        channels: __DIR__.'/../routes/channels.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        $middleware->trustProxies(at: '*');

        // Stripe cannot send a CSRF token; the webhook route verifies the
        // Stripe signature instead (see StoreController::webhook).
        // The Tress Column waitlist is a public signup form with no
        // session; the Pages function it proxies to validates the
        // signup and rate-limits per IP.
        $middleware->validateCsrfTokens(except: [
            'store/webhook',
            'api/waitlist',
        ]);

        $middleware->web(append: [
            HandleInertiaRequests::class,
            AddLinkHeadersForPreloadedAssets::class,
            MarkdownNegotiation::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        $exceptions->shouldRenderJsonWhen(
            fn (Request $request) => $request->is('api/*') || $request->expectsJson(),
        );
    })->create();
