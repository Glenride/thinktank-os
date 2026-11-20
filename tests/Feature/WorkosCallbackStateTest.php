<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Http;
use Tests\TestCase;

class WorkosCallbackStateTest extends TestCase
{
    use RefreshDatabase;

    /**
     * A double-tap on sign-in must not break the first sign-in: the
     * callback for the first state still validates after a second
     * login stored a second state. Regression test for the Nov 20
     * invalid_state pair (two callbacks, both rejected) and Oct 28.
     */
    public function test_callback_accepts_first_state_after_double_login(): void
    {
        config([
            'services.workos.client_id' => 'client_test',
            'services.workos.client_secret' => 'secret_test',
            'services.workos.redirect_uri' => 'https://tc.dvaughnhouse.com/auth/workos/callback',
            'services.workos.owner_emails' => 'dvaughn@dvaughnhouse.com',
        ]);
        Http::fake([
            'api.workos.com/user_management/authenticate' => Http::response([
                'user' => [
                    'email' => 'dvaughn@dvaughnhouse.com',
                    'first_name' => 'D',
                    'last_name' => 'Vaughn',
                ],
            ], 200),
        ]);

        $this->get('http://tc.dvaughnhouse.com/auth/workos/login')->assertStatus(302);
        $states = session('workos_states');
        $this->assertCount(1, $states);
        $firstState = $states[0]['state'];

        $this->get('http://tc.dvaughnhouse.com/auth/workos/login')->assertStatus(302);
        $this->assertCount(2, session('workos_states'));

        $response = $this->get(
            'http://tc.dvaughnhouse.com/auth/workos/callback?code=test-code&state='.urlencode($firstState)
        );
        $response->assertStatus(302);
        $this->assertAuthenticated();
        $this->assertCount(1, session('workos_states'));
    }

    /**
     * A replayed callback for an already-used state is rejected.
     */
    public function test_callback_rejects_replayed_state(): void
    {
        config([
            'services.workos.client_id' => 'client_test',
            'services.workos.client_secret' => 'secret_test',
            'services.workos.redirect_uri' => 'https://tc.dvaughnhouse.com/auth/workos/callback',
            'services.workos.owner_emails' => 'dvaughn@dvaughnhouse.com',
        ]);
        Http::fake([
            'api.workos.com/user_management/authenticate' => Http::response([
                'user' => [
                    'email' => 'dvaughn@dvaughnhouse.com',
                    'first_name' => 'D',
                    'last_name' => 'Vaughn',
                ],
            ], 200),
        ]);

        $this->get('http://tc.dvaughnhouse.com/auth/workos/login')->assertStatus(302);
        $state = session('workos_states')[0]['state'];

        $this->get(
            'http://tc.dvaughnhouse.com/auth/workos/callback?code=test-code&state='.urlencode($state)
        )->assertStatus(302);
        $this->assertAuthenticated();

        auth()->logout();
        $this->assertGuest();

        $this->get(
            'http://tc.dvaughnhouse.com/auth/workos/callback?code=test-code&state='.urlencode($state)
        )->assertRedirect('/');
        $this->assertGuest();
    }
}
