var modificarProductoView = Backbone.View.extend({
    initialize:function () {
        self = this;
         $.get('js/templates/clienteCreditoViewTemplate.html', function (data) {
            template = _.template($(data).html(), {});
            self.$el.html(template);
            $('#main').append(self.$el.html());//.hide().fadeIn("slow");
        }, 'html');
    },
	events:{
	    'keyup #modificarId': 'mostrarDetallesProducto',
	    'click #informacionProducto :submit': 'submitForm'
	},
	className: "content",
	submitForm: function () {
	    self  = this;
	    el = this.$el;
	    if(self.model !== undefined){
			var name = el.find("input[name='name']").val();
			self.model.set("name", name);
			self.model.save({}, {
				success: function(model, response){
				    if(response == "1"){
						alert('Producto Modificado Correctamente');
				    }
				},
				error: function(){
				    	alert('Falla en modificacion');
				}
		    });
	    }
	},
	mostrarDetallesProducto: function() {
	    el = this.$el;
	    self = this;
	    idVal = el.find("#modificarId").val();

	    if(idVal !== ""){
			model = this.collection.get({"id":String(idVal)});
			if(model != undefined){
			    self.model = model;
			    el.find("input[name='name']").val(model.get("name"));
			} else {
	    		self.model = undefined;
			    el.find("input[name='name']").val("No existe este producto");
			}
	    } else {
	    	self.model = undefined;
			el.find("input[name='name']").val("");
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
    render:function() {
    	self = this;
		self.load();
    	 $.get('js/templates/modificarProductoViewTemplate.html', function (data) {
            template = _.template($(data).html(), {});
            self.$el.html(template).hide().fadeIn("slow");
        }, 'html');

        return this;
    }
});