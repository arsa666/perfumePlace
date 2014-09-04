var agregarProductoView = Backbone.View.extend({
	events: {
        'click #agregar-submit': 'submitForm',
        "keyup #agregarCOD": "displayProductoDetails"

	},
    className: "content",
    displayProductoDetails: function () {
        el = this.$el;
        id = el.find("#agregarCOD").val();

        if (id !== '' && id.length >= 2 ) {
            addDisabled(el.find('#agregar-submit'));
            var model = new productoModel({id: id});

            model.fetch({
                success: function (m) {
                    if(!_.isNull(m.get('name'))){//if exist.
                        var x = confirm('Producto ya registrado con codigo: ' + id + ' y nombre: ' + m.get('name') + '. Desea modificarlo?');
                        if (x) {
                            el.find('form').trigger('reset');
                            Backbone.history.navigate('#/modificar');
                        } else {
                            addDisabled(el.find('#agregar-submit'));
                        }
                    } else {
                        removeDisabled(el.find('#agregar-submit'));
                    }
                }
            });
        }
    },
    submitForm: function(event){
        stop(event);
        var el = this.$el;
        var id = el.find('input[name="id"]').val();
        var name = el.find('input[name="name"]').val();
        var tamano = el.find('input[name="tamano"]').val();

	    var producto = new productoModel({id:id, name:name, size: tamano});
        producto.save({}, {
            success: function (model, response) {
                if(response == "1"){
                    resetForm(el);
                    App.productos.add(model);
                    alert("Se ha agregado el producto a la base de datos");
                }
            },
            error: function (model, response) {
                alertError(response);
            }
        });
    },
	render:function (eventName) {

    	self = this;
    	 $.get('js/templates/agregarProductoTemplate.html', function (data) {
            template = _.template($(data).html(), {});//Option to pass any dynamic values to template
            self.$el.html(template).hide().fadeIn("slow");

        }, 'html');

        return this;
    }
});