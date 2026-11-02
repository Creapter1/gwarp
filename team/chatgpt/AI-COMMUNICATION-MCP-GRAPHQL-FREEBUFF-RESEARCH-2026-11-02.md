# Shared AI project context research — MCP, GraphQL, Freebuff and “T-Link”

**Date:** 2026-11-02 (America/New_York)  
**Prepared by:** ChatGPT  
**User goal:** let ChatGPT and Claude/Cloud chat work from the same current G-Warp facts, communicate reliable handoffs, and stop rereading large files or reconstructing project status in every session. User also asked whether Freebuff, GraphQL and a product called “T-Link” can help.

## Executive recommendation

Build a small **G-Warp Project Context MCP service** as the shared doorway to a controlled set of repository facts. Start read-only. Both assistants should retrieve the same project status, current task, branch boundaries, evidence and selected file excerpts. Add explicit handoff tools later so one assistant can write a note that another can read.

Do not begin by building a full GraphQL service or allowing assistants to modify all of GitHub. GraphQL is optional data plumbing; MCP is the assistant connection protocol. Freebuff is a useful additional agent/client, but it is not a guaranteed bridge that makes separate Claude and ChatGPT conversations share their full chat histories.

**Lowest-risk short-term improvement (no server required):** maintain one compact project status page, one canonical task list, and per-agent append-only logs. Make every assistant read the same short start pack, then search and read only the files needed for its current assignment. The project already has a separate AI-team branch and merged per-agent notes; the start pack should be explicitly kept short.

## 1. What MCP actually does

MCP (Model Context Protocol) is an open standard for connecting an AI application (the *host*) to a server that exposes context and tools. The MCP documentation describes hosts, clients and servers; servers can provide:

- **Resources:** readable project data such as a status snapshot, task list, release note, or documentation page.
- **Tools:** specific operations such as search project docs, fetch a file excerpt, list recent commits, or append a handoff.
- **Prompts:** reusable task templates such as “resume G-Warp work” or “review this change”.

An easy comparison: the MCP server is a carefully controlled project librarian. Claude and ChatGPT each ask that librarian for a specific folder, summary or action. It is not a shared brain and does not copy one AI's private chat transcript into another AI's conversation automatically.

Official references:
- MCP architecture: https://modelcontextprotocol.io/docs/learn/architecture
- MCP architecture source: https://github.com/modelcontextprotocol/docs/blob/main/docs/docs/2026-07-28/learn/architecture.mdx
- MCP resources: https://github.com/modelcontextprotocol/docs/blob/main/docs/specification/2026-07-28/server/resources.mdx
- MCP tools: https://github.com/modelcontextprotocol/docs/blob/main/docs/specification/2026-07-28/server/tools.mdx

The protocol does not force a model to load every file. The host decides when to request resources; a well-designed server can return only a concise answer or a bounded file excerpt.

## 2. What GraphQL does — and what it does not do

GraphQL is a query language and runtime for APIs. A client asks for a defined set of fields; the server returns the matching data. It can be useful for querying GitHub metadata, commit history, file paths, branch names and selected content in fewer, more precise API calls.

GraphQL does **not**:
- connect ChatGPT to Claude;
- make two assistants share their chat histories;
- automatically reduce model tokens if the server returns a huge response;
- replace MCP's host/client/server integration.

GraphQL is optional. For an initial G-Warp context server, GitHub REST or GraphQL can both retrieve the needed repository facts. Pick whichever yields the smallest, simplest and most maintainable result. The response size—not the query language—is what matters to the model's token bill.

Official explainer: https://graphql.org/learn/

## 3. “T-Link” — not identified yet

The phrase “T-Link” is not precise enough to confidently identify the product or service the user saw. Search results include **The Links MCP Server**, but its official documentation describes a platform for financial and operational business data sources (for example CRM/finance systems and CSV/JSON data). That does not appear to be a general-purpose shared memory service for G-Warp development.

Reference: https://docs.thelinks.ai/docs/mcp

Do not sign up, grant GitHub permissions or install a third-party “T-Link” bridge until the exact name or link is confirmed. The likely general concept the user is describing—assistants connecting to common tools/context—is MCP.

## 4. Current connector support: Claude chat vs ChatGPT chat

### Claude / Cloud chat

