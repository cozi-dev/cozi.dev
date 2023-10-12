---
title: "Setting up a virtual environment with Vagrant for testing"
date: 2023-10-11T02:31:18-05:00
tags: ["devops", "ansible", "tool", "vm", "vagrant", "virtualbox"]
---

In the world of software development, testing is a critical aspect of ensuring the reliability and functionality of your applications. But how can you create a controlled and reproducible testing environment without compromising your local development machine? The answer lies in using Vagrant, a powerful tool for managing virtualized development environments. In this article, we'll walk you through the process of setting up a virtual machine (VM) for testing purposes with Vagrant.

## Prerequisites

Before we get started, you'll need to install the following software:

* [VirtualBox](https://www.virtualbox.org/wiki/Downloads)
* [Vagrant](https://www.vagrantup.com/downloads)

## Initialize a Vagrant project

### Create a new directory for your project

```bash
mkdir vagrant-test && cd vagrant-test
vagrant init
```

### Configure the Vagrantfile

```ruby
Vagrant.configure("2") do |config|
  config.vm.box = "ubuntu/focal64" # search for available boxes at https://app.vagrantup.com/boxes/search

  # Create a forwarded port mapping which allows access to a specific port
  # within the machine from a port on the host machine. In the example below,
  # accessing "localhost:8080" will access port 80 on the guest machine.
  # NOTE: This will enable public access to the opened port
  config.vm.network "forwarded_port", guest: 80, host: 8080

  config.vm.provider "virtualbox" do |vb|
    vb.memory = "1024" # set the desired memory size
  end
end
```

### Start the VM

```bash
vagrant up
```

### SSH into the VM

```bash
vagrant ssh

# or create ssh config file
vagrant ssh-config > vagrant-ssh
```

### Cleanup

When you're done with your VM, you can destroy it with the following command:

```bash
vagrant destroy
```

## Use cases for testing

### Testing Ansible playbooks

You can use Vagrant to test your Ansible playbooks. This is especially useful if you're using Ansible to provision servers in production. You can use Vagrant to test your playbooks on a local VM before deploying them to production. Check out some of my articles about Ansible:

* [How to set up Drone CI for GitHub using Ansible](https://cozi.dev/posts/how-to-setup-drone-ci-for-github-using-ansible/)
* [Transfer files to new server using Ansible](https://cozi.dev/posts/transfer-files-to-new-server-using-ansible/)

### Testing your k8s cluster

You can create multiple VMs with Vagrant and use them to test your k8s cluster.

### Testing your application deployment

You can use Vagrant to test your application deployment. For example, if you're deploying a web application, you can use Vagrant to test your deployment on a local VM before deploying it to production.

## Conclusion

In this article, we've walked through the process of setting up a VM for testing purposes with Vagrant. I hope you found this article helpful. If you have any questions or comments, please leave them in the comments section below. Have a great day!