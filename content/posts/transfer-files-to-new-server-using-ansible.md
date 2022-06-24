---
title: "Transfer files to new server using Ansible"
date: 2022-06-24T22:11:23+07:00
tags: ["devops", "ansible", "tool"]
---

This is a simple Ansible playbook to use when I need to transfer files from the current server to a new server.

```yml
---
- hosts: old_server
  remote_user: root
  become: yes
  gather_facts: no

  vars_files:
    - ../inventories/{{ env }}/group_vars/main.yml

  tasks:
    - name: transfer files to new server
      synchronize: 
        mode: pull
        src: /home/old_user/app/backup
        dest: /home/new_user/app/backup
      delegate_to: new_server
```

After I ran this playbook, all files and directories inside `/home/old_user/app/backup` on the `old_server` will be transferred to `/home/new_user/app/backup` on the `new_server`.

This can save a lot of time compared to doing it manually.
Please let me know in the comment section below if you have any questions.
