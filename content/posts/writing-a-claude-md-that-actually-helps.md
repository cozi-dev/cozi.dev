---
title: "Writing a CLAUDE.md That Actually Helps"
date: 2026-06-09T14:30:00+07:00
tags: ["ai", "productivity", "claude-code", "workflow"]
---

Most CLAUDE.md files I see are either empty or a dumping ground. Someone runs `/init`, gets an auto-generated wall of text describing the folder structure, and never touches it again. Then they wonder why the agent keeps making the same mistakes.

The folder structure is the one thing the agent can already figure out by reading the code. Listing it back is wasted space. A CLAUDE.md earns its keep when it holds the stuff the agent *can't* infer from the files in front of it.

## What the agent can't guess

Here's the test I use before adding a line: would a competent engineer who just cloned this repo already know this from the code? If yes, leave it out. If no, it might belong.

The things that pass that test:

- Conventions that aren't enforced anywhere. "We use snake_case for DB columns but camelCase in the API layer" is invisible until you've broken it once.
- Commands that aren't obvious. The real test command, the one with the right flags, not the generic `npm test` that takes 20 minutes.
- Landmines. "Don't touch `legacy/` - it's generated." "The staging env shares a database with prod, never run migrations against it."
- Taste. How verbose should comments be. When to write a test vs when not to bother. Whether you want it to ask before refactoring.

## Keep it short

Every line in CLAUDE.md is read on every turn. A bloated file costs you tokens and, worse, buries the three rules that actually matter under thirty that don't.

I treat it like a code review checklist, not documentation. Short imperative lines. If a section grows past what fits on a screen, that's a signal something in there isn't pulling its weight.

## Write rules as verifiable outcomes

"Write good tests" does nothing. The agent already thinks its tests are good. Rules work better when they describe a checkable result:

```
- "Add validation" means: write tests for invalid inputs first, then make them pass.
- Every changed line should trace to the request. No drive-by refactors.
- Match the existing style even if you'd do it differently.
```

These give the agent something to measure itself against instead of a vibe to aim for.

## Let it grow from real mistakes

The best CLAUDE.md isn't written up front. It accumulates. Every time the agent does something you didn't want, ask yourself if a one-line rule would have prevented it, and if so, add the line. Over a few weeks you end up with a file that encodes the specific ways *your* project trips people up, which is exactly the knowledge that isn't anywhere else.

One caveat worth knowing: rules drift out of date. A line that points at a file or a flag that no longer exists is worse than no line, because the agent will trust it. Prune the file when you prune the code.

## The short version

Don't describe the repo. Describe the things the repo can't tell you: the conventions, the landmines, the taste, and the commands that matter. Keep it short enough that every line is worth reading, write rules you can actually check, and let it grow from the mistakes you watch happen. That's the whole trick.
