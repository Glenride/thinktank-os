<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\MorphMany;

class Manuscript extends Model
{
    use HasFactory, HasUuids;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id',
        'credit_account_id',
        'title',
        'slug',
        'abstract',
        'raw_file_path',
        'synthesized_brief_path',
        'status',
        'compliance_ethics_verified',
        'compliance_transparency_verified',
        'compliance_citations_verified',
        'word_count',
        'grant_amount',
        'published_at',
    ];

    /**
     * Brief URLs use the slug (/briefs/drug-shortage-digest). UUIDs still
     * resolve in the controller, which 301-redirects them to the slug.
     */
    public function getRouteKeyName(): string
    {
        return 'slug';
    }

    protected static function booted(): void
    {
        static::saving(function (Manuscript $manuscript) {
            if (empty($manuscript->slug) && ! empty($manuscript->title)) {
                $manuscript->slug = static::uniqueSlug($manuscript->title, $manuscript->id);
            }
        });
    }

    public static function uniqueSlug(string $title, ?string $exceptId = null): string
    {
        $base = \Illuminate\Support\Str::slug($title);
        $base = $base !== '' ? $base : 'brief';
        $slug = $base;
        $i = 2;
        while (static::where('slug', $slug)->when($exceptId, fn ($q) => $q->where('id', '!=', $exceptId))->exists()) {
            $slug = "{$base}-{$i}";
            $i++;
        }

        return $slug;
    }

    /**
     * The attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'compliance_ethics_verified' => 'boolean',
            'compliance_transparency_verified' => 'boolean',
            'compliance_citations_verified' => 'boolean',
            'grant_amount' => 'decimal:2',
            'word_count' => 'integer',
            'published_at' => 'datetime',
        ];
    }

    /**
     * Scholar/Author who submitted the manuscript.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * The study/project credit account that funds this manuscript's
     * attestation, if one has been assigned.
     */
    public function creditAccount(): BelongsTo
    {
        return $this->belongsTo(CreditAccount::class);
    }

    /**
     * Scope query to only published policy briefs.
     */
    public function scopePublished(Builder $query): Builder
    {
        return $query->where('status', 'published');
    }

    /**
     * The five product and bot concept briefs, kept out of the Vanguard
     * Library and shown on the Labs page instead (his call, Nov 24,
     * 2026). They stay published; only their listing changes.
     */
    public const LABS_IDS = [
        'edd48b1e-ff78-5eaf-b1ec-1afb11228332', // Henry: The Ecom Ad Factory
        '00b07e8e-3034-576c-ade3-ebc91abdca51', // Meg — Inbox Judge
        'd34cf08d-df03-5082-92fe-bc148aade944', // Motion Bot
        '836a5ca9-565a-5fd2-b913-031b7b63c283', // Project M4
        '49bb0bdd-dd34-51a5-a0ac-7e3d764cd79f', // Tress Column
    ];

    /** Scope query to the library briefs (everything except Labs). */
    public function scopeLibrary(Builder $query): Builder
    {
        return $query->whereNotIn('id', self::LABS_IDS);
    }

    /** Scope query to the Labs briefs. */
    public function scopeLabs(Builder $query): Builder
    {
        return $query->whereIn('id', self::LABS_IDS);
    }

    /**
     * Scope query to manuscripts awaiting AI synthesis.
     */
    public function scopePendingSynthesis(Builder $query): Builder
    {
        return $query->where('status', 'submitted');
    }

    /**
     * Check if all compliance checklists are verified.
     */
    public function isComplianceVerified(): bool
    {
        return $this->compliance_ethics_verified
            && $this->compliance_transparency_verified
            && $this->compliance_citations_verified;
    }

    /**
     * SpinWave records: the append-only publish-time snapshots of this
     * manuscript, oldest version first.
     */
    public function records(): HasMany
    {
        return $this->hasMany(ManuscriptRecord::class)->orderBy('version');
    }

    /**
     * The latest SpinWave record (highest version), if any.
     */
    public function latestRecord(): HasOne
    {
        // Postgres cannot max() a uuid, so latestOfMany() breaks on this
        // schema; an ordered hasOne returns the same highest-version row.
        return $this->hasOne(ManuscriptRecord::class)->orderByDesc('version');
    }

    /**
     * Attestations issued for this manuscript.
     */
    public function attestations(): MorphMany
    {
        return $this->morphMany(Attestation::class, 'attestable');
    }

    /**
     * The most recent attestation for this manuscript, if any.
     */
    public function latestAttestation(): ?Attestation
    {
        return $this->attestations()->latest('issued_at')->first();
    }

    /**
     * The current in-force attestation (issued or challenged), if any.
     */
    public function activeAttestation(): ?Attestation
    {
        return $this->attestations()
            ->whereIn('status', ['issued', 'challenged'])
            ->latest('issued_at')
            ->first();
    }

    /**
     * Whether this manuscript carries an attestation in good standing.
     */
    public function isAttested(): bool
    {
        return $this->attestations()->where('status', 'issued')->exists();
    }
}
