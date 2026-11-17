# Glenride Digest Attestation Protocol

Version 1.0 — November 17, 2026.

This document is the formal operating protocol for Glenride's automated
weekly-digest attestations. It states, in checkable steps, how a published
drug-shortage digest becomes a signed attestation, how failures are handled,
and how the whole record can be verified after the fact. It is written so an
auditor or a funder can follow every step without trusting any person's word
for it: each step names what is checked, where the evidence lives, and what
happens when a check fails.

## 0. Nature of this document

This is an internal operating protocol. It is not a contractual agreement,
and it is not under clinical-study protocol review purview. It governs how
Glenride's own system prepares, checks, signs, publishes, and records
attestations of its own published digests. No lawyer-review step or gate is
part of this process.

This protocol governs the code. If the code and this protocol ever disagree,
the code is fixed to the protocol and the discrepancy is reported. The
protocol, the PRD (ThinkTank OS digest attestation PRD, October 29, 2026,
approved November 17, 2026), and the Attestation SOP v1.1 are kept
consistent; a change to one is a change to all three.

## 1. Words used in this protocol

- **Attestation.** A signed record stating that a specific published work
  says what Glenride claims it says. An attestation does not say the
  underlying facts are true in the world; it says the identified work, with
  the identified content, was checked against the claim at issuance.
- **Digest.** Glenride's weekly drug-shortage digest: a published edition
  reporting the week's shortage figures.
- **Claim.** The single sentence an attestation stands behind. For digests
  it follows a fixed template (section 5) filled with the digest run's
  figures.
- **Gate.** A check that must pass before signing. There are six (section 6).
  Any failed gate holds the edition; nothing signs past a failure.
- **Hash (SHA-256).** A 64-character fingerprint computed from a file's
  exact bytes. Any change to the file, however small, produces a different
  fingerprint. Comparing hashes proves a file is byte-for-byte the file that
  was recorded.
- **Signature (HMAC-SHA256).** A tamper-evident seal computed from the
  attestation's public ID, subject, hash, and issue time, using a secret key
  that never leaves the issuing environment. Anyone with the record can
  recompute the seal; a mismatch proves alteration.
- **Public ID.** The human-readable identifier of an attestation, shaped
  like `GLR-AT-2026-XXXXXX`. It appears in the registry, on the verify page,
  and in every log entry.
- **Subject hash.** The SHA-256 fingerprint of the canonical digest file.
- **Canonical file.** The single stored copy of the digest edition that the
  attestation binds to. If the canonical file changes, the hash changes and
  the old attestation no longer describes it.
- **Held.** An edition that failed a gate. It is recorded with the exact
  failed gate and reason, and it is never signed until the failure is fixed.
- **Issuer of record.** The party in whose name attestations are issued:
  Glenride.
- **Human principal.** The human being who is the source of the attestation
  decision: D'Vaughn House, principal of Glenride.
- **Issuance log / chain.** The append-only, numbered, hash-linked record of
  every issued attestation (section 10).

## 2. Human source

Machines propose; humans are the source of all decisions. That principle
governs this protocol absolutely.

- The human principal of every attestation is **D'Vaughn House, principal of
  Glenride**. Glenride is the issuer of record, acting through him.
- The system prepares the attestation, runs the gates, and executes the
  signature as the human principal's instrument. The system is never named
  as the attestor, in any record, log, email, or page.
- Every automated issuance records the standing authorization under which
  the system executed the signature: SOP v1.1 automated issuance,
  authorized by D'Vaughn House's tap on November 17, 2026, approving the
  automated digest attestation PRD defaults. The authorization appears in
  the attestation's evidence record, in the issuance log entry, in the run
  audit record, and in the system-sent email.
- Challenge and revocation are retained by the human. Any signed-in Fellow
  may challenge an attestation with stated grounds; only Glenride editors
  and orchestrators may revoke one. The system never challenges or revokes
  on its own.
- The signing mechanics are unchanged by this section: the same HMAC
  signature, the same key, the same verification. What this section fixes is
  whose decision the signature executes, and where that is recorded.

## 3. Roles

