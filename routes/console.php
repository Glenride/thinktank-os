<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schedule;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');

// Automated digest attestation (PRD 2026-10-29, SOP v1.1): the scheduled
// job runs daily and processes whatever digest rows have released. The
// command is a no-op when no rows are queued. The host systemd user timer
// (thinktank-scheduler.timer) calls `php artisan schedule:run` every
// minute (see ATTESTATION-PROTOCOL.md).
Schedule::command('attestations:digest')
    ->dailyAt('10:00')
    ->timezone('America/New_York')
    ->withoutOverlapping()
    ->appendOutputTo(storage_path('logs/digest-attestation-scheduler.log'));
