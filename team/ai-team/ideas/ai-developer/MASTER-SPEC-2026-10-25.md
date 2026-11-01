# G-WARP AI DEVELOPER
# ULTIMATE MASTER ENGINEERING SPECIFICATION
## LOCAL AI • REAL COMPUTER CONTROL • VISUAL UNDERSTANDING • AUTONOMOUS DEVELOPMENT • OLLAMA • GITHUB • G-WARP INTEGRATION • PROJECT MEMORY • MULTI-AGENT COLLABORATION

**DOCUMENT TYPE:** Master engineering directive  
**PROJECT:** G-Warp AI Developer  
**PRIMARY ENVIRONMENT:** Windows  
**LOCAL AI ENGINE:** Ollama  
**PRIMARY APPLICATION:** G-Warp  
**SOURCE CONTROL:** Git and GitHub  
**FIRST DEMONSTRATION PROJECT:** Army Men RTS-inspired Scratch 3 game  
**PRIMARY DELIVERABLE:** A real AI development system integrated into G-Warp, capable of operating G-Warp on the user's computer.

---

# PART 1 — THE MISSION

## 1.1 What you are building

You are not building an ordinary AI chatbot.

You are not building another text box that gives programming advice.

You are not building a tool that only generates HTML, JavaScript, Scratch blocks, SVG files, or project files.

You are building a complete AI Developer system that can use the user's actual computer and work inside the actual G-Warp application.

The difference is extremely important.

The user wants to open G-Warp, start AI Developer, provide a task, and watch the AI perform the work.

The AI must be able to:

1. Understand what the user wants.
2. Inspect the current project.
3. Inspect the existing G-Warp application.
4. Understand available G-Warp capabilities.
5. Create a detailed work plan.
6. Use the actual G-Warp interface.
7. See the result of its actions.
8. Use supported G-Warp project APIs where appropriate.
9. Create graphics and other assets.
10. Create and modify scripts.
11. Build complete projects.
12. Run those projects.
13. Observe their behavior.
14. Detect visual and logical defects.
15. Investigate errors.
16. Repair problems.
17. Run tests again.
18. Save work.
19. Maintain permanent project history.
20. Resume unfinished work after interruptions.

The goal is to create an AI developer that can perform meaningful development work, not simply describe how another person could perform it.

## 1.2 The fundamental operating principle

**The AI must understand, operate, observe, verify, and improve.**

These are five separate responsibilities.

- Understand: determine what the task requires.
- Operate: perform an actual action using an authorized tool.
- Observe: inspect the resulting application state.
- Verify: determine whether the intended result occurred.
- Improve: correct problems and test again.

A generated answer is not evidence that work was performed.

A function call is not evidence that the function worked.

A successful file write is not evidence that the project works.

A successful ZIP export is not evidence that the exported project works in regular Scratch.

Every important claim must be supported by an appropriate verification.

## 1.3 What success looks like

The finished product should allow the user to say:

"Create a new Army Men RTS project in G-Warp. Start with the terrain, create the toy soldiers, build the resource system, add the first building, and make the units move and respond to orders."

The AI should then:

- Inspect the current G-Warp state.
- Create or open the correct project.
- Establish a task plan.
- Create the required graphics.
- Import the graphics into G-Warp.
- Create the required sprites and scripts.
- Build the project.
- Run the project.
- Observe the result.
- Test the required behavior.
- Repair defects.
- Save checkpoints.
- Update project documentation.
- Report what is actually complete.

The user must be able to watch this process.

---

# PART 2 — EXISTING ENVIRONMENT AND PROJECT CONTEXT

## 2.1 Known computer specifications

Use the following as the initial development machine:

- Windows PC.
- 32 GB RAM.
- NVIDIA RTX 3060.
- 12 GB VRAM.
- Ollama installed.
- Gemma 3 12B available.
- Qwen 3 27B also available.
- Existing G-Warp application.
- Existing GitHub repository: `Creapter1/gwarp`.

Preferred development location:

`C:\Users\mario\OneDrive\Documents\ai`

All examples and commands should use the actual project location.

Do not start commands in:

`C:\Windows\System32`

Do not assume that the preferred directory has already been created. Inspect the computer and confirm paths before using them.

## 2.2 Important hardware rule

The first machine is a development and testing machine, not a minimum hardware requirement for everyone.

The public product must support different configurations.

Do not assume every user has:

- 32 GB RAM.
- 12 GB VRAM.
- An NVIDIA graphics card.
- The same Ollama models.
- The same operating system.

Build hardware detection and model recommendations.

Do not force one model on every user.

## 2.3 Existing G-Warp application

G-Warp is an existing large HTML/JavaScript application.

It already contains functionality that must be inspected before creating replacements.

Previously identified areas include:

- Scratch-like editor and runtime.
- AI helper functionality.
- SB3 exporter.
- File manager.
- Backup/restore functionality.
- Diagnostics.
- Local LAN collaboration infrastructure.

Potential integration points previously identified include:

- `window.Engine`
- `window.GW`
- `window.GW_PROJECT_DATA()`
- `window.GW8.exportSB3()`
- `window.GW_V1580_SB3_EXPORT`
- `window.GW_FILES`

These are starting points for investigation. Confirm that each still exists, determine its actual behavior, and inspect its dependencies.

Do not blindly rely on previous descriptions.

## 2.4 Protected source rule

The original G-Warp application is protected.

Do not overwrite, replace, rebuild, redesign, or substantially rewrite the original `app.html` without explicit authorization.

Do not remove existing features to make integration easier.

Do not change the original editor's behavior unnecessarily.

Use isolated branches, backups, controlled changes, and regression testing.

If an integration requires changes to `app.html`, identify the exact changes, their purpose, affected areas, and regression risks in the plan first.

**No authorization to implement means no implementation.**

---

# PART 3 — THE COMPLETE SYSTEM ARCHITECTURE

Design the product as a collection of cooperating components.

Do not put the entire AI system into one enormous JavaScript file.

G-Warp may remain the primary single-file application where appropriate, but the new development infrastructure should be modular.

## 3.1 Required architectural components

### Component A — G-Warp AI Developer interface

This is the visible interface inside G-Warp.

Responsibilities:

- Accept user tasks.
- Display active projects.
- Display selected AI models.
- Display task progress.
- Show live AI activity.
- Display screenshots and observations.
- Provide pause, resume and stop controls.
- Show task history.
- Show errors and warnings.
- Show test results.
- Show GitHub status.
- Show backup information.
- Show project memory.

### Component B — Local AI Agent Service

This is the central orchestration service.

It coordinates:

- Ollama.
- G-Warp.
- Browser or desktop automation.
- File access.
- Terminal/build tools.
- Project management.
- Memory.
- Logging.
- Testing.
- Git.
- Recovery.

It must manage long-running tasks safely.

It should not depend on a single HTTP request remaining open for the entire task.

Use persistent task records and resumable execution.

### Component C — Ollama Adapter

This connects the agent service to local models.

It handles:

- Model discovery.
- Model selection.
- Chat requests.
- Streaming.
- Context configuration.
- Tool-call interpretation.
- Timeouts.
- Connection errors.
- Model unloading or switching where appropriate.
- Resource-aware model selection.

### Component D — Computer Interaction Service

This provides the ability to observe and operate the real computer.

It handles:

- G-Warp screenshots.
- Browser inspection.
- Desktop screenshots when permitted.
- Mouse and keyboard input.
- Drag-and-drop.
- Window identification.
- Application state observation.
- Action verification.