| Role | Who | What they do |
|---|---|---|
| Human principal | D'Vaughn House | Source of every attestation decision. Grants and holds the standing authorization. Retains challenge and revocation. |
| Issuer of record | Glenride | The name under which attestations are issued, acting through the human principal. |
| Orchestrator account | The Glenride orchestrator user account in ThinkTank OS | The account the system signs under. It is the instrument, not the decision-maker. |
| System | The scheduled job and the shared attestation code | Prepares rows, runs gates, executes signatures, publishes, logs, and emails. Never the attestor. |
| Issuer (button) | A signed-in Glenride editor or orchestrator | May press Attest on a queued row. The button runs the same gates and signing code as the scheduled job. |
| Challenger | Any signed-in Fellow | May challenge any attestation in force, with stated grounds. |
| Reader / auditor | Anyone | May read the registry, verify a signature, and recompute the issuance chain. No account needed for public verification. |

## 4. Trigger and preparation

1. **Trigger.** The scheduled job runs daily at 10:00 AM Eastern on the
   iMac host, via the Laravel scheduler and a host systemd user timer
   (`thinktank-scheduler.timer`) that calls `schedule:run` every minute. Preparation leads to signing automatically:
   in steady state there is no human step between a digest being published
   and its attestation issuing.
2. **Queue.** Each digest edition is represented by a trigger row (a JSON
   file in storage under `digest-attestation/queue/`), prepared from the
   digest run. A row carries: the edition date, the subject title exactly
   as published, the kind `report`, the digest run figures (ASHP count, FDA
   in-shortage count, FDA total, retrieval date), the canonical file path,
   the recorded subject hash, the public URL where the edition is public,
   whether the edition is public or a paid artifact, and whether it is
   released.
3. **Canonical file.** The digest edition's canonical file is stored under
   `digest-attestation/files/`. The row's recorded hash must be the SHA-256
   of that file's bytes.
4. **Claim preparation.** The claim is built from the fixed template in
   section 5, filled with the row's digest run figures. No other claim
   wording is used for digest attestations.
5. **No invention.** The system never invents a figure, a title, a hash, or
   a review record. If a required value is missing, the row fails the gate
   that needs it and is held.

The triple-check review layer (Checker One, Checker Two, and Janine) is a
separate editorial process. It is not one of the six gates, and the gates
never block on it. If no triple-check record exists for a digest, that is
noted; no triple-check record is ever fabricated.

## 5. The claim template

Every digest attestation carries exactly this claim, with the bracketed
values filled from the digest run:

> Glenride's weekly drug-shortage digest for `<date>`: ASHP tracked `<n>`
> live shortage bulletins and the FDA listed `<m>` of `<k>` database entries
> in shortage, retrieved and verified on `<date>`.

`<date>` is the retrieval date written in full (for example, October 19,
2026). `<n>` is the ASHP live shortage bulletin count. `<m>` is the FDA
in-shortage count and `<k>` the FDA database total. The figures are taken
from the digest run record, never re-typed.

## 6. The six gates

The gates run in order. The first failure stops the run for that edition
and holds it with the exact failed gate and reason. All six must pass before
any signature is computed.

1. **Finished and fixed.** The edition is released, and its canonical file
   exists on disk. A draft, a slid edition, or a missing file fails this
   gate. What unblocks it: the edition is published and its canonical file
   is stored.
2. **Checkable.** Where the edition is public, its public URL returns HTTP
   200. A paid artifact satisfies this gate through the canonical file plus
   its hash (gates 1 and 3); no public URL is required for paid editions.
   What unblocks it: the public page is live, or the edition is correctly
   recorded as a paid artifact with file and hash.
3. **Hash parity.** The SHA-256 of the canonical file's current bytes
   equals the recorded subject hash. A mismatch — including a file edited
   after publication — fails this gate, because the attestation would bind
   to content that is no longer the published content. What unblocks it: a
   canonical file whose bytes match a hash recorded at release time. A
   post-publication edit can never be cured by re-recording the hash; the
   release-time hash is the record.
4. **Claim fidelity.** The built claim's figures match the digest run
   figures exactly, and any claim already recorded for the edition matches
   the built claim. What unblocks it: the digest run figures and the
   recorded claim are corrected to agree.
5. **Identity.** The subject title is exactly the title as published, and
   the kind is `report`. What unblocks it: the row carries the published
   title verbatim.
6. **No duplicates.** No existing attestation already covers the edition
   (same URL and hash, or same subject hash). A duplicate trigger is a
   no-op: no new attestation, no new sequence number, no new signature. The
   existing public ID is reported.

## 7. Signing

When all six gates pass, the system executes the signature using the same
signing code as every other attestation in the system:

