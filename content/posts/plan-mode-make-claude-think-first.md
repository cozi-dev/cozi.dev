---
title: "Plan Mode: Make Claude Think Before It Types"
date: 2026-06-12T12:00:00+07:00
tags: ["ai", "productivity", "claude-code", "workflow"]
---

There's a failure mode with AI coding tools that everyone recognizes: you describe a change, the model immediately starts editing files, and three minutes later you're reverting half of it because it ran off in the wrong direction. The model wasn't dumb. It just started building before either of you agreed on what to build.

Plan mode is Claude Code's answer to that. It's a read-only mode where Claude can explore your codebase, read files, search around - but it cannot edit anything. It investigates, comes back with a plan, and waits for your approval before touching a single line.

## How to get into it

Press shift+tab to cycle modes until you see plan mode, or just ask "make a plan before you do this." You can also start a session with `claude --permission-mode plan` if you want it as the default.

Once in plan mode, Claude does all its usual exploring. The difference is the ending: instead of edits, you get a plan. You approve it, reject it, or push back on parts of it. Only after approval does Claude switch to actually making changes.

## When it earns its keep

I don't use plan mode for everything. For a one-line fix in a file I can name, it's ceremony. The plan would be longer than the diff.

Where it pays off:

- **Changes touching more than two or three files.** Refactors, feature work that crosses module boundaries, anything where the model has to make structural decisions. You want to see those decisions before they're embedded in forty edits.
- **Unfamiliar codebases.** When Claude doesn't know the project well, its first instinct about where code should live is often wrong. A plan surfaces that wrong instinct as a sentence you can correct, instead of a pile of files you have to revert.
- **Anything you'd describe as "tricky."** If you'd want a colleague to talk through their approach before doing it, want the same from Claude.

The rough math: reading a plan takes thirty seconds. Reverting a wrong implementation takes ten minutes and leaves you wondering what else got touched. Plan mode trades the first to avoid the second.

## The real value is the argument

Here's the part that took me a while to appreciate: the plan isn't the product. The conversation about the plan is.

When Claude proposes "I'll add a new service class for this," you get to say "no, we already have a pattern for this in the handlers, follow that." That one sentence of correction, delivered before any code exists, is worth more than any amount of post-hoc review. The model now builds the right thing instead of building the wrong thing well.

I've started treating the plan as a draft to argue with, not a checkbox to click through. Half the time my response to a plan is a paragraph of context the model didn't have. The resulting implementation is noticeably better than what either the plan or my original prompt would have produced alone.

## Cheap insurance for risky asks

There's a second use that has nothing to do with big features: plan mode as a safety rail. Because it physically can't edit files, it's the mode for questions like "what would it take to upgrade this dependency" or "how would you restructure this module" when you want analysis, not action.

Without plan mode, "how would you restructure this" sometimes gets you an actual restructure. With it, you're guaranteed to get words instead of diffs. I keep it on by default in repos where I'm mostly asking questions.

## Where people go wrong

The common mistake is approving plans without reading them. The mode only works if the review is real. A skimmed plan plus an instant approve is just normal mode with extra steps.

The second mistake is the opposite: staying in plan mode forever, polishing the plan, never building. The plan is allowed to be roughly right. Code reveals things plans can't. Approve when the direction is correct, not when every detail is settled - you'll adjust during implementation anyway, and that's fine.

Start here: next time you're about to ask Claude for something that makes you slightly nervous, hit shift+tab twice first. Read what it intends to do. You'll either catch a wrong turn before it happens, or gain confidence that it actually understood you. Both are worth thirty seconds.
