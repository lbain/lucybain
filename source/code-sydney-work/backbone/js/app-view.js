var app = app || {};

$(document).ready(function() {
  $('#todo-list').sortable({
    stop: function(event, ui) {
      ui.item.trigger('drop', ui.item.index());
    }
  });
});

app.AppView = Backbone.View.extend({
  el: '#todoapp',
  initialize: function () {
    this.input = this.$('#new-todo');
    // when new elements are added to the collection render then with addOne
    app.todoList.on('add', this.addOne, this);
    app.todoList.on('reset', this.addAll, this);
    app.todoList.fetch(); // Loads list from local storage
  },
  events: {
    'keypress #new-todo': 'createTodoOnEnter',
    'update-sort': 'updateSort'
  },
  createTodoOnEnter: function(e){
    if ( e.which !== 13 || !this.input.val().trim() ) { // ENTER_KEY = 13
      return;
    }
    app.todoList.create(this.newAttributes());
    this.input.val(''); // clean input box
  },
  addOne: function(todo){
    var position;
    if (todo.get('ordinal') || todo.get('ordinal') == 0) {
      position = todo.get('ordinal');
    } else {
      position = app.todoList.length - 1;
    }
    todo.set('ordinal', position);
    var view = new app.TodoView({model: todo});
    var element = view.render().$el;
    element.data("model", todo);
    $('#todo-list').append(element);
  },
  addAll: function(){
    this.$('#todo-list').html(''); // clean the todo list
    app.todoList.each(this.addOne, this);
  },
  newAttributes: function(){
    return {
      title: this.input.val().trim(),
      completed: false
    }
  },
  render: function() {
    $('#todo-list').empty();
    this.addAll();
    return this;
  },
  updateSort: function(event, model, position) {
    app.todoList.remove(model);

    app.todoList.each(function (model, index) {
      var ordinal = index;
      if (index >= position) {
        ordinal += 1;
      }
      model.set('ordinal', ordinal);
      model.save();
    });

    model.set('ordinal', position);
    app.todoList.add(model, {at: position});
    model.save();

    this.render(); // Loads list from local storage
  }
});

//--------------
// Initializers
//--------------

app.appView = new app.AppView();