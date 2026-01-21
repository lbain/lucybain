---
title: "Sublime Text Macros"
tags: ["js", "interview-questions"]

description: test
keywords: testing
---
My coworker users vim, and has a snazzy macro to put a `binding.pry` wherever he using a keyboard shortcut. I thought it was a neat trick (and he mentioned something about Sublime not being a real editor), so I decided to implement it for Sublime as well.


I looked up [how to make macros](http://docs.sublimetext.info/en/latest/extensibility/macros.html) and wrote one for adding `binding.pry`. Basically you need to use `control + q` to start and stop your macro recording. Then you save the macro by going to `Tools/Save Macro...`. You should name it something memorable, like `add_binding`.

Ok, now we've got our macro, and you can invoke it by going to `Tools/Macros/User/add_macro`. (Note: you might need to restart Sublime first.) But going to the menu each time is lame, we're better than that.

Let’s add a key binding!

I've done [key bindings](http://docs.sublimetext.info/en/latest/customization/key_bindings.html) in the [past](/blog/2014/Sublime-Auto-Indent/), but not [with macros](http://superuser.com/questions/609057/how-do-i-assign-a-keyboard-shortcut-to-recorded-macro-in-sublime-text). I chose to use `command + b` for mine (you might have that map to build, just a heads up...). So my key binding looked like this:

```
  { "keys": ["super+b"],
    "command": "run_macro_file",
    "args": {"file": "Packages/User/add_binding.sublime-macro"} }
```

Awesome, now `command + b` will add a `binding.pry` inline. Handy!

But I wanted more, a `- binding.pry` in haml, and a `debugger` in javascript. I also wanted to use the same key binding. I didn’t want to think about if I’m in haml or JS.

Creating the macros was the same, but I needed the key bindings to know what kind of file I was in. I looked into how to make [key bindings source aware](http://www.guiguan.net/how-to-set-a-key-binding-in-sublime-text-based-on-the-file-type-the-command-is-running-on/). I also needed to know how [sublime names file types](https://gist.github.com/iambibhas/4705378).

Putting it all together, the final key bindings look like this:

```
  { "keys": ["super+b"],
    "command": "run_macro_file",
    "args": {"file": "Packages/User/add_binding.sublime-macro"},
    "context": [{"key": "selector", "operator": "equal", "operand": "source.ruby,source.ruby.rails"}] },

  { "keys": ["super+b"],
    "command": "run_macro_file",
    "args": {"file": "Packages/User/add_haml_binding.sublime-macro"},
    "context": [{"key": "selector", "operator": "equal", "operand": "text.haml"}] },

  { "keys": ["super+b"],
    "command": "run_macro_file",
    "args": {"file": "Packages/User/add_debugger.sublime-macro"},
    "context": [{"key": "selector", "operator": "equal", "operand": "source.js,source.coffee"}] }
```