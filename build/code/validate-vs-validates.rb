require 'active_record'

class Foo
  include ::ActiveModel::Validations

  attr_accessor :should_validate
  validate :should_validate, presence: true
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