var modificarProductoView = Backbone.View.extend({
    events:{
	    'keyup #modificarId': 'mostrarDetallesProducto',
	    'click #informacionProducto :submit': 'submitForm'
	},
    className: "content",
    submitForm: function (e) {
	stop(e);
	self  = this;
	el = this.$el;
	if(self.model !== undefined){
	    var name = el.find("input[name='name']").val();
	    var tamano = el.find("input[name='tamano']").val();
        var type = el.find('select[name="type"]').val();
	    self.model.set("name", name);
	    self.model.set("size", tamano);
        self.model.set("type", type);

	    self.model.save({}, {
		success: function(model, response){
		    if(response == "1"){
			el.find('form').trigger('reset');
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
            			el.find("input[name='name']").val(m.escape("name"));
            			el.find("input[name='tamano']").val(m.escape("size"));
                        el.find("select[name='type']").val(m.escape("type")).change();

                    } else {
	    		 self.model = undefined;
			     el.find("input[name='name']").val("No existe este producto");
		    }
                }
	    });
	} else {
	    self.model = undefined;
	    el.find("input[name='name']").val("");
	    el.find("input[name='tamano']").val("");
	}
    },
    render:function() {
    	self = this;

    	$.get('js/templates/modificarProductoViewTemplate.html', function (data) {
            template = _.template($(data).html(), {});
            self.$el.html(template).hide().fadeIn("slow");
        }, 'html');

        return this;
    }
});