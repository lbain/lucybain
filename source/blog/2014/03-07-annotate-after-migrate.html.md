---
title: Git only push current branch
published: false
---

```
Rake::Task["db:migrate"].enhance do
  Rake::Task["splitit:db:annotate"].invoke
end

namespace :splitit do
  namespace :db do
    task :annotate => :environment do |t, args|
      `annotate --exclude tests,fixtures,factories`
    end
  end
end
```