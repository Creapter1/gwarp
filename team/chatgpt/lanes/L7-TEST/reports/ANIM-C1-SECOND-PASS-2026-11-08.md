# ANIM-C1 helper package — second-pass review

Date: 2026-11-08
Status: SOURCE-VERIFIED; app/runtime behavior and tests NOT-TESTED by this reviewer.
Scope: read-only review of the proposal notes, helper, and tests on `ai-team`. No UI actions, app edits, test runs, or package changes.

## Evidence

- `team/ai-team/shared/2026-11-08-chatgpt-ANIM-C1/NOTES.md` blob: `50f37ee6110805f03ff2c9dd6bc40e6be15a73f7`
- `code/anim-centre.js` blob: `204f91e4618c114b482a3e0a3f09366673efe596`
- `tests/anim-centre.test.js` blob: `17827621ac36021299ce1be7cf228f047503d30d`
- These helper/test blobs match the package at requested commit `9251f37549789378c16eed2282ea67267b223fc4`; the current NOTES blob has since been refreshed.

## Confirmed fixes

- Coordinate units/origin are now explicit in NOTES lines 33–34 and helper lines 9–11: adapter inputs must share G-Warp costume-local logical units, normalize SVG viewBox origin/raster resolution, and leave Scratch serializer offsets to the serializer.
- Supplied malformed `feetLineY` values fail: helper lines 58–61 validates a present option as a finite number; tests lines 26–42 include valid alignment and a string rejection.
- `rotationCentreFromPoint()` returns a cloned, finite x/y point via the shared validator (helper lines 48–50; tests lines 16–24 check clone and NaN rejection).
- Expected frame count now detects gaps and duplicate indices and positive integer indices at/above the count (helper lines 91–102). The tests exercise a gap and duplicate (tests lines 50–58).

## Remaining concerns

1. **Malformed frame metadata is still silently ignored.** The selector filters same-animation records to integer, non-negative frame values before validating them (helper lines 83–88). Thus a negative or fractional index can disappear without an error, even if all expected valid indices are present. Validate every record tagged with that animation before filtering; add negative/fractional cases and a direct positive out-of-range test. This is a proposal-helper edge case, not an observed app failure.
2. **The one-pixel cap is caller-overridable.** `validateMadeFrames(outputs, tolerancePx)` defaults to 1 but accepts any finite non-negative tolerance (helper lines 156–161, 185). That permits a caller to bypass the NOTES line 32 “within 1 px” invariant. Remove the parameter, reject values above 1, or clarify that it is an intentional configurable threshold; add a test for the chosen contract.
3. **Notes test counts are stale.** The current test file contains 9 top-level test cases, while NOTES lines 27 and 56 still say eight cases / 8 passed. AI-COMMS now records a 9/9 helper run, but I did not run tests. Refresh the notes evidence to match the current run.

## Boundary

This review establishes helper/docs source behavior only. G-Warp integration, UI behavior, undo wiring, and runtime output remain untested; no app/source change is represented by this report.