### Component E — G-Warp Bridge

This provides safe communication with the application itself.

It must expose verified information about:

- Current project.
- Current editor state.
- Selected sprite.
- Current costume.
- Available sprites.
- Stage information.
- Scripts.
- Blocks.
- Variables.
- Lists.
- Broadcasts.
- Assets.
- Project save state.
- Project export state.

Do not expose undocumented internal functions without inspecting their behavior.

Provide a versioned bridge interface.

### Component F — Workspace Manager

This controls:

- Project directories.
- File access.
- Asset organization.
- Project isolation.
- Backups.
- File history.
- Build outputs.
- Export locations.

### Component G — Persistent Memory Service

This stores project knowledge, task state, decisions, and recovery information.

### Component H — GitHub Integration Service

This handles source control, branch management, commits, repository synchronization, releases, and pull request preparation.

### Component I — Testing and Verification Service

This runs tests and stores evidence.

### Component J — Task Scheduler and Recovery Manager

This manages:

- Queued tasks.
- Running tasks.
- Paused tasks.
- Interrupted tasks.
- Retry attempts.
- Deadlines.
- Recovery checkpoints.
- Resource limits.

---

# PART 4 — REAL COMPUTER VISION AND CONTROL

## 4.1 Do not fake computer operation

The most important capability is real interaction.

The AI must be able to observe G-Warp and operate it.

It is not acceptable to create a fake cursor animation while performing unrelated background file operations.

It is not acceptable to show a simulated screenshot.

It is not acceptable to claim a button was clicked without checking whether the action succeeded.

Every displayed action must correspond to a real operation.

## 4.2 Support multiple observation methods

Investigate the best approach for each installation.

Possible approaches include:

- Playwright.
- Browser debugging protocols.
- Browser DOM inspection.
- Screenshot-based computer vision.
- Windows desktop automation.
- Accessibility interfaces.
- A custom G-Warp interaction bridge.

Do not choose a technology just because it is convenient.

Compare:

- Reliability.
- Speed.
- Compatibility.
- Security.
- Difficulty of installation.
- Ability to observe visual state.
- Ability to interact with the actual application.

Use the simplest reliable method for the actual environment.

## 4.3 Browser-based G-Warp control

Where the application is running in a supported browser or controlled web view, investigate browser automation.

The AI should be able to:

- Identify the correct G-Warp tab.
- Inspect the page.
- Identify visible controls.
- Read accessible labels.
- Inspect selected elements.
- Click editor controls.
- Type into fields.
- Drag objects.
- Capture screenshots.
- Wait for application changes.
- Detect browser console errors.
- Verify the result.

Do not confuse the DOM state with the visual state.

The DOM may report that an object exists while the object is hidden, off-screen, incorrectly layered, or visually broken.

Check both logical and visual outcomes when appropriate.

## 4.4 Desktop control

When browser automation is insufficient, provide a controlled desktop adapter.

It should be able to:

- Locate G-Warp's window.
- Confirm the correct window is active.
- Capture the application window.
- Send mouse input.
- Send keyboard input.
- Scroll.
- Drag objects.
- Enter text.
- Capture the resulting screen.
- Verify the changed state.

Do not allow arbitrary control of unrelated applications by default.

Require explicit permission to expand the computer-control scope.

## 4.5 Visual understanding pipeline

Create a repeatable observation pipeline.

A typical observation should contain:

1. Screenshot.
2. Application identity.
3. Window dimensions.
4. Active editor or panel.
5. Current project identity.
6. Relevant selected object.
7. Available accessibility or DOM information.
8. Current task ID.
9. Timestamp.
10. Observation result.

Where image analysis is necessary, pass the screenshot to a vision-capable model or approved visual-analysis component.

Do not assume every Ollama model supports vision.

Detect model capabilities before assigning image tasks.

When the selected model cannot interpret images, use an available compatible visual model or a separate visual-analysis method.

Do not silently send private screenshots to a cloud service.

## 4.6 Action confirmation

Every important computer action must have:

- An action ID.
- A target.
- An expected result.
- An execution record.
- An observation after execution.
- A final status.

Example:

Action: Create sprite.

Expected result: New sprite appears in the project sprite list.

Verification:

- Confirm sprite count increased.
- Confirm new sprite is selected.
- Confirm the sprite appears in the stage or sprite list as expected.
- Capture evidence.

Only then mark the action verified.

## 4.7 Interaction recovery

Implement recovery for:

- Wrong window active.
- Unexpected dialog.
- Lost focus.
- Failed click.
- Drag operation not completed.
- Loading delay.
- Modal dialog blocking the editor.
- Unexpected application reload.
- Editor state changing unexpectedly.
- Connection loss.

Do not continue blindly after an unexpected state.

Pause the action sequence, inspect the screen, and decide whether the action can safely be recovered.

## 4.8 Visible activity

The user must be able to see:

- What G-Warp window is being controlled.
- What the AI sees.
- What the AI intends to do.
- What action is being executed.
- What happened afterward.
- Whether the action passed verification.

Provide optional slow, normal, and accelerated operation speeds.

Do not hide the AI's actions from the user.

---

# PART 5 — THE G-WARP APPLICATION BRIDGE

## 5.1 Purpose

Computer control is important, but relying exclusively on mouse clicks would be inefficient and unreliable.

Build a supported G-Warp bridge that gives the agent access to verified application capabilities.

The bridge must allow the agent to understand G-Warp without depending entirely on visual interpretation.

## 5.2 Project inspection

The bridge should provide structured information about:

- Project name.
- Project ID.
- Project version.
- Stage dimensions.
- Stage backdrop.
- Sprite names.
- Sprite IDs.
- Costume names.
- Sound names.
- Script contents.
- Block connections.
- Variables.
- Lists.
- Broadcast messages.
- Clones where supported.
- Project settings.
- Current editor state.
- Save status.
- Runtime status.

Return structured data with clear versioning.

## 5.3 Supported operations

Evaluate and document APIs for:

- Create sprite.
- Delete sprite.
- Duplicate sprite.
- Rename sprite.
- Change sprite position.
- Change sprite direction.
- Change sprite size.
- Change visibility.
- Create costume.
- Import costume.
- Change costume.
- Create sound.
- Import sound.
- Create script.
- Add block.
- Connect blocks.
- Modify block values.
- Create variable.
- Create list.
- Create broadcast.
- Save project.
- Load project.
- Export project.
- Run project.
- Stop project.
- Inspect runtime state.

Do not implement an operation until its real behavior is understood.

Where possible, use transactions or grouped operations so a partially completed change can be rolled back.

## 5.4 Version compatibility

The bridge must detect the G-Warp version.

If an operation is unavailable in a particular version, report it.

Never silently assume that an internal API is stable.

Maintain a bridge compatibility table.

## 5.5 Editor operation versus direct modification

Identify the method used for every operation.

Possible methods:

- GUI operation.
- Supported G-Warp bridge operation.
- Direct authorized project-file operation.
- Asset-generation operation.
- External test operation.

These methods should remain distinguishable in the activity log.

The AI may combine methods, but it must never claim that it operated the visual editor when it modified files directly.

---

# PART 6 — OLLAMA AND LOCAL MODEL SYSTEM

## 6.1 Connection

Connect through the local Ollama API.

Default address to inspect:

`http://127.0.0.1:11434`

Do not assume the service is running merely because Ollama is installed.

Perform a health check.

Discover installed models through the available Ollama API.

Do not rely on hardcoded model lists.

## 6.2 Model manager

Create a proper model manager inside G-Warp.

