var referenciaBuscarView = Backbone.View.extend({
	events: {
		"keyup #productoReferencia": "displayProductoDetails"
	},
    className: "content",
	displayProductoDetails: function(event){

		el = this.$el;
		id = el.find("#productoReferencia").val();
		
		if(id !== ""){
			model = this.collection.get({"id":String(id)});
			if (model !== undefined){
				el.find("#productoDetails").html(model.get("name"));
			}else{
                el.find("#productoDetails").html("Este codigo no existe");

            }
		}else{
                el.find("#productoDetails").html("Ponga un codigo para buscar");                
        }
	},
    load: function(){
    	self = this;
    	this.collection.fetch({
                    success: (function (collection, data) {
                        C('llego collection de productos');
                    }),
                    error:(function (e) {
                        C(' Service request failure: ' + e);
                    }),
                    complete:(function (e) {
                      //  C(' Service request completed ');

                    })
            });
    },
    render:function (eventName) {

    	self = this;
    	this.load();
    	 $.get('js/templates/referenciaBuscarMenuTemplate.html', function (data) {
            template = _.template($(data).html(), {});//Option to pass any dynamic values to template
            self.$el.html(template).hide().fadeIn("slow");
        }, 'html');

        return this;
    }
});