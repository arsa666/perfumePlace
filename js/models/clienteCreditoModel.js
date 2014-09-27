var clienteCreditoModel = Backbone.Model.extend({
	initialize: function () {
        this.url = 'api/clienteCreditoModel.php?id='+this.id;
    },});