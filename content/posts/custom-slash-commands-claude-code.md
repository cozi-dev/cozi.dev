---
title: "Custom Slash Commands: Stop Retyping the Same Prompt"
date: 2026-06-15T15:30:00+07:00
tags: ["ai", "productivity", "claude-code", "workflow"]
---

There's a prompt you type all the time. Maybe it's "review this diff for security issues, focus on auth and input validation, ignore style nits." Maybe it's "write a conventional commit message for the staged changes." You've typed it so many times you could recite it in your sleep, and you still type it slightly differently every time, which means you get slightly different results every time.

Custom slash commands fix that. They're the most underused feature in Claude Code, and they take about two minutes to set up.

## What they actually are

A slash command is just a markdown file. You drop it in `.claude/commands/` and the filename becomes the command. A file called `commit.md` gives you `/commit`. The contents of the file become the prompt that gets sent when you run it.

That's the whole thing. No config, no registration, no plugin system. A file in a folder.

```
.claude/commands/
  commit.md
  review.md
  changelog.md
```

Project-level commands live in `.claude/commands/` and get committed with the repo, so your whole team gets them. Personal commands live in `~/.claude/commands/` and follow you across every project. I use both - team conventions in the repo, my own habits in my home directory.

## A real one

Here's the commit command I actually use:

```markdown
Write a conventional commit message for the currently staged changes.

Rules:
- Subject line under 50 characters, imperative mood
- Only add a body if the "why" isn't obvious from the diff
- No Co-Authored-By trailer
- If nothing is staged, tell me instead of guessing

Run `git diff --cached` to see what's staged, then write the message.
```

Now `/commit` does the same thing every time. Same rules, same format, no drift. The "no Co-Authored-By" line alone saves me from editing every commit message by hand, because that's a habit I can never get the model to keep otherwise.

## Arguments make them flexible

You can pass arguments into a command with `$ARGUMENTS`. So a review command can take a target:

```markdown
Review the changes in $ARGUMENTS for correctness bugs.

Skip style and formatting comments. Focus on logic errors, missing
error handling, and edge cases. One line per finding: location, the
problem, the fix.
```

Run it with `/review src/auth.go` and `$ARGUMENTS` becomes `src/auth.go`. If you want positional arguments instead of one blob, `$1`, `$2`, and so on work too.

You can also run shell commands inside the file and feed the output into the prompt, which is how the commit example above pulls in the diff. The command file isn't a static string - it's a small program that builds a prompt.

## Why this beats keeping prompts in a notes file

I used to keep a text file of "good prompts" and paste them in when I needed them. The problem is paste-and-edit. Every time you paste, you tweak something, and the tweaks add up until the prompt that worked great three weeks ago is now a different prompt that works okay.

A slash command is the prompt, frozen. When you improve it, you improve the file, and the improvement sticks for everyone. It turns prompting from a thing you redo each time into a thing you maintain. That's the actual win - not the keystrokes you save, but the consistency you get.

## Where to start

Don't try to build a library on day one. Watch yourself for a week. The third time you type roughly the same prompt, that's your first command. Save it, refine it when it annoys you, and let the collection grow from real friction instead of imagined needs.

The good ones tend to be the boring ones: commit messages, PR descriptions, changelog entries, "explain what this file does." Boring and repeated is exactly the profile you want. The clever one-off prompts don't need to be commands. The dull daily ones do.
