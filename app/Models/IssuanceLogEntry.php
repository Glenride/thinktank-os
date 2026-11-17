<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class IssuanceLogEntry extends Model
{
    protected $table = 'attestation_issuance_log';

    /**
     * One entry in the append-only attestation issuance log.
     *
     * Entries are never updated or deleted: revocation is a status on the
     * attestation record, never an erasure of the issuance log. See
     * ATTESTATION-PROTOCOL.md §10.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'seq',
        'prev_hash',
        'public_id',
        'subject_hash',
        'gates_passed',
        'issued_at',
        'human_principal',
        'authorization',
        'entry_hash',
    ];

    protected function casts(): array
    {
        return [
            'seq' => 'integer',
            'gates_passed' => 'array',
            'issued_at' => 'datetime',
        ];
    }
}
