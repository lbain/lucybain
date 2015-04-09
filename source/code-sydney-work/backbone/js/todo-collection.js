var app = app || {};

app.TodoList = Backbone.Collection.extend({
  model: app.Todo,
  localStorage: new Store("backbone-todo"),
  comparator: function(model) {
    return model.get('ordinal');
  },
});

// instance of the Collection
app.todoList = new app.TodoList();