Show:

- Model name.
- Model family.
- Model size where available.
- Installed status.
- Available capabilities.
- Context configuration.
- Current status.
- Last successful request.
- Resource usage where measurable.
- Connection errors.

Allow users to select models for different jobs.

## 6.3 Role-based model assignment

Support different models for different tasks.

Examples:

- Main planning model.
- Coding model.
- Vision model.
- Research assistant.
- Testing assistant.
- Documentation assistant.
- Review model.

Initially, the same local model may perform multiple roles using different instructions.

The architecture must allow other models to be assigned later.

Do not pretend that role separation automatically creates independent intelligence.

Each role needs:

- Its own instructions.
- Its own task scope.
- Access to necessary project context.
- Tool permissions.
- Output format.
- Verification rules.

## 6.4 Model selection based on hardware

Detect:

- RAM.
- GPU.
- VRAM.
- Available disk space.
- Operating system.
- Installed Ollama version.
- Installed models.

Provide realistic recommendations.

The user's RTX 3060 12 GB environment is the first test configuration.

Do not assume that a 27B model will fit completely in VRAM.

Do not assume the largest downloaded model is necessarily the fastest or best option.

Where useful, test actual inference speed, context handling, memory use, and reliability.

## 6.5 Context management

Do not simply increase context length without measuring memory requirements.

Implement:

- Task-specific context.
- Project summaries.
- Selective file retrieval.
- Relevant code retrieval.
- Short-term task memory.
- Long-term project memory.
- Compact conversation history.
- Model-specific context configuration.

When context becomes too large:

1. Preserve the task objective.
2. Preserve verified decisions.
3. Preserve current state.
4. Preserve pending work.
5. Summarize completed work.
6. Record file and test references.
7. Continue from a compact state.

Never discard critical project constraints merely to fit a context window.

## 6.6 Offline capability

Local AI should be usable without a cloud AI account.

The system should continue to provide local development capabilities when internet access is unavailable.

Clearly distinguish features requiring internet access, such as external research, GitHub synchronization, or downloading models.

Never describe an internet-dependent function as offline.

---

# PART 7 — AGENT TOOL SYSTEM

## 7.1 The agent needs tools

The model must have controlled tools rather than only a conversation prompt.

Design a documented tool registry.

Each tool must define:

- Tool name.
- Purpose.
- Input schema.
- Output schema.
- Permission scope.
- Whether it changes data.
- Whether it can be reversed.
- Timeout.
- Retry behavior.
- Verification method.
- Audit requirements.

## 7.2 Required tool categories

### Application tools

- Inspect G-Warp.
- Capture G-Warp screenshot.
- Read current project.
- Read editor state.
- Open project.
- Save project.
- Run project.
- Stop project.
- Inspect runtime.

### Computer tools

- Identify G-Warp window.
- Capture window screenshot.
- Click control.
- Type text.
- Press key.
- Scroll.
- Drag object.
- Wait for visual change.
- Inspect current screen.

### File tools

- List authorized project files.
- Read file.
- Write new file.
- Modify authorized file.
- Rename file.
- Move file.
- Copy file.
- Delete approved file.
- Compare file versions.
- Create backup.
- Restore checkpoint.

### Development tools

- Run approved command.
- Execute test.
- Inspect test output.
- Inspect logs.
- Run static analysis.
- Validate JSON.
- Validate SVG.
- Validate project archive.
- Compare screenshots.
- Generate build report.

### Research tools

- Search external documentation when internet access is enabled.
- Open authorized research pages.
- Retrieve project-specific technical details.
- Store references.
- Record publication dates.
- Distinguish research findings from assumptions.

### Git tools

- Inspect status.
- Inspect branch.
- Compare changes.
- Create branch.
- Commit authorized changes.
- Revert changes.
- Prepare pull request.
- Generate change report.

### Memory tools

- Read project memory.
- Add verified decision.
- Add task note.
- Record defect.
- Update project specification.
- Record recovery state.

## 7.3 Tool execution standards

All tools must validate their arguments.

Never allow a model-generated tool call to bypass the permission system.

Use structured results.

Example result fields:

- `success`
- `task_id`
- `action_id`
- `timestamp`
- `operation`
- `result`
- `verification`
- `evidence`
- `error`

Do not trust a model's description of a tool result when the tool returned something different.

The execution service is the authority on whether an operation succeeded.

---

# PART 8 — AUTONOMOUS AGENT EXECUTION ENGINE

## 8.1 Hierarchical task management

Large tasks must be divided into smaller manageable tasks.

Each project should have:

- Main goal.
- Milestones.
- Phases.
- Tasks.
- Subtasks.
- Dependencies.
- Risks.
- Acceptance tests.

The agent must understand which tasks can run in parallel and which must run in sequence.

Never let two agents modify the same file simultaneously without coordination.

## 8.2 Required execution states

Use explicit states:

- CREATED
- NOT_STARTED
- PLANNED
- READY
- IN_PROGRESS
- PAUSING
- PAUSED
- WAITING
- BLOCKED
- RETRYING
- FAILED
- TESTING
- NEEDS_REVIEW
- VERIFIED
- COMPLETED
- CANCELLED
- RECOVERY_REQUIRED

Every state transition must be recorded.

## 8.3 Autonomous task cycle

Use this sequence:

1. Receive task.
2. Assign unique task ID.
3. Load current project memory.
4. Read user requirements.
5. Inspect project state.
6. Review active work.
7. Determine dependencies.
8. Identify uncertainty.
9. Research when necessary.
10. Generate task plan.
11. Identify expected output.
12. Identify tests.
13. Check permissions.
14. Create checkpoint.
15. Execute the next safe action.
16. Observe its result.
17. Verify the result.
18. Record the evidence.
19. Update project state.
20. Continue.

At appropriate checkpoints:

21. Run tests.
22. Review modifications.
23. Diagnose failures.
24. Repair them.
25. Run regression tests.
26. Save another checkpoint.
27. Update documentation.
28. Update task progress.
29. Continue until acceptance criteria are met.

## 8.4 Retry intelligence

Do not retry a failed operation blindly.

Classify the failure:

- Temporary.
- Connection failure.
- Timeout.
- Invalid instruction.
- Invalid file.
- Wrong application state.
- Permission failure.
- Model limitation.
- Unknown behavior.
- Actual software defect.

Then choose an appropriate recovery.

Use bounded retries.

After repeated failures, stop and escalate with evidence.

The AI must not create an infinite loop in which it keeps making the same change.

## 8.5 Long-running development

Allow tasks to continue through multiple sessions.

The service should support:

- Persistent queue.
- Task checkpoints.
- Periodic saving.
- Heartbeats.
- Task resumption.
- Recovery after restart.
- Graceful shutdown.
- Interrupted task detection.
- Resource limits.

Never claim that a task continued while the computer was off.

Never claim background progress that did not occur.

## 8.6 Progress estimation

Do not invent completion percentages.

Use actual task counts and states.

For example:

- 8 of 12 subtasks completed.
- 2 testing.
- 1 blocked.
- 1 not started.

Progress must be derived from the task system.

Display confidence separately from progress.

---

# PART 9 — MULTI-AGENT AI TEAM

## 9.1 Future capability

The architecture should support a team of AI agents.

Do not require all agents to run simultaneously.

Begin with one agent capable of performing multiple roles.

Add independent agents later when the computer and model resources support them.

## 9.2 Suggested roles

### Project Manager

Responsibilities:

- Understand user objectives.
- Create milestones.
- Track dependencies.
- Assign work.
- Monitor progress.
- Maintain project priorities.

