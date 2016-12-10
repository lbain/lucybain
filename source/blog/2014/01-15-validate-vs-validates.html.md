---
title: validate vs. validateS
---
I stumbled across this validation gotcha a while back, but that was before I had this awesome blog ;) I think this is a pretty big one, hope this help someone!

`::ActiveModel::Validations` treats `validates` and `validate` differently. `validates` is used for normal validations `presence`, `length`, and the like. `validate` is used for custom validation methods `validate_name_starts_with_a`, or whatever crazy method you come up with. These methods are clearly useful and help keep data clean.

That’s all well and good, except for one tiny thing:

```
  #lang: ruby
  require 'active_record'

  class Foo
    include ::ActiveModel::Validations

    attr_accessor :bar
    validate :bar, presence: true
    # Note the validate without an s!
  end


  require 'rspec'
  require 'rspec/autorun'

  describe 'Foo' do
    it 'fails to actually validate' do
      foo = Foo.new
      foo.valid?.should be_false
    end
  end
```

That test *fails*.

Go ahead, copy that into a new file and run it for yourself. I'll wait. Yep, it fails. There’s no value set for `bar` and yet `foo.valid?` still returns `true`. This is a problem.

So what’s going on here? I asked [stackOverflow](http://stackoverflow.com/questions/18140898/whats-the-difference-between-validate-and-validates), and it turns out there’s a totally reasonable explanation. `validate` is written to look for a custom validation method, this time one called `bar`. It just so happens there is a `bar` method, set from the `attr_accessor :bar` line. That `bar` method returns doesn’t return `false`, nor does it put an error messages on the main object’s body. Therefore `validate` interprets the call to `bar` as a success and doesn’t invalidate the object.

This explanation also means there’s no way for the code to “fail loudly” - to alert us that we haven’t purposefully defined a custom method when we use `validate`. So I'd suggest grepping through your codebase for `validate :` and making very sure that’s what you actually want.

So remember folks, `validates` is for Rails validators (and custom validator classes ending with `Validator` if that’s what you're into), and `validate` is for your custom validator methods. Don’t make a typo!








