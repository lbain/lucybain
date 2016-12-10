---
title: Upgrading to Middleman v4

description: I spent a week upgrading my blog to use the next Middleman version. Hopefully my experience will help someone else.
keywords: middleman, upgrade, middleman v4
---

My blog runs on [Middleman](https://middlemanapp.com/) - I really like the way they’ve set things up, and it feels very familiar to me since it’s written in Ruby. However, v4 came out almost a year ago, and I never upgraded. I tried half heartedly a couple of times, but never committed. But this time I made the leap, what you see before you is a blog built by Middleman 4.0.0 (ok, I need to upgrade it even more, but this is an improvement!).

I hit some snags as I went along, so let’s talk about those

## Removed “Implied Extension feature”

The first issue is listed in their [upgrade docs](https://middlemanapp.com/basics/upgrade-v4/) as:

> Removed "Implied Extension feature", all templates must include a full file name plus the list of desired templating extensions.

I completely missed this (it’s about halfway down a long list of bullet points, most of which didn’t apply to me), but eventually found it referenced in a few issues.

*What does that mean?*

Good question, it wasn’t obvious to me either. The “full file name” is the normal name of the file (this file’s name is `12-10-middleman-v4`) which is simple enough. But the “list of desired templating extensions” needs to include the ultimate format you want your page to end up in (in this case, `.html`). This is new, you used to be able to just have `12-10-middleman-v4.md`, but now you need the full `12-10-middleman-v4.html.md`.

Updating all your files to add a `.html` before the previous extension is more than a little annoying. So I wrote a little script to help me out:

```
path_to_project = "" # FILL ME IN

# Step 1: get a list of all the extensions you use

require 'set'
extensions = Set.new []

Dir.glob(path_to_project).each do |file|
  parts = file.split('.')
  extensions.merge(parts[1.. parts.length])
end

extensions.each do |extension|
  puts extension
end

# Step 2: convert the extensions you want converted

extensions_to_convert = [] # FILL ME IN

Dir.glob(path_to_project).each do |file|
  parts = file.split('.')
  should_convert_extension? = (parts & extensions_to_convert).any?
  already_converted? = parts.include? 'html'
  next unless should_convert_extension? and not already_converted?
  new_name = parts[0] + '.html.' + parts[1..parts.length].join('.')

  # verify file conversion
  puts "#{file} > #{new_name}"

  # uncomment to make actual changes
  # File.rename(file, new_name)
end
```

You can find it [here](https://gist.github.com/lbain/5ce9ef81f6a3ce6f3b4b84774f9a63d8).

## Filter errors with `<code>` and `:code`

Some of my earlier blog posts were written in Haml (this was back when I was writing more Ruby and didn’t know Markdown as well). In general these moved from `.haml` to `.html.haml` without a hitch, but a few threw errors on `<code>` and `:code` saying:

> Filter "code" is not defined.

I have no idea what changed in Haml or Middleman to trigger this failure (I assume it was a Middleman change since I only moved from [Haml 4.0.5 to 4.0.7](https://github.com/lbain/lucybain/commit/0cab70d26bd82946dbc6475fe0a4bb147f5639b4)). Since I only had a few of these errors it was easiest to convert the Haml files to Markdown files. It’s something I’ve been meaning to do anyway, and this was as good a time as any.

## Sass files should include Sass files

I had a tiny issue with a Sass file that used to be `@include`ing a CSS file, but now died. Seems like that should never have worked, but it was an easy fix to convert my one [CSS file to a Sass](http://css2sass.herokuapp.com/) file and have everything work.

## Middleman-blog doesn’t like Haml layout

I don’t really know what’s going on here, but I’m not the only [person](https://github.com/middleman/middleman-blog/issues/324) experiencing this [issue](https://github.com/middleman/middleman-blog/issues/322). At the end of the day there’s something wonky happening with how the blog template plays with the general site template in Haml. After a fair amount of tinkering (and hair pulling...) I gave up and [converted the layouts](https://haml2erb.org/) to `.erb` files. I’m not super happy with this outcome (I had `.haml` files for a reason!), but it works and I want to enjoy my remaining hair.

An issue with converting from `.haml` to `.erb`: in order to preserve whitespace and nice things in a markdown converted blog post with code snippets I needed to use `find_and_preserve`. However, this method only exists in Haml, and so isn’t available in an `.erb` file. It’s not needed for embedded Ruby, but it’ll throw errors until you delete it.

## `<pre><code>` wrapping

Last of all I found the updated [Redcarpet gem](https://github.com/vmg/redcarpet) now wraps all code in `<code>` tags. Now you’d think this wasn’t a big deal, but it really messed with my head. What used to happen was...

    `single ticks`
    <code>single ticks</code>


    ```
    triple ticks
    ```
    <pre>triple ticks</pre>

But now the ``` is different:

    ```
    triple ticks
    ```
    <pre><code>triple ticks</code></pre>

Unfortunately all my styling relied on the `<code>` only being used inline and the `<pre>` only being used for code blocks. It [wasn’t hard to fix](https://github.com/lbain/lucybain/commit/945fd5c249731572e1c9ebeb2a3a7e97351de2cd), but it make my blog posts look weird and caused a good deal of despair.

## Lessons learned

Usually the lesson from this kind of thing is “update earlier!” but I’m honestly not sure that would have helped. There weren’t a lot of resources out there to find (or my Google searches were completely off base), and the [Middleman forum](https://forum.middlemanapp.com) kept not loading. Which is why I’m writing this post - I hope it helps someone!

I did hugely underestimate the amount of time involved with doing the upgrade. Often solving the issue wasn’t too difficult, but finding it was hard. And, in the case of the Haml layouts, I never solved it but had to call it quits and move on to the next thing.

I also got really frustrated with the whole thing and nearly called it off at least twice. It’s hard to keep going when you don’t know how close to the end you are. 



