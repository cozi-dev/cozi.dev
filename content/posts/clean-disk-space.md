---
title: "Clean Disk Space"
date: 2021-12-10T20:22:24+07:00
tags: ["disk", "server", "command"]
---

# Clean disk space

You might run out of SSD space with your laptop or server. In that case, you may want to buy more disk space or do the following yourself to clean large/unused files to save your disk:

```bash
df -h
```
This command shows you how much space available left on your machine.

```bash
# Example output
Filesystem      Size  Used Avail Use% Mounted on
udev            3,9G     0  3,9G   0% /dev
tmpfs           790M  2,4M  787M   1% /run
/dev/sda5       110G   97G  7,4G  93% /
```
In this case, I've around 7G left (93% disk used)

Next, enter the following comfmand to find which files are larger than 500M in the current working directory:

```bash
sudo find . -type f -size +500M -exec ls -lh {} \;
```
```bash
# Example output
-r--r--r-- 1 meliodas meliodas 519M Thg 12  7 15:18 ./code/learning/example/.git/modules/user_data/data/objects/pack/pack-c0a9ca4a3db1648ecffe38de5cf42b5c9d01da86.pack
-rw------- 1 meliodas meliodas 832M Thg 10 27 13:04 './.Genymobile/Genymotion/deployed/Google Pixel 2/android_system_disk.vmdk'
-rw------- 1 meliodas meliodas 901M Thg 11 23 12:44 './.Genymobile/Genymotion/deployed/Google Pixel 2/Snapshots/{62eef85a-10b9-424c-b854-16dd2bf914c0}.vmdk'
```

Then you should check which files are unused and delete them using the `rm` command to save as much space as possible.

## Reference

* https://www.digitalocean.com/community/questions/28-no-space-left-on-device-error