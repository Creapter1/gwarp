# G-Warp Extension Security Model

**Audience:** maintainers, extension authors, reviewers, testers, educators and parents  
**Goal:** make extension permission, risk labeling, loading, runtime cleanup and user consent understandable and testable.

## 1. Core distinction: a label is not a sandbox

A badge such as **Safe**, **Moderate** or **Dangerous** helps communicate risk; it does not itself restrict the code. A security system must distinguish:

1. **Discovery:** where extension metadata comes from.
2. **Trust decision:** who reviewed the source and what that review actually covered.
3. **Execution boundary:** what APIs the extension can access at runtime.
4. **Permission/consent:** what the user is asked before a sensitive action.
5. **Monitoring and cleanup:** what happens on Stop, project close, extension removal or failure.
6. **Compatibility/export:** what a different editor can do with its blocks and serialized declarations.

G-Warp's README and TODO say its extension catalog includes G-Warp, TurboWarp and PenguinMod contributions, with risk labels, creator credits and licence obligations. Exact counts can change. Always check the live app and its current source rather than copying a count into a permanent guarantee.

## 2. Threat model

Protect:
- children's personal information and privacy;
- project code and assets from unwanted modification or loss;
- browser/device resources from runaway loops, excessive clones, huge lists and storage exhaustion;
- the host editor from arbitrary network, DOM, navigation or download actions;
- users from deceptive permission labels and silent data transmission;
- extension authors from incorrect attribution or licence loss;
- imported projects from malformed data and unsupported declarations.

Potential attackers and failure sources include malicious extension code, compromised hosted files, typo-squatted URLs, innocent but buggy extensions, hostile project files, unreviewed copy-pasted JavaScript, and features whose capabilities were not understood.

A core threat distinction: **a project file may declare an extension, but that declaration is not permission to fetch or execute it automatically.** Importing a project should not silently install remote code.

## 3. Sandboxed versus unsandboxed execution

TurboWarp and PenguinMod documentation both describe a difference between sandboxed and unsandboxed custom extensions. Unsandboxed code runs with more direct access to the editor/runtime environment and can have much greater power. This is not a subtle performance setting; it is a trust-boundary decision.