### Lead Architect

Responsibilities:

- Inspect architecture.
- Design system changes.
- Define interfaces.
- Review technical risks.
- Prevent unnecessary rewrites.

### Research Agent

Responsibilities:

- Research technical questions.
- Locate original documentation.
- Gather evidence.
- Track sources and dates.
- Identify unknowns.

### G-Warp Developer

Responsibilities:

- Work with G-Warp.
- Create projects.
- Use the editor.
- Maintain block compatibility.
- Verify project behavior.

### Asset Developer

Responsibilities:

- Create SVG assets.
- Organize sprites.
- Create costumes.
- Prepare sound assets.
- Maintain visual consistency.

### Test Engineer

Responsibilities:

- Design tests.
- Execute tests.
- Capture failures.
- Verify repairs.
- Run regressions.

### Code Reviewer

Responsibilities:

- Review diffs.
- Check architecture.
- Detect regressions.
- Identify insecure practices.
- Challenge unsupported claims.

### Documentation Agent

Responsibilities:

- Maintain technical documents.
- Update task history.
- Record decisions.
- Maintain recovery instructions.

## 9.3 Agent communication

Every agent must use a common project state.

Agents must never independently invent their own task status.

Agents must not overwrite the shared master plan.

Each agent should have:

- Agent ID.
- Role.
- Model.
- Task ID.
- Permissions.
- Assigned files.
- Start time.
- Current status.
- Output.
- Evidence.
- Completion time.

## 9.4 Independent review

Important changes should receive a separate review.

The reviewer should inspect the actual diff and test evidence.

Do not allow an implementing AI to approve its own work merely because it says it is correct.

For critical changes, use a second review or a deterministic test.

## 9.5 Conflict prevention

Maintain:

- File ownership.
- Task ownership.
- Edit locks where necessary.
- Dependency tracking.
- Shared task state.
- Branch isolation.

If two agents need to modify the same area, coordinate the work before changes begin.

Do not silently discard another agent's changes.

---

# PART 10 — STRICT LOGGING AND AUDIT SYSTEM

## 10.1 Why this is mandatory

Previous AI development workflows have produced serious problems:

- Lost progress.
- Inconsistent dates.
- Missing log entries.
- Conflicting instructions.
- Unverified claims.
- Unrecorded modifications.
- Conflicting AI decisions.
- Forgotten project requirements.

This system must prevent these problems wherever technically possible.

Logging is not optional.

## 10.2 Unified time source

All agents and services must use one standardized time policy.

Local timezone:

`America/New_York`

Store an unambiguous ISO 8601 timestamp with timezone offset.

Also store UTC time for reliable ordering and comparison.

Example format:

`2026-10-24T14:32:18-04:00`

The example is a format illustration, not a timestamp to reuse.

Never generate timestamps by guessing.

Never use a previous log's timestamp for a new event.

Use a reliable system clock.

If the system clock appears incorrect, mark the timestamp as potentially unreliable.

## 10.3 Event record

Every important event must have:

- Event ID.
- Task ID.
- Project ID.
- Agent ID.
- Model name.
- Timestamp in UTC.
- Local timestamp.
- Event sequence.
- Event type.
- Action.
- Target.
- Reason.
- Input reference.
- Output reference.
- Result.
- Verification status.
- Evidence reference.
- Error information.
- File changes where applicable.

Use structured JSONL or an equivalent append-only event format.

## 10.4 No log rewriting

Never silently rewrite historical activity.

Corrections should be new events referencing the incorrect entry.

Do not erase an unsuccessful attempt.

Failed attempts are useful engineering evidence.

Maintain a separate human-readable activity view generated from the underlying records.

## 10.5 Log consistency validation

Run automated checks for:

- Duplicate event IDs.
- Missing task IDs.
- Missing timestamps.
- Invalid timestamp formats.
- Impossible task transitions.
- Missing agent identity.
- Out-of-order sequence numbers.
- File changes without task references.
- Completion without verification.
- Verification without evidence.
- Conflicting task status.
- Missing recovery state.

Detect time discrepancies between agents.

Do not silently reconcile contradictory records.

Create a discrepancy report and preserve the original records.

## 10.6 Verification labels

Use these labels consistently:

- SOURCE-VERIFIED
- STATIC-ANALYSIS
- BROWSER-VERIFIED
- GUI-VERIFIED
- SB3-VERIFIED
- SCRATCH-VERIFIED
- PERFORMANCE-VERIFIED
- SECURITY-REVIEWED
- NOT-TESTED

Do not use a label unless the corresponding evidence exists.

For example:

An archive opening successfully does not mean Scratch compatibility was verified.

A successful screenshot does not necessarily prove that the runtime behaves correctly.

---

# PART 11 — PROJECT MEMORY AND CONTINUITY

## 11.1 Memory must survive conversations

The system must not rely on ChatGPT, Claude, or any other AI remembering previous conversations.

Project memory belongs to the project.

Use persistent local records.

Recommended categories:

### Master project specification

Contains the user's original objectives and permanent constraints.

### Current project state

Contains the exact condition of the project.

### Architecture memory

Contains verified architecture and design decisions.

### Task memory

Contains active tasks and completed work.

### Defect memory

Contains known problems and their history.

### Research memory

Contains sources, findings and uncertainty.

### Asset memory

Contains artwork inventory and asset requirements.

### Test memory

Contains test cases and results.

### Decision memory

Contains important decisions and reasons.

### Recovery memory

Contains the exact instructions needed to resume after a restart.

## 11.2 Important rule

Do not treat an AI-generated summary as automatically true.

Use evidence and source records.

Distinguish:

- User-confirmed.
- Source-verified.
- Test-verified.
- Research-derived.
- AI-inferred.
- Unverified.
- Deprecated.

If a previous memory conflicts with the actual source, preserve the discrepancy and investigate.

## 11.3 Resume procedure

Before resuming a task:

1. Read master specification.
2. Read active project state.
3. Read the latest task record.
4. Read the latest successful checkpoint.
5. Review changes since that checkpoint.
6. Inspect the actual workspace.
7. Verify the current application state.
8. Confirm the current Git branch.
9. Confirm that no other agent is holding a conflicting file lock.
10. Continue from the last verified state.

Never assume that the last AI message describes the current state of the computer.

---

# PART 12 — PROJECT WORKSPACE AND FILE SYSTEM

## 12.1 Isolated workspaces

Every major project must have its own workspace.

Example:

`AI-Workspace/Army-Men-RTS/`

Within each workspace, use a consistent structure:

- `project/`
- `source/`
- `assets/`
- `assets/sprites/`
- `assets/costumes/`
- `assets/sounds/`
- `research/`
- `specifications/`
- `scripts/`
- `tests/`
- `screenshots/`
- `logs/`
- `memory/`
- `backups/`
- `checkpoints/`
- `exports/`
- `reports/`

The final structure may change after the source audit.

## 12.2 Permission model

Use explicit workspace authorization.

The agent may read and modify approved project files.

The agent must not automatically scan or edit unrelated personal folders.

Do not provide unrestricted shell access to the model.

All file operations must pass through the permission system.

## 12.3 Atomic modification

Where possible:

1. Read original file.
2. Create a backup.
3. Generate proposed modification.
4. Validate the new file.
5. Compare against the original.
6. Write to a temporary location.
7. Perform the approved replacement.
8. Verify the final file.
9. Record the change.

Avoid partial writes.

Avoid replacing files when validation has failed.

## 12.4 File conflict protection

