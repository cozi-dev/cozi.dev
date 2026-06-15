---
title: "Refactoring Go with Claude Code"
date: 2026-06-15T12:00:00+07:00
tags: ["ai", "golang", "productivity", "claude-code", "workflow"]
---

Go code ages well, mostly. The language doesn't change much, the standard library stays stable, and idiomatic Go from five years ago still looks fine today. But the business logic inside that code - the stuff that was "temporary" and became permanent - that's a different story. Functions that were supposed to be simple grew arms. Packages that were supposed to be separate started depending on each other. The code works, but reading it requires decoding context that only exists in the original author's head.

Refactoring Go is where Claude Code actually earns its place in my workflow.

## Why Go and Claude Code work well together

Go's type system is strict enough that Claude Code gets clear signal from the compiler. When you ask it to extract a function or move a type to a different package, you'll know immediately if it broke something - the build fails, the error is specific, and Claude knows how to read `go build` output.

Compare that to dynamically typed languages where a refactor might "work" locally but fail in ways that only show up at runtime in production. With Go, the feedback loop is tight. Ask Claude to refactor, run the build, fix whatever the compiler complains about, done.

The other reason: Go is explicit. Interfaces are structural, not nominal. Dependencies are explicit in function signatures. There's no magic, no reflection-heavy frameworks doing invisible things. Claude Code can read a Go file and understand the full picture without needing context from five other files it can't see.

## What I actually use it for

**Splitting big functions.** The classic situation: someone wrote a 200-line function because it was easier than deciding where to put the pieces. I paste the function and ask Claude to split it into named sub-functions with clear responsibilities. It usually gets the split right on the first try because Go's explicit return types make the natural boundaries obvious.

**Extracting interfaces.** You have a concrete type that everything depends on, and now you want to test against a fake. Ask Claude to look at how the type is used and generate an interface with just the methods you need. This is tedious to do by hand - finding every call site, checking which methods are used, writing the interface definition. Claude does it in seconds.

**Renaming across a package.** `gorename` exists, but Claude Code handles the cases where you want to rename something and also update the comments, the docs, maybe the test names too. It treats naming as a semantic task, not a text replacement.

**Cleaning up error handling.** Old Go code sometimes has error handling that predates the `fmt.Errorf("... %w", err)` pattern. If you want to add context to errors throughout a package - so your stack traces are actually readable - that's exactly the kind of mechanical-but-requires-judgment task that Claude is good at.

## Where it needs supervision

**Package boundaries.** Claude will suggest moving things between packages when they look logically related. That's often wrong. Go package design is about compile-time dependencies, not just logical grouping. A function that "belongs" with a type might create a circular import if it moves there. Always check the import graph before accepting suggestions that cross package lines.

**Concurrency changes.** If you ask Claude to "make this concurrent," check the result carefully. It's not that it writes wrong concurrent code - it's that concurrency decisions in Go have subtle implications for caller contracts, error propagation, and shutdown behavior. The `sync.WaitGroup` might be correct, the goroutine might be right, and the code still might be surprising to the next person who reads it.

**Test refactors.** Go tests are code too, and Claude sometimes "cleans up" tests in ways that remove coverage you wanted. If you're asking for a refactor that touches test files, be explicit: "refactor the implementation, leave the test behavior identical."

## A pattern that works

When I hand Claude Code a Go file to refactor, I don't just say "refactor this." I say what I want the end state to look like:

- "I want this function to take an interface instead of a concrete type so I can test it without hitting the database."
- "I want these three functions that all do the same SQL query to share a helper, not copy the query string."
- "I want the error from `fetchUser` to include the user ID so I can trace it in logs."

Concrete end states give Claude something to optimize toward. "Clean this up" produces cosmetic changes. "Make it testable without a real database" produces a structural change that actually improves the code.

## The honest verdict

Claude Code doesn't know your system better than you do. It doesn't know why that function is 200 lines, or why that package boundary exists, or what that comment about "temporary workaround" actually means. What it does is take the tedious part of refactoring - the mechanical work of restructuring while keeping behavior identical - and make that fast.

That leaves you free to do the part that actually requires judgment: deciding what the code should look like, and whether the change is worth making at all.

In Go, where the compiler is strict and the language is explicit, that combination works surprisingly well.
