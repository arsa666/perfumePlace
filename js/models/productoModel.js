var productoModel = Backbone.Model.extend({
	initialize: function(){
		this.url = 'api/productoModel.php?id='+this.id;
	}    
});