Before writing a file, determine whether it changed since it was last read.

Use content hashes or equivalent version checks.

If another agent or the user changed the file, stop and inspect the new version.

Never overwrite new work simply because an old task expects an earlier version.

---

# PART 13 — GITHUB AND VERSION CONTROL

## 13.1 GitHub's role

GitHub manages code, version history, collaboration and releases.

It is not the Ollama connection.

The local agent should work independently of GitHub when offline.

## 13.2 Git workflow

Use:

- Protected main branch.
- Task-specific branches.
- Meaningful commits.
- Reviewable changes.
- Build verification.
- Release tags.
- Recovery checkpoints.

Do not commit unrelated changes.

Do not push experimental changes directly to main.

## 13.3 Required Git checks

Before committing:

1. Inspect repository status.
2. Confirm current branch.
3. Inspect all changed files.
4. Check for secrets.
5. Check for generated files that should not be committed.
6. Run relevant tests.
7. Review diff.
8. Generate commit summary.
9. Commit only approved files.

After committing, record the commit hash.

## 13.4 GitHub authentication

Use an appropriate secure authentication flow.

Never store personal tokens in:

- `app.html`.
- Public JavaScript.
- Project examples.
- Logs.
- Screenshots.
- Plain-text configuration committed to GitHub.

Provide a safe disconnect function.

## 13.5 Recovery

Use Git to recover code when appropriate, but do not assume Git alone is sufficient to recover user data.

Also maintain project backups and task checkpoints.

---

# PART 14 — PROJECT DEVELOPMENT AND G-WARP WORKFLOW

## 14.1 AI development inside G-Warp

The AI must understand the difference between:

- Project creation.
- Sprite creation.
- Costume creation.
- Script creation.
- Block creation.
- Runtime execution.
- Asset import.
- Project save.
- SB3 export.

It must use the correct process for each operation.

## 14.2 Visual asset development

Support:

- SVG creation.
- PNG assets.
- Costume generation.
- Sprite sheets.
- Animation frames.
- Backgrounds.
- UI graphics.
- Icons.
- Sound asset organization.

Validate assets before importing them.

For SVG:

- Validate XML.
- Check dimensions.
- Check unsupported features.
- Check references.
- Check embedded data.
- Ensure compatibility with the intended renderer.

For PNG:

- Validate dimensions.
- Check alpha.
- Check file size.
- Check transparency.
- Check color profile where relevant.

## 14.3 Script development

Support creating real Scratch-compatible scripts.

The agent should be able to:

- Select a sprite.
- Create event scripts.
- Add control blocks.
- Add motion.
- Add sensing.
- Add operators.
- Add variables.
- Add lists.
- Add broadcasts.
- Connect blocks.
- Test execution.

Never assume a generated script works because its block structure looks correct.

Run the project.

Observe the behavior.

Test the expected conditions.

## 14.4 Reusable components

Build or maintain reusable project templates for:

- Movement.
- Collision.
- Health.
- Combat.
- AI behavior.
- Menus.
- Resource systems.
- Inventory.
- Save systems.
- Animation.
- Sound.
- Mission objectives.

Templates must be compatible with the intended Scratch target.

## 14.5 Project complexity

The agent should recognize when a feature is too complex to implement as one massive script.

Break large systems into logical sprites, scripts, variables and reusable components.

Use meaningful names.

Document the interactions.

Preserve maintainability.

---

# PART 15 — SCRATCH 3 COMPATIBILITY AND EXPORT

## 15.1 Main target

The final Army Men project must be a normal Scratch 3 `.sb3`.

No requirement may silently introduce a dependency on:

- Electron.
- An EXE game runtime.
- Unity.
- Unreal.
- Godot.
- TurboWarp-only functionality.

TurboWarp may be used for optional development and performance testing.

Regular Scratch 3 compatibility is the main target.

## 15.2 Export pipeline

Inspect G-Warp's actual exporter.

Reuse it when appropriate.

Validate:

- Project JSON.
- Sprite records.
- Costume records.
- Sound records.
- Asset references.
- Blocks.
- Variables.
- Lists.
- Broadcasts.
- Stage structure.
- Project archive contents.

## 15.3 Compatibility verification

Use separate verification stages:

1. Archive validation.
2. JSON validation.
3. Scratch structure validation.
4. Import testing.
5. Runtime testing.
6. Gameplay testing.
7. Reopening and resaving.

Do not merge these into one generic "export succeeded" label.

Record the exact version of the target environment used for testing.

---

# PART 16 — TESTING AND AUTOMATIC REPAIR SYSTEM

## 16.1 Testing must be part of development

Testing is not an optional final step.

Every significant feature must have an acceptance test.

## 16.2 Test categories

### Source testing

- JavaScript syntax.
- HTML validation where appropriate.
- JSON validation.
- SVG validation.
- Dependency validation.

### Integration testing

- G-Warp bridge connection.
- Ollama connection.
- Workspace access.
- Project loading.
- Project saving.
- Exporting.

### GUI testing

- Buttons.
- Dialogs.
- Panels.
- Selection.
- Editor interactions.
- Stage visibility.
- Resizing.
- Scroll behavior.

### Runtime testing

- Project start.
- Project stop.
- Events.
- Movement.
- Collision.
- Variables.
- Lists.
- Clones.
- Broadcasts.
- Sound.
- Visual output.

### Compatibility testing

- Standard Scratch structure.
- `.sb3` archive validation.
- Regular Scratch import.
- Regular Scratch execution.

### Security testing

- Unauthorized path access.
- Path traversal.
- Token exposure.
- Unexpected network access.
- Command validation.
- Permission bypass.
- Shutdown behavior.

### Recovery testing

- Interrupted task.
- Application crash.
- Ollama disconnect.
- Computer restart.
- Invalid checkpoint.
- Git conflict.
- Partial file modification.

## 16.3 Automatic repair loop

When a test fails:

1. Stop the current dependent operation.
2. Capture the error.
3. Capture application state.
4. Save logs.
5. Identify the failing component.
6. Review relevant code or blocks.
7. Determine the likely cause.
8. Propose a minimal correction.
9. Check permissions.
10. Back up affected files.
11. Apply the correction.
12. Re-run the failed test.
13. Run related regression tests.
14. Compare before and after.
15. Record the result.

Do not keep changing unrelated files to make a failing test pass.

Do not disable a test merely because the implementation cannot pass it.

If the intended behavior is incorrect or impossible, report why.

## 16.4 Test evidence

Keep:

- Test ID.
- Task ID.
- Test version.
- Environment.
- Inputs.
- Expected result.
- Actual result.
- Pass/fail.
- Timestamp.
- Logs.
- Screenshots.
- Relevant file hashes.

---

# PART 17 — G-WARP AI DEVELOPER USER INTERFACE

## 17.1 Interface objective

The interface must look and feel like a real development workspace.

Do not make the user operate the entire system through PowerShell.

Provide a clear interface inside G-Warp.

## 17.2 Main workspace

Provide:

- G-Warp project workspace.
- AI Developer panel.
- Live activity.
- Task manager.
- Model selector.
- Project memory.
- GitHub panel.
- Test panel.
- Logs.
- Recovery controls.

Do not let the AI panel permanently obstruct the stage, block editor or important controls.

Allow the user to resize, collapse, move or reopen panels where practical.

## 17.3 Main dashboard

Display:

- AI system status.
- Ollama status.
- Model name.
- Active task.
- Current project.
- Current phase.
- Task progress.
- Last verified checkpoint.
- Last successful test.
- Git status.
- Recent errors.

