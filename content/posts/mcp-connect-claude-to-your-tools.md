---
title: "MCP: Stop Copy-Pasting Between Claude and Your Tools"
date: 2026-07-01T12:00:00+07:00
tags: ["ai", "developer-tools", "claude-code", "mcp"]
---

Here's a workflow you've probably done a hundred times. You ask Claude to help with a bug. It writes something reasonable, but it needs to know what a specific Jira ticket says. So you tab over to Jira, copy the ticket, paste it into the chat. Then it needs the error from your logs. Tab over to Grafana, copy, paste. Then it wants to see the database schema. Tab, copy, paste.

You've become a very expensive clipboard. The model is smart, but it's blind to everything outside the conversation, so you spend half your time shuttling context back and forth by hand.

MCP fixes this. It's the plug that lets Claude reach out and grab the data itself.

## What MCP actually is

MCP stands for Model Context Protocol. Strip away the spec language and it's this: a standard way for a model to talk to an external system. One side is the client (Claude Code, in our case). The other side is a server, which is a small program that exposes some capability - reading files, querying a database, hitting the GitHub API, whatever.

The whole point of it being a protocol is that you write the server once and any MCP client can use it. Before this, every tool that wanted to give an AI access to something had to invent its own glue. Now there's a shared shape, so a Postgres server someone else wrote works in your setup without you touching it.

A server exposes three kinds of things:

- **Tools** - actions the model can call, like "run this query" or "create this issue"
- **Resources** - data the model can read, like a file or a document
- **Prompts** - reusable prompt templates the server ships with

Tools are the ones you'll care about most. They're what turn Claude from a chatbot into something that can actually do stuff in your systems.

## The moment it clicks

Say you connect a Postgres MCP server. Now instead of you describing your schema in prose and hoping you got it right, the conversation goes like this:

> You: why are we getting duplicate orders in the last hour?
>
> Claude: let me check. *queries the orders table, groups by customer and timestamp, finds a batch of doubles from one client* Looks like requests from client 4471 are landing twice within a few milliseconds. Probably a retry without an idempotency key. Here's the query I ran so you can verify.

It went and looked. You didn't paste anything. And because it can see the real data instead of your description of the data, it stops guessing about column names and actually reasons about what's there.

That's the difference. The model was always capable of this reasoning. It just never had its eyes open.

## Adding a server to Claude Code

The mechanics are boring, which is the good news. You register a server with one command:

```bash
claude mcp add github -- npx -y @modelcontextprotocol/server-github
```

That tells Claude Code to launch that server and keep it around. Servers that need credentials take them as environment variables:

```bash
claude mcp add github -e GITHUB_TOKEN=ghp_xxxx -- npx -y @modelcontextprotocol/server-github
```

Check what's connected:

```bash
claude mcp list
```

Inside a session, `/mcp` shows you the live servers, their status, and the tools each one exposes. That's your first stop when something isn't showing up.

There are servers out there already for the usual suspects - GitHub, Postgres, Slack, Sentry, filesystem access, browser automation. You don't have to build anything to get value. Wire up two or three that match your stack and you'll feel the difference the same day.

## When to build your own

The pre-built servers cover the common tools. But the real unlock is your own internal stuff - the deploy script only your team has, the weird internal API, the service that knows which feature flags are on in prod. Nobody's going to publish a server for that. You write it.

The good news is a server is small. Here's the shape of one in TypeScript, trimmed to the essentials:

```typescript
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

const server = new McpServer({ name: "flags", version: "1.0.0" });

server.tool(
  "get_flag",
  "Check whether a feature flag is enabled in an environment",
  { name: z.string(), env: z.enum(["staging", "prod"]) },
  async ({ name, env }) => {
    const on = await lookupFlag(name, env);
    return { content: [{ type: "text", text: `${name} in ${env}: ${on}` }] };
  }
);
```

That's a working tool. The name and description matter more than you'd think - that description is how the model decides when to call it, so write it like you're explaining the tool to a new teammate, not like a variable name. Vague descriptions mean the model either ignores the tool or reaches for it at the wrong time.

The schema does double duty. It validates the input, and it tells the model exactly what arguments the tool takes, so you get far fewer malformed calls.

## A few things worth knowing before you go wide

**Tools are power, and power cuts both ways.** A tool that can write to your database can also delete from it. Start with read-only servers. When you do add write access, make the tool narrow - "close this specific ticket" beats "run arbitrary Jira commands." The tighter the tool, the less room there is for an expensive misunderstanding.

**Watch your token budget.** Every connected server dumps its tool definitions into the context window. Ten servers with chatty descriptions can eat a real chunk of your window before you've said a word. Connect what you're using, not everything you might someday use.

**Credentials live in your environment, not the model.** The token you pass to a server stays on your machine. The model never sees it - it just calls the tool and the server handles auth. That's the right boundary, and it's worth understanding so you know exactly what is and isn't exposed.

## The bigger picture

The interesting thing about MCP isn't any single server. It's that the copy-paste tax was never really about copy-paste. It was about the model being sealed off from everything that matters - your data, your tools, your systems. MCP is the standard way to open that up.

Start small. Add a filesystem server and a GitHub server this afternoon. Notice how often you were about to tab away to grab something and didn't have to. Then, when you hit the first internal tool that no public server covers, write your own. It's an afternoon of work and it turns Claude from something that talks about your systems into something that works inside them.
