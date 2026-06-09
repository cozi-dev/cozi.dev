---
title: "Leveling Up Claude Code with Superpowers"
date: 2026-06-09T09:39:43+07:00
tags: ["ai", "productivity", "claude-code", "superpowers", "workflow"]
---

A while back I wrote about [spec-driven development with Spec Kit](/posts/spec-driven-development-with-github-spec-kit/), which fixed the "the agent built the wrong thing" problem by making me write the spec before any code. This post is about a different fix for a different problem: the agent knows *what* to build but skips the discipline of *how* to build it well.

That tool is [Superpowers](https://github.com/obra/superpowers), and it has quietly become the thing I install first on every new machine.

## The problem it solves

Left to its own devices, an AI coding agent is eager to please. You ask for a feature and it starts typing immediately - no questions, no plan, no tests, straight to a 300-line diff. It feels fast. It is not. You spend the saved time later, untangling the assumptions it baked in while you weren't looking.

What I actually want is for the agent to behave like a good engineer: ask clarifying questions first, sketch a plan, write a failing test, make it pass, then review its own work. I used to enforce that by hand, repeating "write a test first" and "show me the plan before you code" in every session. It worked about as well as you'd expect - which is to say, until I got tired and stopped repeating myself.

Superpowers turns those habits into something the agent reaches for automatically.

## What it actually is

Superpowers calls itself "a complete software development methodology for your coding agents, built on a set of composable skills." In plain terms: it is a pack of *skills* - small, focused workflow modules - that Claude Code loads and triggers when they're relevant.

You install it from the official plugin marketplace:

```
/plugin install superpowers@claude-plugins-official
```

After that, the skills are just *there*. You don't invoke most of them by hand. When you describe a feature, the brainstorming skill kicks in and starts asking about intent. When you say "fix this bug", the debugging skill steps the agent through a root-cause process instead of guessing. The triggering is the whole point - good practice you don't have to remember to ask for is good practice that actually happens.

## The skills I lean on

A few of them earn their keep almost every day:

- **brainstorming** - before any feature work, it refines the rough idea through questions and lays out the design in sections so I can correct it early. This is the single biggest quality lever. Most bad implementations are just bad assumptions that nobody checked.
- **test-driven-development** - enforces the red-green-refactor cycle. Write the failing test, watch it fail, make it pass, clean up. The agent stops "writing tests after" (which always quietly pass and prove nothing).
- **systematic-debugging** - a four-phase root-cause process. Instead of the agent slapping a `try/except` over a symptom, it actually finds why the thing broke.
- **writing-plans** - breaks work into bite-sized tasks, each a few minutes long. Small tasks are reviewable tasks.
- **using-git-worktrees** - spins up an isolated workspace on a new branch so experiments don't pollute my main checkout.

There are more, and they compose: brainstorm the feature, write the plan, execute it with TDD, review the result. That is just... how a careful engineer works. The plugin makes it the default path instead of the path you have to nag for.

## Why this matters beyond convenience

Here's the bit I keep coming back to. The bottleneck with AI coding was never the typing - models type fine. The bottleneck is judgment: knowing to ask before assuming, to test before trusting, to find the root cause before patching. Superpowers doesn't make the model smarter. It makes the model *follow a process*, and process is what separates a senior engineer from a fast one.

For me the result is concrete: fewer "wait, that's not what I meant" moments, fewer bugs that trace back to an unasked question, and code I'm willing to read instead of code I have to rewrite.

## Worth trying?

If you use Claude Code regularly, yes. It's one command to install and it changes the default behavior immediately - you'll notice it in the very next feature, when the agent stops and asks you something instead of charging ahead. Pair it with a spec-first workflow like Spec Kit and you've covered both halves of the problem: building the right thing, and building it right.

## References

* [Superpowers on GitHub](https://github.com/obra/superpowers)
* [My earlier post on Spec-Driven Development with Spec Kit](/posts/spec-driven-development-with-github-spec-kit/)
