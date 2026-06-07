---
title: "Spec-Driven Development with GitHub Spec Kit"
date: 2026-06-07T22:00:00+07:00
tags: ["ai", "productivity", "spec-kit", "claude-code", "workflow"]
---

I have been using AI coding agents long enough to know the failure mode by heart. You open a chat, type "build me a feature that does X", and the agent happily writes 400 lines that miss the point. Not because the model is dumb, but because you never actually told it what you wanted. You told it what you wanted *right now, in this sentence*, which is never the same thing.

[GitHub Spec Kit](https://github.com/github/spec-kit) is the first tool that fixed that for me, and it did it without adding much ceremony. The idea is simple: write the spec first, let the spec generate the plan, let the plan generate the tasks, then let the agent implement the tasks. Each step is a thing you can read and correct before the next step runs. That is the whole trick.

## The problem with "just prompt it"

When you one-shot a prompt, all the decisions happen inside the model in one pass: what the feature is, how it should be built, what the edge cases are, what files to touch. You see none of it until the code lands. If the model guessed wrong on step one, every later step is wrong too, and you are now debugging a wall of code instead of fixing one sentence.

Spec-driven development pulls those decisions apart so you can check them one at a time. It is the same reason we write design docs before big projects. The difference is that here the doc is not just documentation - it is the input that generates the next artifact.

## How the workflow actually goes

Spec Kit ships a small CLI called `specify-cli`. You install it with `uv`:

```bash
uv tool install specify-cli --from git+https://github.com/github/spec-kit.git
```

Then you initialize a project, and it drops a set of slash commands into your agent (it works with Claude Code, Copilot, Gemini, Cursor, and a couple dozen others). The flow is five commands, run in order:

- `/speckit.constitution` - set the ground rules for the project. Things like "always write tests", "no new dependencies without a reason", "keep functions small". This is the stuff you normally repeat in every prompt and then get annoyed when the agent forgets.
- `/speckit.specify` - describe *what* you are building and *why*, in terms of user stories and outcomes. Not implementation. Just the behavior you want.
- `/speckit.plan` - now the agent turns that spec into a technical plan: architecture, file layout, the approach.
- `/speckit.tasks` - the plan gets broken into a concrete, ordered task list.
- `/speckit.implement` - the agent works through the tasks and writes the code.

The magic is not any single command. It is that you get a checkpoint after each one. After `/speckit.specify` you read the spec and catch the misunderstanding before it becomes a plan. After `/speckit.plan` you catch the wrong architecture before it becomes 30 tasks. By the time `/speckit.implement` runs, almost every decision has already been reviewed by you. The agent is just typing.

## What changed for me

Two things, mostly.

First, the agent stops surprising me. When I let it one-shot a feature, half the work of reviewing was figuring out what it even decided to do. With a spec and a plan sitting in the repo, I already know. Review becomes "is this code doing what the plan said", which is a much smaller and faster question.

Second, I write better specs. Sounds obvious, but having a command literally named `specify` that does nothing but capture intent forces me to separate "what" from "how". I used to mix them in one prompt and then wonder why the agent over-engineered things. Turns out I was the one who told it to.

It is not free. For a one-line fix or a quick script, the five-step dance is overkill - just prompt it. The payoff shows up on anything with real surface area, where a wrong guess early costs you an hour later. That is where the checkpoints earn their keep.

## Is it worth trying?

If you already code with an AI agent daily, yes, and it costs you almost nothing to find out. Install it, run it once on a feature you were about to build anyway, and watch where you stop to correct the agent. Those correction points are exactly the bugs you would have shipped with a one-shot prompt - you are just catching them in a sentence instead of in a diff.

The broader bet here is that the spec, not the prompt, becomes the real source code for AI-built software. I think that is right. The prompt is throwaway; the spec is the thing worth keeping. Spec Kit is a clean, low-friction way to start treating it that way.

## References

* [GitHub Spec Kit](https://github.com/github/spec-kit)
* [Spec-Driven Development docs](https://github.com/github/spec-kit/blob/main/spec-driven.md)
