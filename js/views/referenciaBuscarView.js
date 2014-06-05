var referenciaBuscarView = Backbone.View.extend({
    events: {
	"keyup #productoReferencia": "displayProductoDetails"
    },
    className: "content",
    displayProductoDetails: function(event){
	el = this.$el;
	id = el.find("#productoReferencia").val();
	
	if(id !== ""){
	    model = new productoModel({id: id});
	    model.fetch({
		success:function (m){
		    if(!_.isNull(m.get('name'))){//if exist.
			el.find("#productoName").html(m.escape("name"));
			el.find("#productoSize").html(m.escape("size"));
		    } else {
			el.find("#productoName").html("No existe este producto");
			el.find("#productoSize").html("");
		    }
                }
	    });	
	}else{
            el.find("#productoName").html("Ponga un codigo para buscar");                
	}
    },
    render:function (eventName) {
	self = this;
    	$.get('js/templates/referenciaBuscarMenuTemplate.html', function (data) {
            template = _.template($(data).html(), {});//Option to pass any dynamic values to template
            self.$el.html(template).hide().fadeIn("slow");
        }, 'html');
	
        return this;
    }
});