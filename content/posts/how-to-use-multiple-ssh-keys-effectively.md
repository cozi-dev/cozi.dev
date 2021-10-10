---
title: "How To Use Multiple SSH Keys Effectively"
date: 2021-10-10T17:28:27+07:00
tags: ["ssh", "tips", "git"]
---

If you work on multiple projects, you might need to use multiple ssh key pairs for more security, right?
But switch ssh key to access the right project may cost us some time to remember and write the syntax, so let's try the easier way: use aliases.

For example, you have two ssh private keys with the following names: `my_key_a`, `my_key_b`.
Add two aliases into your OS bash config file like: `.bashrc`, `.zshrc`

```bash
# ssh
alias ssha="eval \"$(ssh-agent -s)\" && ssh-add -K ~/.ssh/my_key_a"
alias sshb="eval \"$(ssh-agent -s)\" && ssh-add -K ~/.ssh/my_key_b"
```

Reload your terminal and then enter `ssha` when you want to access the project with private key `my_key_a`, you can do the same with private key `my_key_b`.

Thanks for reading! And I hope this could save you some time.