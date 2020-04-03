---
title: 暗影精灵修改 OMEN 键
date: 2020-02-27T00:00:57+08:00
updated: 2020-02-27T00:00:57+08:00
categories: 
    - Windows
tags:
    - tricks
comments: true
toc: true
permalink: mod-omencommandcenter-key
---

暗影精灵的键盘上有一个自带的 OEM 键，按了之后可以打开 OMEN Command Center, 一个可以对笔记本的性能，网络管理的工具。

但是我对这个控制中心需求很小，所以我直接把软件卸载了(●´ω｀●)。

所以，怎么去利用这个键呢？

注意：该键是没有 keycode 的，也就是不被作为键盘的输入键。

<!-- more -->

## 如果你按这个键没有效果

你需要先安装两个惠普提供的驱动：

- <ftp://ftp.hp.com/pub/caps-softpaq/Omen/SP98588.exe>
- <https://www.microsoft.com/store/productId/9P4W8RFN9M2T>

## 修改注册表

![omencommandcenter](https://cdn.nlark.com/yuque/0/2020/png/99649/1582943719981-75a95f6f-79cf-45ee-bc98-917c6ff20608.png)

按下 OMEN 键时，系统会弹出来这个框，这说明系统想打开注册了这个链接的应用。

```reg
HKEY_CURRENT_USER\SOFTWARE\Classes\omencommandcenter
```

关于 windows 应用注册链接详见：<https://blog.walterlv.com/post/windows-uri-scheme-association.html>

解决方法就是修改注册表：
![修改注册表](https://cdn.nlark.com/yuque/0/2020/png/99649/1582944595209-e7394b3e-6d78-4884-9305-4054bbf7ffa4.png)

```reg
HKEY_CURRENT_USER\SOFTWARE\Classes\omencommandcenter\Shell\Open\Command
```

在 omencommandcenter 下依次添加 `Shell`、 `Open`、 `Command`，大小写不敏感，然后修改 `Command` 的 `(Default)` 值为想打开的应用程序。

这里的 `Open` 的意思就是你在资源管理器中双击一个类型的文件就打开某个软件那样。

比如说像我就设置成了 `wt.exe -d .`，就是调用 Windows Terminal 打开当前目录。

## 一些 Tips

windows 还提供了 执行 vbs 的工具：

```bat
mshta vbscript:clipboarddata.setdata(\"text\",\"%1\")(close)
```
参考： <https://lolbas-project.github.io/lolbas/Binaries/Mshta/>

或者你可以执行某个 `Powershell` 文件：

```bat
powershell.exe -ExecutionPolicy ByPass -File "xxx.ps1"
```

如果你还想再硬核一点，你可以通过注册表唤起自己写的一个脚本来执行你要做的事情。