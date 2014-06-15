 var clienteCollection = Backbone.Collection.extend({
    model: clienteCreditoModel,
    url: 'api/clientCollection.php'
  });