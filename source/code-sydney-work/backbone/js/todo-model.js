var app = app || {};

app.Todo = Backbone.Model.extend({
  defaults: {
    title: '',
    completed: false,
    ordinal: null
  },
  toggle: function(){
    this.save({ completed: !this.get('completed')});
  }
});