## 17.4 Live AI view

Display:

- Real screenshot or visual observation.
- Current action.
- Target control.
- Current interaction.
- Expected outcome.
- Verification result.
- Relevant log record.

## 17.5 Task manager

Allow:

- Create task.
- Edit task.
- View plan.
- Start task.
- Pause.
- Resume.
- Stop.
- Cancel.
- Retry.
- Inspect dependencies.
- Inspect task output.
- View test results.

## 17.6 Model manager

Allow the user to:

- See installed models.
- Select active model.
- Test connection.
- Inspect capabilities.
- Change supported context settings.
- See model limitations.
- View hardware suitability.
- Get model installation guidance.

## 17.7 User communication

The AI should communicate in clear language.

Do not flood the user with raw model output.

Provide concise current status while retaining detailed logs for inspection.

When blocked, state:

- What it attempted.
- What failed.
- Why it matters.
- What it can safely try next.
- Whether it needs user intervention.

---

# PART 18 — SECURITY, PERMISSIONS AND SAFETY

## 18.1 Least privilege

Only provide the permissions necessary for the current task.

Do not grant full computer access by default.

Separate:

- G-Warp access.
- Project workspace access.
- File access.
- Browser access.
- Computer control.
- Terminal access.
- GitHub access.
- Network access.

## 18.2 Permission levels

Create permissions such as:

**LEVEL 0 — READ ONLY**

Inspect projects, files, screenshots, logs and documentation.

**LEVEL 1 — PROJECT EDITING**

Modify authorized project files and G-Warp projects.

**LEVEL 2 — TEST EXECUTION**

Run approved project and test commands.

**LEVEL 3 — VERSION CONTROL**

Create branches and commits in approved repositories.

**LEVEL 4 — EXTERNAL INTEGRATION**

Access configured external services and GitHub operations.

**LEVEL 5 — SYSTEM CHANGES**

Install software, change system settings, or perform other elevated operations.

Do not automatically grant Level 5.

Require explicit authorization for risky or irreversible actions.

## 18.3 Dangerous operations

Require confirmation before:

- Deleting original assets.
- Overwriting protected files.
- Changing the original G-Warp application.
- Installing system-level components.
- Changing Windows configuration.
- Publishing public releases.
- Pushing to the protected main branch.
- Expanding network exposure.
- Performing irreversible operations.

## 18.4 Network security

The companion service should bind to localhost by default.

Do not make it a public server.

Do not expose arbitrary computer control to LAN clients.

Use authentication and request validation.

Use origin restrictions where browser access is involved.

Do not rely on CORS as authentication.

Treat files, webpages, model outputs and project text as untrusted inputs.

Protect the system against prompt injection.

A text file inside an imported project must not be able to grant itself additional permissions.

A webpage must not be able to issue computer-control commands merely because the research agent opened it.

## 18.5 Emergency stop

Implement a real emergency STOP mechanism.

When activated:

- Stop accepting new tool calls.
- Stop active input sequences safely.
- Cancel cancellable processes.
- Prevent further file modifications.
- Preserve the last known task state.
- Record the stop event.
- Show whether any operation could not be stopped immediately.

The user must remain in control.

---

# PART 19 — RELIABILITY AND RECOVERY

## 19.1 Checkpoints

Create checkpoints before:

- Major file modification.
- Project conversion.
- Export.
- Risky operation.
- Large refactor.
- Dependency changes.
- Task handoff.
- Model or agent switch where relevant.

Do not create so many backups that disk usage grows without control.

Provide retention and cleanup policies.

Never delete the only valid recovery copy.

## 19.2 Crash recovery

Detect:

- G-Warp closed unexpectedly.
- Agent service crashed.
- Ollama disconnected.
- Computer restarted.
- Task timed out.
- Test process hung.
- Workspace changed externally.

On restart, display:

- Interrupted task.
- Last verified step.
- Latest checkpoint.
- Changes since checkpoint.
- Recovery recommendation.

Do not resume a dangerous operation blindly.

## 19.3 Resource management

Monitor:

- RAM.
- VRAM where available.
- GPU use where available.
- CPU.
- Disk space.
- Model loading.
- Active processes.
- Task duration.

Limit concurrent agents according to actual available resources.

Do not run multiple large models simultaneously without evaluating resource requirements.

Allow the user to configure limits.

---

# PART 20 — RESEARCH AND KNOWLEDGE MANAGEMENT

## 20.1 Research capability

The AI should be able to conduct research when a development task requires it.

It should distinguish:

- Original documentation.
- Official technical documentation.
- Community sources.
- Research findings.
- User instructions.
- AI assumptions.

## 20.2 Source records

For each important research finding, record:

- Source title.
- URL or local path.
- Publisher.
- Date published when available.
- Date accessed.
- Relevant finding.
- Confidence.
- Whether independently verified.

## 20.3 Uncertainty

Use explicit labels:

- VERIFIED
- LIKELY
- INFERRED
- UNKNOWN
- UNVERIFIED
- CONFLICTING_EVIDENCE

Do not hide unknowns.

Do not invent missing implementation details.

---

# PART 21 — FIRST MAJOR PROJECT: ARMY MEN RTS

## 21.1 Purpose

Once the AI Developer foundation has passed its acceptance tests, use it for the first major development demonstration.

Project:

Army Men RTS-inspired remake/remix.

The user expects recognizable gameplay and mechanics based on Army Men RTS (2002).

The project must be created in G-Warp.

The final main deliverable must be a regular Scratch 3 `.sb3`.

## 21.2 Research first

Do not start by guessing.

Research and document:

- Units.
- Unit controls.
- Resources.
- Resource gathering.
- Buildings.
- Construction.
- Combat.
- Movement.
- Health.
- Damage.
- Enemy behavior.
- Missions.
- Objectives.
- Progression.
- User interface.
- Victory conditions.
- Defeat conditions.

Use sources and gameplay references where available.

Record uncertain mechanics as UNVERIFIED.

Do not claim perfect fidelity without evidence.

## 21.3 Gameplay specification

Create a master specification before implementation.

Each game mechanic should have:

- Requirement ID.
- Description.
- Source or evidence.
- Expected behavior.
- Required sprites.
- Required variables.
- Required scripts.
- Dependencies.
- Test procedure.
- Completion status.

## 21.4 Graphics

Use modular 2D SVG graphics.

The visual style should be consistent with a toy-soldier/cube-inspired RTS.

The user has not finalized every exact visual detail.

Propose a coherent default visual direction and document it before large-scale asset production.

Use costumes and frame switching for animation.

Do not rely on embedded animation that standard Scratch cannot run.

## 21.5 Game architecture

Break the game into manageable systems:

- Main menu.
- Game state.
- Terrain.
- Camera and viewport.
- Units.
- Unit selection.
- Movement.
- Pathfinding or an appropriate Scratch-compatible movement system.
- Combat.
- Buildings.
- Resource collection.
- Construction.
- Enemy AI.
- Mission objectives.
- Audio.
- UI.
- Victory and defeat.
- Save and progress systems where practical.

The actual implementation must be designed around Scratch performance and regular Scratch compatibility.

Do not assume that techniques suitable for Unity or Unreal will work efficiently in Scratch.

## 21.6 Gameplay testing

The agent should be able to test a mission through G-Warp.

Test:

- Starting a mission.
- Selecting units.
- Issuing orders.
- Movement.
- Collision.
- Combat.
- Resource gathering.
- Building construction.
- Enemy response.
- Mission completion.
- Mission failure.

