---
title: "Git Worktrees: Run Claude Code in Parallel Without the Chaos"
date: 2026-07-02T14:00:00+07:00
tags: ["ai", "developer-tools", "claude-code", "git"]
---

You're deep in a feature branch with Claude Code chewing through a refactor. Then a bug report lands and it can't wait. Now what? You could stash everything, switch branches, fix the bug, switch back, unstash, and hope Claude still remembers what it was doing. Or you could kill the session and lose an hour of built-up context.

Both options are bad. The actual fix is a git feature that's been sitting there since 2015: worktrees.

## What a worktree is

A git worktree is a second working directory attached to the same repository. Same `.git` data, same history, same remotes - but a completely separate checkout with its own branch, its own files on disk, and its own uncommitted changes.

```bash
git worktree add ../myapp-bugfix -b fix/login-timeout
```

That creates a sibling directory `myapp-bugfix` with a fresh branch checked out. Your original directory is untouched. No stashing, no switching, nothing.

The part people miss: it's not a clone. A clone duplicates the whole object database and gives you a second remote to keep in sync. A worktree shares everything. Commit in one, and the commit is instantly visible in the other. Disk cost is basically just the checked-out files.

## Why this matters for Claude Code

Claude Code sessions are tied to a directory. The context it builds up - which files it read, what it learned about your architecture, the plan it's executing - all of that assumes the files on disk aren't shifting underneath it.

Switching branches mid-session breaks that assumption in the worst way. The session doesn't know you switched. It keeps editing files based on a mental model of code that's no longer there. I've watched it confidently patch a function that didn't exist on the new branch.

Worktrees sidestep the whole problem. One directory per task, one Claude session per directory:

```bash
# terminal 1: the refactor keeps going
cd ~/code/myapp
claude

# terminal 2: the urgent bugfix, totally isolated
git worktree add ../myapp-hotfix -b fix/login-timeout
cd ../myapp-hotfix
claude
```

Two sessions, two branches, zero interference. Each Claude sees a stable directory. When the hotfix ships, you go back to terminal 1 and the refactor session is exactly where you left it.

## The parallel work pattern

Once you're comfortable with one extra worktree, the next step is obvious: why not three?

Say you have three independent tasks - a feature, a test suite cleanup, and a dependency upgrade. None of them touch the same files. Spin up a worktree for each and run a Claude session in every one:

```bash
git worktree add ../myapp-feature -b feat/export-csv
git worktree add ../myapp-tests -b chore/test-cleanup
git worktree add ../myapp-deps -b chore/bump-deps
```

You become a reviewer hopping between terminals instead of a typist grinding through one task at a time. Each session works at its own pace, and slow tasks (big test runs, long builds) don't block the others.

A few things I've learned running this setup:

- **Keep tasks genuinely independent.** If two worktrees need to touch the same file, you've just invented merge conflicts with extra steps. Split by directory or by concern.
- **Name worktrees after the task**, not the branch. `../myapp-hotfix` tells you what's in there at a glance when you have four terminals open.
- **Dependencies don't come along.** `node_modules`, virtualenvs, build caches - each worktree needs its own install. That's the real cost of this pattern, so factor in the setup minute.
- **Don't run the dev server in every worktree.** Ports collide. Pick one worktree as the "runnable" one, or get comfortable with `PORT=3001`.

## Cleaning up

Worktrees are cheap to make and cheap to drop:

```bash
git worktree remove ../myapp-hotfix
git worktree list    # see what's still attached
```

If you deleted the directory by hand instead (we've all done it), `git worktree prune` clears the stale bookkeeping.

One gotcha: git won't let you check out the same branch in two worktrees at once. That's a feature - it prevents the exact file-shifting confusion worktrees exist to solve - but the error message confuses people the first time they hit it.

## When not to bother

If you do one task at a time and finish it before starting the next, worktrees add nothing but directory sprawl. Same if your tasks constantly overlap in the same files - worktrees won't save you from yourself there.

But if you've ever stashed changes to handle an interruption and come back to a Claude session that lost the plot, one worktree per task is the cheapest fix available. It's a fifteen-second command that turns "juggling branches" into "opening another terminal."

The tooling is catching up to this pattern too - Claude Code's subagents can run in isolated worktrees automatically. But you don't need to wait for automation. `git worktree add` has been there for a decade. It was just waiting for a reason to matter.