Anthropic's current Help Center says remote custom MCP connectors are available on Claude, Cowork and Claude Desktop for Free, Pro, Max, Ultra, Team and Enterprise users; Free accounts are limited to one custom connector. Claude's cloud connector calls originate from Anthropic's cloud infrastructure, so a remote MCP endpoint must be reachable over the public internet. A local server bound only to the owner's PC is not enough for claude.ai. A secure tunnel or hosted HTTPS endpoint is needed.

Current official guide: https://support.claude.com/en/articles/11175166-get-started-with-custom-connectors-using-remote-mcp

### ChatGPT chat

OpenAI's current Help Center says custom MCP server connections are available on ChatGPT Business and Enterprise/Edu. Its FAQ says Pro users can connect custom MCP servers with read/fetch permissions, while full MCP/write access is for Business and Enterprise/Edu. The user's current ChatGPT account shown in this session is Free, so we should not design the setup assuming that a custom MCP URL can be added to this Free chat account.

Current official guide: https://help.openai.com/en/articles/12584461-connecting-custom-mcp-servers-in-chatgpt

This limitation does not prevent ChatGPT from using its already-available GitHub integration or from using shared project handoff files. It only means a custom remote MCP connector may require a different eligible ChatGPT plan or another supported client.

## 5. A practical G-Warp context server

Start with one small remote HTTPS service, for example `gwarp-context`, connected to the repository `Creapter1/gwarp`. It should read both branches but respect their different purposes.

### Read-only resources

| Resource | What it returns | Why it saves time |
|---|---|---|
| `gwarp://overview` | One-page project identity, branch roles, protected files, current app version/commit if verified | Stops agents from rediscovering the project rules |
| `gwarp://status` | Current work status, next task, blockers, last-updated timestamp | Gives a reliable session start |
| `gwarp://rules` | Short working rules and evidence vocabulary | Prevents repeated mistakes |
| `gwarp://branches` | What belongs in `main` versus `ai-team` | Prevents internal notes entering public docs |
| `gwarp://handoff/{agent}` | Latest compact handoff for ChatGPT or Claude | Shares decisions without sharing all chat history |
| `gwarp://screenshots/open` | Pending screenshot sticky IDs and capture instructions | Lets Cloud find the right visual work quickly |

### Search/fetch tools

| Tool | Expected behavior |
|---|---|
| `get_project_status()` | Return only the compact status resource and latest commit IDs |
| `search_project(query, branch, paths, limit)` | Search first; return file path, branch, commit SHA and short relevant excerpts |
| `read_file_range(path, branch, start, end)` | Return a bounded line range, not the entire file |
| `get_recent_changes(branch, since, limit)` | Return a small list of changed files and commit summaries |
| `get_agent_handoff(agent)` | Return the latest handoff and unresolved decisions for that agent |
| `get_open_screenshot_stickies()` | Return only IDs not yet captured/accepted |

### Later, explicit communication tools

After read-only access is safe and reliable, add:
- `append_handoff(from_agent, to_agent, summary, evidence, next_step)`
- `append_agent_log(agent, entry)`
- `update_task_status(task_id, status, evidence)`

These tools should append new dated entries rather than rewrite an agent's history. They should reject missing agent identity, missing task ID, invalid branch/path and secret-like content. A write call should require a user/owner confirmation in the AI client wherever supported.

**Important distinction:** this would be a shared *handoff board*, not a direct live AI-to-AI conversation. ChatGPT and Claude still have separate sessions, separate model context windows and separate provider policies. They can independently read/write the same handoff store when their connectors permit it.

## 6. Token-saving design rules

The server should make it hard to accidentally read the whole project:

1. **Status first:** one small response (roughly 1–2 KB of plain text) gives project identity, current task, protected paths and latest commit.
2. **Search before reading:** search relevant terms and inspect matching path/line ranges.
3. **Bounded file reads:** default to a few hundred lines maximum; require a second call for more.
4. **Diffs before full files:** show only changed hunks since the last known SHA.
5. **Per-agent handoffs:** keep one latest handoff plus a dated append-only history.
6. **No repeated giant logs:** maintain a 1-page status summary, then fetch older log entries only when a detail matters.
7. **Evidence tags:** SOURCE-VERIFIED, STATIC-ANALYSIS, LIVE-TESTED, REPORTED-TEST and NOT-TESTED must not be mixed.
8. **No secrets:** never return API keys, tokens, local machine paths or private project data.

The token saving comes from giving each model a small precise excerpt instead of the full repository. MCP itself does not reduce tokens automatically.

