var agregarProductoView = Backbone.View.extend({
	events: {
        'click #agregarProducto :submit': 'submitForm'
	},
    className: "content",
    submitForm: function(){
        var el = this.$el;
        var id = el.find('input[name="id"]').val();
        var name = el.find('input[name="name"]').val();
        model = this.collection.get({"id":String(id)});

        if(model !== undefined){
            alert('Este producto ya esta registrado con el id: ' + id);
            return;
        }

	var producto = new productoModel({id:id, name:name});
        producto.save({}, {
        success: function (model, response) {            
            if(response == "1"){
                //App.productos.refresh();
                el.find("#agregadoCorrecto").html("Se ha agregado el producto a la base de datos");
            }
        },
        error: function (model, response) {
            alert('Error al insertar producto, contacte administrador.');
        }
});
    },
	render:function (eventName) {

    	self = this;
    	 $.get('js/templates/agregarProductoTemplate.html', function (data) {
            template = _.template($(data).html(), {});//Option to pass any dynamic values to template
            self.$el.html(template);//adding the template content to the main template.
        }, 'html');

        return this;
    }
});