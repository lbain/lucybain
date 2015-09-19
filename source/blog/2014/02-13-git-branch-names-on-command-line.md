---
title: Git Branch Names on Command Prompt
---

I often forget which branch I'm on. Sure, I have `git branch` aliased (it’s probably one of my most frequently used commands) but sometimes I'm convinced I'm on another branch. A few commits and merges later I find out I was wrong, and it’s time for some branch cleaning.


Recently my coworker [Simon](https://plus.google.com/+SimonHildebrandt/) gave me the following code:

```
parse_git_branch() {
   git branch 2> /dev/null | sed -e '/^[^*]/d' -e 's/* \(.*\)/ (\1)/'
}
export PS1="\W\[\033[32m\]\$(parse_git_branch)\[\033[00m\] $ "
```

This code should go in your `~/.bash_profile`. Once you've added it, you'll need to source with `$ source ~/.bash_profile` (or `$ . ~/.bash_profile` if you want to save a few key strokes!).

Your prompt will be ` current-directory (branch-name) $` with your branch name in green. Mine looks like this:

![lucybain (blog) $](blog/git-branch-prompt.png)

Now you can see what branch your on right where you'll be committing it. Nice, huh? Hopefully you'll never run a `reset --hard` on the wrong branch again!