## 7. Could Freebuff be part of it?

Yes—as an additional project agent/client, particularly for repository search, bounded file reading, coding tasks and review. Freebuff's public repository currently describes Desktop (parallel local agents), CLI, Web, Cloud (GitHub repositories) and Chat (research) products. Its README says agents can locate relevant files, plan, edit, run checks and review results.

Its public agent-definition source includes:
- `mcpServers` to configure MCP server connections for an agent;
- `toolNames` to restrict which MCP tools the agent can call;
- `windowedFileReads` to make file reads support offsets/limits, cap whole-file reads and teach a search-first reading style;
- `compactContext` for context compaction.

References:
- Freebuff repo: https://github.com/CodebuffAI/freebuff
- Agent definition: https://github.com/CodebuffAI/freebuff/blob/main/common/src/templates/initial-agents-dir/types/agent-definition.ts

**Limit:** this proves the Freebuff agent-definition/runtime code has these configuration options; it does not prove that every Freebuff product (especially its chat-only interface) exposes arbitrary user MCP configuration. The best first test is a custom agent in Freebuff Desktop or CLI, not assuming Freebuff Chat can be wired to a custom server.

### Freebuff privacy check

Freebuff's current public README says messages, agent traces and files are used to run the service; use of submissions for model training depends on model/feature notices. It also describes repository evaluation by restricted partners for Freebuff Cloud. Review the current privacy policy and any model-specific notice before connecting a project repository. Do not send secrets or private local data. Reference: https://github.com/CodebuffAI/freebuff#free-access

## 8. Recommended rollout

### Phase 0 — no new infrastructure (do this first)
- Use the current canonical task list and agent logs.
- Add a small `team/PROJECT-CONTEXT.md` or similarly named status card only if the owner approves the canonical path.
- The start card should state current branch rules, current release/commit, next task, blockers and latest agent handoffs.
- Ask each AI to read that compact card, then search only the assigned topic.

### Phase 1 — local read-only MCP prototype
- Build a local MCP server that reads the GitHub repository via a narrowly scoped read-only credential or public GitHub API.
- Expose only status, search, bounded range read, recent commits and handoff lookup.
- Run it locally and test with MCP Inspector before exposing it remotely.
- Freebuff Desktop/CLI can be the first client to test custom agent configuration.

### Phase 2 — remote connector for Claude chat
- Host the read-only server on HTTPS with authentication.
- Connect it through Claude Settings → Connectors → Add custom connector.
- Check exact provider origin/auth behavior; test that only allowed resources are exposed.

### Phase 3 — ChatGPT support
- Reassess available ChatGPT plan and workspace permissions. Pro allows custom MCP read/fetch according to current help; full write MCP is Business/Enterprise/Edu.
- Until the account supports custom MCP, continue using the existing GitHub integration and committed handoff notes.

### Phase 4 — controlled write handoffs
- Add append-only handoff tools; do not initially grant direct write access to app code.
- Require owner confirmation for GitHub writes, branch changes, task closure and releases.
- Add audit logs and a rollback trail.

## 9. Security and repository visibility

The GitHub repository metadata currently reports `Creapter1/gwarp` as **public**. The `ai-team` branch is organizationally separate from `main`, but a branch inside a public repository is not a private workspace: people who can view the repository can also view branch content.

Therefore:
- Do not store API keys, account tokens, private project data, private model weights or sensitive chat transcripts in either branch.
- If internal material must actually remain private, move it to a private repository or a private storage service with separate permissions. A branch name does not create privacy.
- For a future MCP service, use read-only access first, branch allowlists, narrow path allowlists, authentication, rate limits, audit logs and no arbitrary shell/file-system access.
- Keep write operations as separate tools with owner confirmation.

## 10. What is not done

- No MCP server has been created or deployed.
- No GraphQL service has been created.
- No Claude or ChatGPT connector has been configured.
- Freebuff has not been changed or connected.
- No T-Link product was installed; the exact product name remains unconfirmed.
- The repo was only inspected and documented; application code was not changed.

## Recommended decision

**Use MCP as the common assistant doorway, keep GitHub as the source of truth, and use GraphQL only if the server needs efficient structured GitHub queries. Test Freebuff Desktop/CLI as an extra client.** First prove a read-only status/search/range-read workflow with one assistant; only then add handoff writes and another client. Do not pay for a plan or publish a server until the exact client support and privacy requirements are confirmed.