Capture visual and functional evidence.

---

# PART 22 — PUBLIC RELEASE AND ONE-CLICK INSTALLATION

## 22.1 Public goal

Eventually, another user should be able to install G-Warp AI Developer without understanding the internal architecture.

Windows should be the first release target unless the source audit identifies a compelling reason to change that decision.

Add macOS and Linux after the initial implementation has been tested and stabilized.

## 22.2 First-run setup

Build an onboarding process that:

1. Installs or opens G-Warp.
2. Checks the system.
3. Detects the operating system.
4. Detects RAM.
5. Detects GPU and VRAM where available.
6. Checks disk space.
7. Detects Ollama.
8. Checks the local Ollama service.
9. Discovers installed models.
10. Recommends suitable models.
11. Requests permission before downloading.
12. Sets up the local companion service.
13. Creates the required workspace.
14. Tests local authentication.
15. Tests G-Warp control.
16. Tests file permissions.
17. Offers optional GitHub connection.
18. Runs initial self-tests.
19. Displays READY or an exact list of unresolved problems.

## 22.3 Keep model downloads separate

Do not package huge model weights inside the G-Warp installer.

Install or detect Ollama separately.

Let users select which model to download.

Explain estimated storage requirements before downloading when reliable information is available.

## 22.4 Graceful operation

If Ollama is unavailable:

- G-Warp still opens.
- The standard editor works.
- Existing projects remain usable.
- AI Developer explains the problem.
- The user can retry the connection.
- The user can run setup diagnostics.

Do not make the normal G-Warp editor dependent on the AI service.

## 22.5 Release channels

Plan for:

- Stable.
- Beta.
- Developer.

Provide release notes and upgrade instructions.

Do not force automatic updates without user control.

Preserve user project files during upgrades.

---

# PART 23 — REQUIRED PROJECT DOCUMENTATION

Maintain these documents in the appropriate repository or project location:

1. `AI-DEVELOPER-MASTER-PLAN.md`
2. `ARCHITECTURE.md`
3. `SOURCE-AUDIT.md`
4. `IMPLEMENTATION-PLAN.md`
5. `INTEGRATION-POINTS.md`
6. `SECURITY-ARCHITECTURE.md`
7. `PERMISSION-MODEL.md`
8. `OLLAMA-INTEGRATION.md`
9. `MODEL-COMPATIBILITY.md`
10. `COMPUTER-CONTROL.md`
11. `GWARP-BRIDGE.md`
12. `AGENT-TOOLS.md`
13. `AGENT-EXECUTION.md`
14. `TASK-LIFECYCLE.md`
15. `MEMORY-ARCHITECTURE.md`
16. `LOGGING-STANDARD.md`
17. `AI-TEAM.md`
18. `GITHUB-WORKFLOW.md`
19. `WORKSPACE-STRUCTURE.md`
20. `TEST-PLAN.md`
21. `TEST-RESULTS.md`
22. `RECOVERY-GUIDE.md`
23. `INSTALLATION.md`
24. `USER-GUIDE.md`
25. `KNOWN-ISSUES.md`
26. `CHANGE-LOG.md`
27. `RELEASE-PLAN.md`
28. `ARMY-MEN-GAME-SPEC.md`

Do not create empty documentation just to satisfy a checklist.

Each document must contain useful, verified information.

Update documents when the implementation changes.

---

# PART 24 — REQUIRED ENGINEERING DELIVERABLES

Before implementation, produce:

### Deliverable 1: Source audit

A detailed description of the current G-Warp structure and functionality.

### Deliverable 2: Gap analysis

A comparison between existing functionality and the requested AI Developer system.

### Deliverable 3: Architecture

A component diagram, data flow and security boundaries.

### Deliverable 4: Integration plan

The safest way to add AI Developer without damaging the original application.

### Deliverable 5: Computer-control proof-of-concept design

Explain how the system will capture real G-Warp screenshots, control the correct window, and verify actions.

### Deliverable 6: Ollama integration design

Specify the connection, model discovery, context management and error handling.

### Deliverable 7: Agent tool specification

Document the tools, their permissions and their verification requirements.

### Deliverable 8: Memory and logging specification

Define task records, event records, timestamps, checkpoints and recovery.

### Deliverable 9: Testing specification

Define the tests needed before calling the system operational.

### Deliverable 10: Implementation phases

Break the development into controlled milestones with dependencies and exit criteria.

### Deliverable 11: Risks

Identify difficult, uncertain or technically expensive areas.

### Deliverable 12: Release design

Explain how an ordinary user will install and use the system.

---

# PART 25 — IMPLEMENTATION PHASES AND EXIT CRITERIA

Do not skip phases because they seem inconvenient.

## PHASE 0 — DISCOVERY AND AUDIT

Inspect the repository and actual G-Warp source.

Confirm the current branch and uncommitted changes.

Identify the exact protected files.

Inspect the existing APIs.

Document everything that is already implemented.

**Exit criteria:** A source-verified audit and gap analysis.

## PHASE 1 — TECHNICAL ARCHITECTURE

Design the local service, G-Warp bridge, Ollama adapter, tool registry, security model, memory and user interface.

**Exit criteria:** Reviewed architecture with explicit data flow and security boundaries.

## PHASE 2 — OLLAMA CONNECTION

Detect local Ollama, discover models and test actual local inference.

**Exit criteria:** A model responds successfully through the local service, with errors and connection states handled.

## PHASE 3 — LOCAL COMPANION SERVICE

Build controlled communication, authentication, workspace access and task persistence.

**Exit criteria:** The service can operate inside an isolated test workspace without accessing unrelated files.

## PHASE 4 — OBSERVATION

Capture actual G-Warp screenshots and obtain useful application state.

**Exit criteria:** The system can identify the correct G-Warp window and produce a verifiable observation.

## PHASE 5 — REAL COMPUTER CONTROL

Operate a safe test project through the actual interface.

**Exit criteria:** The AI can complete a real editor action, observe the result and verify it.

## PHASE 6 — G-WARP BRIDGE

Implement supported project inspection and editing capabilities.

**Exit criteria:** The AI can inspect and manipulate a test project using verified G-Warp operations.

## PHASE 7 — AI DEVELOPER INTERFACE

Add dashboard, activity display, task management, model selection, memory and controls.

**Exit criteria:** The user can operate the system without relying on a terminal as the main interface.

## PHASE 8 — PERSISTENCE AND RECOVERY

Implement logs, checkpoints, task continuation and recovery testing.

**Exit criteria:** A controlled interrupted task can be safely recovered from saved state.

## PHASE 9 — TESTING AND AUTOMATIC REPAIR

Implement the testing and repair loop.

**Exit criteria:** The system detects a deliberately introduced test defect, corrects it and demonstrates successful retesting.

## PHASE 10 — GITHUB

Implement safe branches, diffs, commits and optional pull requests.

**Exit criteria:** The agent can create and manage a task-specific branch without affecting protected work.

## PHASE 11 — INSTALLER

Build first-run setup and Windows packaging.

**Exit criteria:** A clean Windows test environment can install and configure the system using the intended onboarding process.

## PHASE 12 — ARMY MEN RTS

Use the AI Developer to produce its first substantial G-Warp game project.

**Exit criteria:** A testable project is created, exported and checked against standard Scratch 3 requirements.

## PHASE 13 — PUBLIC BETA

Test with additional hardware configurations and external users.

**Exit criteria:** Installation, ordinary G-Warp use, model setup and recovery are documented and repeatable.

---

