---
title: "Claude Code Hooks That Earn Their Keep"
date: 2026-06-10T11:00:00+07:00
tags: ["ai", "productivity", "claude-code", "workflow", "automation"]
---

Most of what I tell Claude Code, I only have to say once and it sticks for the session. The stuff that doesn't stick is the boring, mechanical stuff: run the formatter after you edit, never touch the lockfile, remind me before you push. You can put those in CLAUDE.md and hope, but "hope" is the operative word. The agent reads it, agrees, and then forgets three turns later.

Hooks fix that. A hook is a shell command the harness runs for you at a fixed point in the loop, not something the model decides to do. That distinction is the whole point: it runs whether or not the agent remembers, whether or not it's having a good day.

## The mental model

There are a handful of events you can hook into. The ones I actually use:

- `PostToolUse` - fires after a tool runs. This is where formatters and linters go.
- `PreToolUse` - fires before a tool runs, and can block it. This is your guardrail.
- `UserPromptSubmit` - fires when you hit enter. Good for injecting context.
- `Stop` - fires when the agent finishes a turn. Good for "are we actually done" checks.

The key thing: hooks are deterministic. The model can't talk its way out of them. If you want something to happen every single time, a hook is the only honest way to get it.

## The one everybody should have

Auto-format after edits. You stop caring about whitespace diffs forever:

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [
          {
            "type": "command",
            "command": "prettier --write \"$CLAUDE_FILE_PATH\" 2>/dev/null || true"
          }
        ]
      }
    ]
  }
}
```

The agent edits a file, the formatter runs, the diff stays clean. You never have to ask for it and the agent never has to remember it. The `|| true` keeps a formatter hiccup from derailing the turn.

## The guardrail

`PreToolUse` can return a non-zero exit and stop a tool call cold. I use it to keep the agent away from things it has no business touching:

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "command": "echo \"$CLAUDE_TOOL_INPUT\" | grep -qE 'git push|rm -rf' && echo 'blocked: confirm manually' >&2 && exit 2 || exit 0"
          }
        ]
      }
    ]
  }
}
```

Now a stray `git push` or `rm -rf` gets stopped before it runs, and the agent sees the message and asks you instead. This is the difference between trusting the model's judgment and not having to.

## Where people overdo it

The trap is treating hooks like a second brain. They are not. A hook is a dumb, reliable reflex - run this command at this moment. The second you find yourself writing conditional logic inside a hook to decide *whether* something should happen, you've probably picked the wrong tool. That decision belongs to the agent, or to you.

Good hooks are small. Format the file. Block the dangerous command. Run the type checker on stop and surface failures. Each one does a single mechanical thing the agent would otherwise have to remember, and remembering is exactly what models are bad at.

## How I'd start

Don't sit down and design a hook system. Wait until you catch yourself saying the same thing twice - "you forgot to run the formatter again" - and that's your signal. That repeated correction is a hook waiting to be written. Add it, and you never have that conversation again.

The best hooks come from your own annoyance. Pay attention to what you keep repeating, and turn it into something the harness handles so you don't have to.
