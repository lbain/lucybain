---
title: 'Bower link'
tags: ["js", "bower"]
---

At work today I used `bower link` and wanted to know more about how it works. I'm not going to talk about why you should use Bower, how to use it generally, or really anything useful for most people. I'm only going to talk about the `bower link` command.

## What does it do?

Linking with Bower creates symlinks. It makes a connection between two places on your computer so you can keep a clean file structure but still have all the code where you need it. It also means if you need the code in more than one place you only need one “master” copy and it can appear elsewhere as well.

## How do I use it?

First, let’s lay out an example. You’re working on a project and need to write some new functionality. Typically you’d just make a new directory and include your feature’s code in there, but for this example you want the code to be stand alone (perhaps you’ll use it in another project, or perhaps you’ll publish it for others to use). So you decide to write a package for Bower to manage.

Here’s the setup so far:

```
code/
  my_awesome_project/
    lots.txt
    of.rb
    files.js
    here.html

  new_package/
```

### Make your package a Bower package

```
$ cd ~/code/new_package
$ bower init
```

I just went ahead and accepted all the defaults, but if it was a real package you’d probably want to think about them. Again, this isn’t a post about all of Bower, so I’ll skip over any details on the `bower init` command.

Now your package looks like this:

```
new_package/
  node_modules/ <-- New!
  bower.json <-- New!
```

### Tell Bower about your package

Next we need to tell Bower about the `new_package` directory. This command won’t change the `new_package` directory at all.

```
$ cd ~/code/new_package
$ bower link
```

For Mac computers, the output of that will be:

```
bower link /Users/lbain/.local/share/bower/links/new_package > /Users/lbain/code/new_package
```

(Obviously the `lbain` will be different in your case.)

Ok, let’s take a quick peak under the hood and look into `/Users/lbain/.local/share/bower/links`.

```
$ cd /Users/lbain/.local/share/bower/links
```

From here you can see all the links you’ve created (probably just the one `new_package` link).

```
$ cd new_package
```

And now you should see the `node_modules` directory and the `bower.json` right there. So you can see using `bower link` creates a connection (some might even go so far as to say “link”) between the original and the bower-controlled code.

Ok, we’re halfway there! 

### Tell your project about your package

Now we can go back to your project and get to include your package.

```
$ cd ~/code/my_awesome_project
```

From here we run the `bower link` command, but with a parameter of the package name.

```
$ bower link new_package
```

**Note:** The fact that you’re just giving the name of the directory you want to link is pretty much the only really clear advantage of using `bower link` over a traditional symlink. Yes, you get all of the associated Bower-goodness, but for this example (where we’re not looking at the Bower-goodness) the name is about the only interesting thing.

The output of that is:

```
$ bower link /Users/lbain/code/my_awesome_project/bower_components/new_package > /Users/lbain/.local/share/bower/links/new_package
```

The content of `/Users/lbain/.local/share/bower/links/` hasn’t changed. Rather, that directory keeps a list of all linkable packages, not the packages that have been linked.

Now your directories should look like this:

```
code/
  my_awesome_project/
    bower_components/ <-- New!
      new_package/ <-- New!
        node_modules/ <-- New!
        bower.json <-- New!
    node_modules/ <-- New!
    lots.txt
    of.rb
    files.js
    here.html

  new_package/
    node_modules/
    bower.json
```

So, as you can see, you've got all of `new_package`’s content in `my_awesome_project/bower_components`. Any other Bower packages you link would also go to the `bower_components` folder.

### Prove it!

Alright, let’s give it a quick test. Make a new file in `new_package` and save it. It should also be in `my_awesome_project`!

```
code/
  my_awesome_project/
    new_package/
      node_modules/
      bower.json
      test.txt <-- New!
    lots.txt
    of.rb
    files.js
    here.html

  new_package/
    node_modules/
    bower.json
    test.txt <-- New!
```

You can also add files the other way. Make a new file in `my_awesome_project` and save it. It should also be in `new_package`.

Now you can develop as though your code was inline, but actually keep it as a stand alone package.

Done!

**Note:** Again, this is a 100% normal symlink. The code used to make the link can be found on [Bower’s GitHub](https://github.com/bower/bower/blob/master/lib/util/createLink.js) and doesn’t do anything fancy. If you go around moving `new_package` the symlinks will break!

## References

* [Intro to Bower](http://code.tutsplus.com/tutorials/meet-bower-a-package-manager-for-the-web--net-27774) - I really liked the style of this one, it’s quite chatty, just like me!
* [Bower’s code](https://github.com/bower/bower/) if you want to look under the hood