# PART 26 — ACCEPTANCE TESTS: WHAT MUST ACTUALLY WORK

The following is the minimum required operational test suite.

| ID | Test | Required result |
|---|---|---|
| AT-001 | G-Warp opens | Existing editor works |
| AT-002 | Ollama detection | Actual local service detected |
| AT-003 | Model discovery | Installed models listed |
| AT-004 | Model request | Actual inference succeeds |
| AT-005 | Screenshot | Actual G-Warp screen captured |
| AT-006 | Visual analysis | Visible state accurately identified |
| AT-007 | GUI control | Real editor action performed |
| AT-008 | Action verification | Result independently checked |
| AT-009 | Project inspection | Project structure retrieved |
| AT-010 | Sprite creation | Sprite appears in G-Warp |
| AT-011 | Costume import | Costume appears and renders |
| AT-012 | Script creation | Working script created |
| AT-013 | Project execution | Project actually runs |
| AT-014 | Error detection | Controlled defect detected |
| AT-015 | Automatic repair | Defect corrected |
| AT-016 | Regression | Relevant previous behavior preserved |
| AT-017 | Task persistence | Task state survives restart |
| AT-018 | Log consistency | All required records validate |
| AT-019 | Checkpoint | Valid recovery point created |
| AT-020 | Git branch | Isolated task branch created |
| AT-021 | Git recovery | Approved change can be reverted |
| AT-022 | SB3 archive | Archive structure validated |
| AT-023 | Scratch import | Export imports into regular Scratch |
| AT-024 | Scratch runtime | Target behavior runs in regular Scratch |
| AT-025 | Workspace security | Unauthorized paths denied |
| AT-026 | Secret protection | Credentials not exposed |
| AT-027 | Pause | Agent pauses safely |
| AT-028 | Resume | Agent continues from verified state |
| AT-029 | STOP | Active task stops safely |
| AT-030 | Ollama failure | Normal G-Warp remains usable |
| AT-031 | Service restart | Local agent recovers |
| AT-032 | User project preservation | Existing project remains intact |

A test may be marked NOT-TESTED.

A failed test must remain failed until corrected.

Do not manipulate the results to achieve a passing report.

---

# PART 27 — STRICT RULES FOR ALL AI AGENTS

Every AI working on this project must follow the same rules.

1. Never invent features.
2. Never invent test results.
3. Never invent timestamps.
4. Never invent source findings.
5. Never claim GUI control occurred when it did not.
6. Never claim a project works without running appropriate tests.
7. Never silently skip a required test.
8. Never silently change the user's requirements.
9. Never overwrite protected files without authorization.
10. Never discard another AI's changes without investigation.
11. Never remove failed attempts from the audit history.
12. Never modify a file without recording the change.
13. Never use an old log timestamp for a new event.
14. Never mark work completed without acceptance evidence.
15. Never confuse an inference with a verified result.
16. Never assume an installed model can perform image analysis.
17. Never assume every local computer has the same hardware.
18. Never assume G-Warp internals are unchanged.
19. Never let untrusted project content authorize tools.
20. Never give the model unrestricted operating-system access.
21. Never sacrifice standard Scratch compatibility without an explicit approved requirement change.
22. Never replace the user's original G-Warp application as a shortcut.
23. Never conceal a blocker.
24. Never stop documenting merely because the task is complicated.

When requirements conflict, preserve the original user requirement and document the conflict.

Do not invent a resolution.

---

# PART 28 — DEFINITION OF DONE

The G-Warp AI Developer is not finished merely because:

- A dashboard exists.
- Ollama connects.
- A chatbot responds.
- A screenshot can be captured.
- A project file can be generated.
- A script can be written.
- A GitHub repository can be opened.

It is finished only when the integrated system can demonstrate the complete workflow:

1. The user opens G-Warp.
2. The user launches AI Developer.
3. AI Developer connects to a real local model.
4. The user assigns a task.
5. The system creates a persistent task record.
6. The AI inspects the current project.
7. The AI observes the actual G-Warp interface.
8. The AI operates G-Warp using real controls or verified bridge operations.
9. The AI creates a project.
10. The AI tests the project.
11. The AI detects an error.
12. The AI fixes the error.
13. The AI verifies the correction.
14. The AI saves the project.
15. The AI creates a checkpoint.
16. The AI records all actions.
17. The AI can stop and resume safely.
18. The user can inspect the evidence.
19. The standard G-Warp editor continues to work.
20. The system can ultimately be installed by another Windows user.

---

# PART 29 — YOUR FIRST ASSIGNMENT

**IMPORTANT: THE USER HAS REQUESTED PLANNING ONLY AT THIS STAGE.**

Do not begin implementation.

Do not edit `app.html`.

Do not change the GitHub repository.

Do not install or uninstall software.

Do not download models.

Do not make system changes.

Your first assignment is to produce a comprehensive, evidence-based engineering plan.

### Step 1 — Inspect

Inspect the available G-Warp source and repository information.

Use the latest available source, not assumptions from previous conversations.

If the source on disk and the repository disagree, document the differences.

### Step 2 — Audit

Identify exactly what G-Warp already has.

Separate:

- Fully implemented.
- Partially implemented.
- Present but unverified.
- Missing.
- Not applicable.

### Step 3 — Map integration points

Identify which existing G-Warp APIs or components could be reused.

Identify which capabilities must be added.

Explain where each component should connect.

### Step 4 — Design computer control

Choose an appropriate approach for genuine visual observation and computer interaction on Windows.

Explain how the system will distinguish an actual GUI action from direct file modification.

### Step 5 — Design the agent architecture

Explain how the model, local service, bridge, tool registry, task manager and memory system communicate.

### Step 6 — Design security

Define the permission model, workspace restrictions, authentication and emergency stop.

### Step 7 — Design logging

Define the common time policy, event structure, task state, agent identity and automatic consistency checks.

### Step 8 — Design installation

Explain exactly how an ordinary Windows user will install, configure and launch the system.

### Step 9 — Identify difficult problems

Do not hide technical limitations.

Identify which requirements are straightforward, which require a proof of concept, and which are technically risky.

### Step 10 — Present the build roadmap

Provide phases, dependencies, work estimates expressed as engineering effort rather than promises of future delivery, and objective exit criteria.

### Step 11 — Final recommendation

Recommend the safest, most maintainable approach.

Explain what should be built first and why.

### Step 12 — Wait for authorization

Present the plan and wait for the user's explicit authorization before modifying the protected G-Warp application or starting implementation.

---

# FINAL DIRECTIVE

Build toward a real AI development environment.

The user should not need to be a programmer to operate the AI Developer.

The AI should be responsible for planning, development, testing, diagnostics, repairs, recovery and documentation within the permissions granted to it.

The system should make the user's existing G-Warp application more capable, not replace it with an unrelated product.

Ollama should provide local intelligence.

The companion service should provide controlled tools and execution.

The G-Warp bridge should provide verified application capabilities.

Computer control should let the AI visibly operate the real application.

Project memory should preserve knowledge across sessions.

GitHub should protect and organize source history.

Testing should determine whether the work actually succeeds.

**THE FINAL PRODUCT IS AN AI THAT DOES NOT JUST TELL THE USER HOW TO BUILD SOMETHING IN G-WARP. IT CAN ACTUALLY BUILD IT, OPERATE THE APPLICATION, WATCH WHAT HAPPENS, FIX WHAT BREAKS, AND PROVE WHAT IT HAS COMPLETED.**

Begin with the source audit and complete engineering plan. Do not modify protected files until authorized.