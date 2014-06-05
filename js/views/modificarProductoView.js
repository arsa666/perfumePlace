var modificarProductoView = Backbone.View.extend({
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
			model = new productoModel({id: idVal});
			model.fetch({
                success: function (m) {
                	if(!_.isNull(m.get('name'))){//if exist.
                		self.model = m;
			    		el.find("input[name='name']").val(m.get("name"));
                	}else {
	    				self.model = undefined;
			    		el.find("input[name='name']").val("No existe este producto");
					}
                }
            });


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