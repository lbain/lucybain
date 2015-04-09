var app = app || {};
app.Todos = Backbone.View.extend({
  events: {
    'update-sort': 'updateSort'
  },
  render: function() {
    this.$el.children().remove();
    this.collection.each(this.appendModelView, this);
    return this;
  },
  appendModelView: function(model) {
    var el = new app.TodoView({model: model}).render().el;
    this.$el.append(el);
  },
  updateSort: function(event, model, position) {
    debugger
    this.collection.remove(model);

    this.collection.each(function (model, index) {
      var ordinal = index;
      if (index >= position) {
        ordinal += 1;
      }
      model.set('ordinal', ordinal);
    });

    model.set('ordinal', position);
    this.collection.add(model, {at: position});

    // to update ordinals on server:
    var ids = this.collection.pluck('id');
    console.log('post ids to server: ' + ids.join(', '));

    this.render();
  }
});