References:
- [TurboWarp custom extension introduction](https://docs.turbowarp.org/development/extensions/introduction)
- [TurboWarp unsandboxed extension documentation](https://docs.turbowarp.org/development/extensions/unsandboxed)
- [PenguinMod custom extensions](https://docs.penguinmod.com/development/extensions/)
- [Scratch VM extension documentation](https://github.com/scratchfoundation/scratch-editor/blob/develop/packages/scratch-vm/docs/extensions.md)

These upstreams do not prove G-Warp implements the same sandbox. Inspect G-Warp's actual extension loader and test it. Do not call an extension sandboxed simply because its card says “Safe.”

### Recommended rule

Default new/user-provided extension code to the least-capable execution environment that supports it. If a feature requires unsandboxed access, explain what access is needed, identify the reviewed source/version, and show an explicit opt-in with a meaningful warning. A URL allowlist and a displayed label are not substitutes for an execution boundary.

## 4. Risk labels should be capability-based

Use risk categories as **communication and review tiers**, with concrete reasons. The exact naming can remain consistent with G-Warp's existing UI, but the reasoning should be reproducible.

| Capability or behavior | Minimum review concern | User-facing explanation |
|---|---|---|
| Local computation / pure reporters | Low baseline risk, still check loops and memory | Does not need to access personal information or network |
| Project/state mutation, storage APIs, large asset operations | Moderate review | Can change, store or possibly damage project data |
| Network requests or remote resource loading | Elevated privacy/integrity risk | May contact an external service; explain what data leaves and where |
| Clipboard, downloads, new tabs, broad DOM access | Elevated user-action and phishing risk | Can interact with browser/page or move data outside the project |
| Camera, microphone or other sensors | Sensitive permission | Explain hardware access and browser permission prompt |
| IP/location/device fingerprinting, login or credential access | Dangerous by policy | Must warn clearly and require explicit user intent; prefer reject/block when unrelated to core purpose |
| Arbitrary unsandboxed code in main page | Critical execution power | Can affect the editor and project, not merely add a harmless block |
| Hidden transmission, credential theft, silent surveillance, destructive behavior | Prohibited | Do not distribute or run |

Risk is the union of capabilities actually reachable at runtime, not the extension author's description. An extension with no intentional network block might still fetch a URL internally.

## 5. G-Warp safety rules that documentation must preserve

The project's TODO establishes these product rules:

- Extensions that can read personal information (including IP, location or logins) are labeled Dangerous and warned.
- No accounts are built into the project.
- Children under 13 need a parent's OK before any data is sent.
- Project blocks must never silently execute arbitrary JavaScript.
- Credits and licences must be preserved.
- Projects submitted for bug reports remain private and are deleted after the review workflow, according to the project rule; do not collect or retain them without consent.
- G-Warp must not silently replace an existing feature or obscure a dangerous capability behind an innocuous label.

Before relying on a product rule, also verify the code path enforces it. A written promise without an effective guard is not sufficient.

## 6. Network and personal data consent

Before an extension sends data, the user should be able to answer:

- What exact data is sent?
- Why is it necessary?
- To what domain/service?
- Is it sent once or repeatedly?
- Does the service retain it?
- Can the feature work offline or with less data?
- Can the user cancel, deny or stop it?
- Does the project contain personal information that could be included by mistake?

Consent should be action-specific and meaningful. A general “accept” at extension install should not authorize every future data transmission. Avoid collecting project contents by default. Never transmit API keys or credentials to a third-party service without an explicitly designed, user-approved flow; never persist keys in plaintext project exports.

## 7. Extension lifecycle contract

For each extension, test and document:
- load and initialization success/failure;
- whether the extension can register new blocks or modify existing definitions;
- which runtime/state APIs it uses;
- asynchronous callbacks and promise rejection;
- runaway behavior and timeouts;
- project mutation and undo behavior;
- what happens if the extension is removed;
- behavior when its project is loaded without the extension installed;
- cleanup after Stop, project reset, close/reload and errors;
- serialization/export declarations and compatibility with Scratch/TurboWarp/PenguinMod;
- network, storage, clipboard, DOM, camera/microphone and navigation access.

Stop must stop extension-owned timers, event listeners, audio nodes, network polling and other repeating work where those operations are part of the running project. An extension that has a “Stop” block but continues a background timer is not correctly cleaned up.

## 8. Review process for a new extension

1. **Identify source:** repository/creator/URL, version, licence and content hash when practical.
2. **Inspect code:** all imports, evaluated text, fetches, dynamic script injection, DOM access, storage, navigation, clipboard and permission APIs.
3. **Map capabilities:** compare real code to what the extension card says.
4. **Check execution boundary:** determine whether it is isolated and what the isolation allows.
5. **Use static analysis plus behavior tests:** no one test is a proof of safety.
6. **Test failure conditions:** offline, HTTP errors, malformed responses, missing permission, Stop, repeated load, removal and corrupt project state.
7. **Assign risk label with rationale:** record exactly why.
8. **Record author/license:** preserve copyright and attribution notices.
9. **Document supported contexts:** editor/browser/desktop and offline behavior, plus project-format limitations.
10. **Re-review changes:** a new URL content or version can change the risk profile.

Do not mark a creator/source trusted forever merely because an older version was reviewed.

## 9. Suggested automated and manual security cases

- An extension references a remote URL during project import; expected: no fetch until visible user action.
- A Dangerous extension attempts to read location/IP-like information; expected: clear warning and no silent collection.
- An extension rejects its initialization promise; expected: visible error, editor remains usable.
- An extension starts a timer, then Stop is pressed; expected: timer stops where part of project execution.
- An extension's handler throws; expected: useful diagnostic and no permanent UI lock.
- Extension code repeats initialization; expected: no duplicate listeners or duplicate blocks unless intended.
- An extension tries to alter or delete unrelated project state; expected: only capabilities explicitly allowed by its execution boundary work.
- A project refers to a missing extension; expected: visible unsupported-extension state, not silent code execution or destructive removal.
- A remote extension changes after review; expected: integrity/version handling follows documented policy.
- Network access is denied/offline; expected: informative failure and no infinite retry loop.
- Local storage contains malformed data; expected: validation and graceful recovery.
- A malicious SVG or malformed archive is imported; expected: safe reject/normalize path.
- A project contains personal information and the user opens bug reporting; expected: explicit privacy warning and consent before upload.

## 10. Security and browser storage

Local project/recovery data still needs validation. OWASP warns that browser storage can be read or overwritten by same-origin scripts and should not be treated as a trusted vault. [OWASP HTML5 Security Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/HTML5_Security_Cheat_Sheet.html) explains this risk for Web Storage and client databases.

[MDN IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API) explains that it stores substantial structured data asynchronously, but quotas and eviction vary by browser and operating system. IndexedDB is a reasonable candidate for large project autosaves compared with small Web Storage values, not a guarantee that data can never be evicted or corrupted.

Security requirements:
- validate records after reading;
- version data schemas and handle migrations;
- bound stored project sizes and number of recovery records;
- handle quota, private browsing and transaction errors;
- never trust an autosave just because G-Warp wrote it previously;
- provide a way to delete recovery data;
- avoid saving credentials/secrets in projects or automatic logs.

## 11. Reporting and incident handling

A security report should include only information needed to reproduce the issue. Provide a private reporting option for suspected vulnerabilities; don't require users to post a project publicly if it contains personal or private information.

Record affected app build/SHA, extension name/version/source, browser, action sequence, expected vs actual behavior, logs and whether personal data left the machine. Do not publish private project content or access tokens in issues.

## 12. Review checklist

Before release, answer YES/NO/NOT TESTED for every item:

- [ ] Extension origin/source and licence recorded.
- [ ] Risk label matches actual capabilities.
- [ ] Sandbox boundary verified rather than assumed.
- [ ] No unapproved code fetch/evaluation from imported project metadata.
- [ ] Sensitive data actions are explained and explicitly approved.
- [ ] Error and offline behavior are handled.
- [ ] Stop/removal/reset cleanup tested.
- [ ] Large loops and memory growth are bounded or controlled.
- [ ] Missing-extension import behaves predictably.
- [ ] Project contents and remote requests are inspected for privacy leakage.
- [ ] Browser/desktop support and compatibility are documented.
- [ ] Evidence and test artifacts are saved.

This checklist is a policy and test plan. It is not certification that every extension in the current G-Warp gallery already passes it.
