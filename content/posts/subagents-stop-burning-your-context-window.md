---
title: "Subagents: Stop Burning Your Context Window"
date: 2026-06-11T12:00:00+07:00
tags: ["ai", "productivity", "claude-code", "workflow", "agents"]
---

Here's a pattern I kept hitting with Claude Code: I ask it to fix something, it goes off and reads fifteen files to figure out where the problem lives, and by the time it starts actually fixing things, half the context window is gone. The fix itself needs maybe three of those files. The other twelve were just the cost of finding them.

That cost doesn't have to land in your main session. That's what subagents are for.

## What a subagent actually is

A subagent is a separate Claude instance with its own fresh context window. Your main session spawns it with a task, it goes off and does the work, and only its final answer comes back. All the intermediate stuff - the file dumps, the dead-end greps, the "let me check one more place" detours - stays in the subagent's context and dies with it.

So instead of your main session reading fifteen files to find a bug, it sends a subagent to do the reading and gets back one paragraph: "the bug is in auth/middleware.go line 84, the token expiry check uses the wrong comparison." Your main session paid one paragraph for an answer that cost fifteen files to produce.

## When I reach for them

The rule of thumb I've settled on: delegate when the search is bigger than the answer.

- "Where is X handled in this codebase?" - the answer is a file path. The search might touch dozens of files. Perfect subagent material.
- "What calls this function?" - same deal. The answer is a short list, the search is wide.
- "Read these three specific files and tell me what they do" - don't bother. If you already know which files matter, just read them in the main session. Spawning an agent to read three files is overhead with no payoff.

The other big win is parallel work. If I need to check four independent things - say, how four different modules handle errors - I can spawn four subagents at once and they all run concurrently. The main session would do those one at a time.

## The catch nobody mentions

Subagents are stateless. Each one starts from zero. It doesn't know what you discussed two messages ago, it hasn't seen the file you just edited, it has no idea about the constraint you mentioned at the start of the session.

This bites people constantly. You spawn an agent with "find the bug in the payment flow" and it comes back with something you already ruled out twenty minutes ago, because it never saw that conversation. The fix is boring but works: put everything the agent needs in the prompt. Treat it like a contractor you're briefing over email, not a coworker who sat in on the meeting.

A good subagent prompt looks like a small ticket: here's the goal, here's what I already know, here's what I've already ruled out, here's the exact shape of the answer I want back.

## Asking for the right output

The output shape matters more than people think. A subagent's final message is the only thing you get, so tell it exactly what to return. "Investigate the auth module" gets you a rambling essay. "Return a list of file:line locations where tokens are validated, nothing else" gets you something your main session can actually use.

I've started ending most subagent prompts with a one-line format spec. It feels fussy. It saves a round trip almost every time.

## Where this stops being worth it

Like every tool in this space, you can overdo it. Spawning a subagent has real overhead - it starts cold, re-derives context you already had, and sometimes comes back with less than you'd have found yourself. For small, targeted lookups where you know roughly where to look, just look.

The honest framing: subagents trade latency for context. The work takes a little longer to come back, but your main session stays lean enough to keep going for hours instead of choking after the third investigation. On long sessions, that trade wins easily. On a five-minute fix, it doesn't.

Start with one habit: next time you're about to ask your main session a "where is..." question about a codebase you don't know well, send a subagent instead. Watch how much context you keep. That's usually all the convincing it takes.