1. A public ID is generated (`GLR-AT-YYYY-XXXXXX`, six random characters).
2. The signature is computed as HMAC-SHA256 over the canonical record
   (public ID, subject type and ID, subject hash, issue time) with the
   application's secret key. The key never leaves the iMac environment; it
   is never copied, printed, or logged.
3. The attestation record is created with: the public ID, the subject title
   and kind `report`, the claim, the evidence record (title, kind, entered
   via `automated`, evidence notes, evidence URLs, subject hash, the human
   principal, and the authorization), the subject hash, the signature, the
   orchestrator account as verifier, the issuer name Glenride, the method
   `automated_digest_v1`, status `issued`, and the issue time.
4. The issuance log entry is appended in the same database transaction
   (section 10). If the attestation already existed (a race with another
   run), no log entry is appended.
5. No credit debit is made for automated digest attestations. The debit
   rule applies to manuscript-pipeline attestations only.

Signing mechanics are identical for the scheduled path and the button path:
both call the same preparation, gates, and signing code. There is no second
implementation.

## 8. Publication

An issued attestation is published immediately:

1. **Registry.** The attestation appears in the public registry at
   `/attestations`.
2. **Verify page.** The attestation's public page recomputes the signature
   from the stored record. A matching recomputation proves the record is
   intact.
3. **Issuance log.** The chain entry is visible to the verify command
   (section 10).
4. **Mission Control log.** The run's issuances and holds are logged to
   Mission Control (digest date, title, public ID, hash, gates, timestamp).
5. **Email.** The system-sent run email goes to the human principal
   (section 11).

## 9. Failure handling

- **Held.** Any gate failure holds the edition. The hold records the
  edition, the failed gate number, the exact reason, and the run time. The
  hold is written to the state file and the audit record, and reported in
  the run email with what unblocks it. A held edition is never signed.
- **Consecutive failures.** Each failed run for an edition increments its
  consecutive-failure count. A successful issuance clears it.
- **Three-run rule.** After 3 consecutive failed runs, the edition waits on
  a human: later scheduled runs skip it and report it as waiting, until a
  human re-runs it explicitly with the force option or fixes the failed
  gate. The wait is a pause, not a deletion: the row stays queued.
- **Missing file or URL.** An edition missing its canonical file or its
  required URL is held, not skipped. Held editions stay visible in the
  queue, in the audit record, and in the email until resolved.
- **Email failure.** If the run email cannot be sent, the run still
  completes: issuances stand, holds stand, and the email payload is written
  to the outbox file. A mail failure never rolls back an issuance.

## 10. Serialization: the append-only issuance log

Every issued attestation gets the next sequence number in an append-only
log. The log is a hash chain: each entry links to the one before it, so any
alteration, deletion, or reordering is detectable by recomputation.

### 10.1 Entry contents

Each entry records:

| Field | Meaning |
|---|---|
| `seq` | Sequence number. Monotonic, gap-free, starting at 0 for genesis. |
| `prev_hash` | The previous entry's entry hash. |
| `public_id` | The attestation's public ID. |
| `subject_hash` | The attestation's subject hash. |
| `gates_passed` | The list of gates passed: `[1, 2, 3, 4, 5, 6]`. |
| `issued_at` | The attestation's issue time, in ISO 8601. |
| `human_principal` | D'Vaughn House, principal of Glenride. |
| `authorization` | The standing authorization under which the signature was executed (section 2). |
| `entry_hash` | SHA-256 over the canonical form of the fields above. |

### 10.2 Entry hash formula

The entry hash is SHA-256 over the canonical JSON array, with no spaces
and slashes unescaped:

```
[seq, prev_hash, public_id, subject_hash, gates_passed, issued_at_iso, human_principal, authorization]
```

`issued_at_iso` is the issue time formatted as ISO 8601 with its timezone
offset (for example, `2026-11-17T15:04:22+00:00`). `gates_passed` is the
JSON array of gate numbers in order.

### 10.3 Genesis entry

The chain begins with an explicit genesis entry, sequence 0, created
lazily by the first append:

| Field | Value |
|---|---|
| `seq` | `0` |
| `prev_hash` | 64 zero characters |
| `public_id` | `GENESIS` |
| `subject_hash` | SHA-256 of the string `glenride-witness-genesis-v1` |
| `gates_passed` | `[]` (empty: genesis is not an issuance) |
| `issued_at` | `2026-11-17T00:00:00+00:00` |
| `human_principal` | D'Vaughn House, principal of Glenride |
| `authorization` | `Genesis entry — chain anchor; no issuance, no authorization exercised.` |
| `entry_hash` | SHA-256 over the canonical form above |

