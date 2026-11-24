<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Readable slugs for the 15 published briefs. The UUID URLs keep
     * working (the show action 301-redirects them to the slug URL).
     */
    public function up(): void
    {
        Schema::table('manuscripts', function (Blueprint $table) {
            $table->string('slug')->nullable()->unique()->after('title');
        });

        $slugs = [
            '728fc5e0-175a-57a0-95c1-95d43414643e' => 'quadratic-finance-replication',
            'dcade1be-cf34-52aa-a059-65d4a659b676' => 'license-it-from-anywhere',
            '36d4ca42-54e3-5e9c-9b18-10ba7149f3d9' => 'harness-engineering-replication',
            '1e5fa2c1-64c1-57a2-af0e-ad8981d1668d' => 'weekly-theme-bot-fleet',
            'cf366755-d192-5a1d-aa4b-ef2f7312e4f7' => 'cavesson-vault',
            'f451f193-a6b6-574d-a42e-f3c7eb2e38cb' => 'drug-shortage-digest',
            'edd48b1e-ff78-5eaf-b1ec-1afb11228332' => 'henry-ecom-ad-factory',
            '9be1d335-aab2-58e1-99ea-be88e5ec1d21' => 'jewel-os',
            '00b07e8e-3034-576c-ade3-ebc91abdca51' => 'meg-inbox-judge',
            'd34cf08d-df03-5082-92fe-bc148aade944' => 'motion-bot',
            '836a5ca9-565a-5fd2-b913-031b7b63c283' => 'project-m4',
            '49bb0bdd-dd34-51a5-a0ac-7e3d764cd79f' => 'tress-column',
            '01a0bd00-28a5-7109-8d1d-b357cb42dd7a' => 'decentralized-micro-grants',
            '01a0b493-0214-7330-a3a3-4b353213e0a3' => 'supply-chain-vulnerabilities-stem',
            '01a0a000-0000-7000-8000-000000000001' => 'autonomous-agentic-governance',
        ];

        foreach ($slugs as $id => $slug) {
            DB::table('manuscripts')->where('id', $id)->update(['slug' => $slug]);
        }
    }

    public function down(): void
    {
        Schema::table('manuscripts', function (Blueprint $table) {
            $table->dropUnique(['slug']);
            $table->dropColumn('slug');
        });
    }
};
