---
title: Sublime Auto Indent
---
I recently discovered how to get Sublime to fix indentations for you! Since I spend a certain amount of time each day pushing characters left and right this was pretty exciting. Hope you find it useful!


In Sublime, under `Preference` select `Key Bindings - User`. If you've got anything in there already, just add the `{ "keys"... }` section below. Otherwise you can replace the `[]` with:

```
[
  { "keys": ["super+i"],
    "command": "reindent"}
]
```

Now you can use `cmd + i` (mac), or `ctrl + i` (windows) to auto indent your code. It’s not always perfect, but it’s helped me with my rails code.

## What’s happening here?

- `"keys"` labels the next section as the keys that will trigger the action.
- `["super+i"]` means “use whatever this computer defaults to” (`cmd` for macs, `ctrl` for windows) and `i` to trigger the action.
- `"command"` labels which command the given key binding should trigger.
- `"reindent"` is the command that will run on the given key press. You can find a list of commands to use [in the docs](http://www.sublimetext.com/docs/commands).