### 10.4 Rules

- Sequence numbers are monotonic and gap-free, enforced by a uniqueness
  constraint and by appending inside a locked transaction.
- A duplicate trigger creates no new sequence number.
- A held edition gets no sequence number: it was never issued.
- Entries are never edited or deleted. A revoked attestation keeps its
  entry; revocation is recorded on the attestation itself, not by removing
  history.

### 10.5 Verification

The command `attestations:verify-chain` recomputes the whole chain from
genesis and reports:

- whether the sequence runs 0, 1, 2, … with no gaps;
- whether every entry's `prev_hash` equals the previous entry's
  `entry_hash`;
- whether every entry's `entry_hash` matches a recomputation from its
  stored fields;
- whether the genesis entry matches the defined genesis values;
- whether every non-genesis entry names an attestation that exists.

Any failure is reported by sequence number with the exact mismatch, and the
command exits non-zero. An empty log verifies as valid and empty.

## 11. The system-sent email

On every scheduled run, the system sends one email to the human principal
at dvaughnhouse@gmail.com. The email is sent by the job itself; it never
depends on chat, memory, or any person's judgment.

- **Issued editions** are listed with the digest title and date, the
  figures, the gates passed, the public ID, the registry link, the verify
  link, the human principal, and the authorization.
- **Held editions** produce an URGENT subject line naming the exact failed
  gate, the reason, and what unblocks it.
- **Duplicates** and **waiting** editions are listed plainly.
- Every payload is also written to an outbox file under
  `digest-attestation/outbox/`, whether or not delivery succeeds. If no
  working mail configuration exists, the payload is queued on disk and the
  missing configuration is reported; no credentials are ever invented.

## 12. The one-click attest button

The digest queue page (`/attestations/digest-queue`, issuer login required)
lists queued digest editions pre-filled with title, claim, evidence, URL,
and hash, with one Attest button per row.

- The button runs the same preparation, gates, and signing code as the
  scheduled job. A gate failure holds the row and shows the reason; the
  button never signs past a failure.
- The button is the human override and fallback control. It is not the
  steady-state path: steady state signs automatically after preparation.
- A test proves the button path and the automatic path share the gates: one
  gate failure blocks both.

## 13. Challenge and revocation

- Any signed-in Fellow may challenge an attestation in force, with stated
  grounds of at least 10 characters. A challenge marks the record
  `challenged` in public until resolved.
- Only Glenride editors and orchestrators may revoke an attestation, with a
  stated reason. Revocation marks the record `revoked` with the time and
  reason; the issuance log entry is kept.
- Challenge and revocation are human acts, retained by the human. The
  system never challenges or revokes on its own.

## 14. Host, schedule, and key custody

- **Host.** The iMac. The scheduled job runs in the ThinkTank OS Docker
  application container; a host systemd user timer
  (`thinktank-scheduler.timer`) calls `schedule:run` every minute. (This
  host has no crontab; the systemd timer is the scheduling mechanism.)
- **Schedule.** Daily at 10:00 AM Eastern. The command processes whatever
  rows are queued; it is a no-op when none are queued.
- **Key custody.** The signing key lives only in the application's
  environment on the iMac. It is never copied, printed, logged, committed,
  or moved. No Sepolia or mainnet deployment is part of this protocol; an
  on-chain anchor remains a separately authorized act, recorded on the
  attestation when performed.

## 15. Records kept

| Record | Location | Contents |
|---|---|---|
| Attestation | Database, `attestations` | Public ID, subject, claim, evidence record, hash, signature, verifier, issuer, method, status, times. |
| Issuance log | Database, `attestation_issuance_log` | Section 10 entries. |
| Queue rows | Storage, `digest-attestation/queue/` | One JSON file per edition. |
| Canonical files | Storage, `digest-attestation/files/` | The bound digest files. |
| Held state | Storage, `digest-attestation/state.json` | Consecutive failures and waiting flags. |
| Audit record | Storage, `digest-attestation/audit.jsonl` | One JSON line per run outcome. |
| Email outbox | Storage, `digest-attestation/outbox/` | One JSON payload per run. |
| Scheduler log | Storage, `logs/digest-attestation-scheduler.log` | Scheduled run output. |

## 16. Version history

- **1.0 — November 17, 2026.** Initial protocol. Approved with the PRD
  defaults by D'Vaughn House's tap, November 17, 2026. Human-source
  provisions, serialization scheme, email, and button included from the
  first version.
