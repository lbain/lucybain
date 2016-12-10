---
title: Using jQuery to Make Flashcards for jQuery
published: false
---

```
values = $.map($('#content').find('article'), function(el){
  title = $(el).find('.entry-title a').text();
  description = $(el).find('.entry-summary').text().trim().replace(";", ".");
  categories = $.map($(el).find('.category'), function(category){
    return $(category).find('a').first().text();
  });
  return [title, description, categories.join(' ')].join('; ');
});
values.join('\n');
```

https://ankiweb.net/shared/info/1449106365