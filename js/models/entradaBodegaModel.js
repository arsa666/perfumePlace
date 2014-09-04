var entradaBodegaModel = Backbone.Model.extend({
	initialize: function () {
        this.url = 'api/entradaBodegaModel.php?year='+this.get('year')+'&month='+this.get('month')+'&day='+this.get('day');

    },});
