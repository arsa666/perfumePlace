 var productoCollection = Backbone.Collection.extend({
    model: productoModel,
    url: 'api/productoCollection.php'
  });