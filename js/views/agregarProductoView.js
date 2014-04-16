var agregarProductoView = Backbone.View.extend({
	events: {
        'click #agregarProducto :submit': 'submitForm',
        "keyup #agregarCOD": "displayProductoDetails"

	},
    className: "content",
    displayProductoDetails: function () {
        el = this.$el;
        id = el.find("#agregarCOD").val();

        if (id !== "") {
            model = this.collection.get({"id":String(id)});
            if (model !== undefined){
                el.find("#agregarDetails").val(model.get("name"));
            }else{
                el.find("#agregarDetails").val("");
            }
        }else{
                el.find("#agregarDetails").val("");
        }
    },
    submitForm: function(event){
        event.preventDefault();
        var el = this.$el;
        var id = el.find('input[name="id"]').val();
        var name = el.find('input[name="name"]').val();
        model = this.collection.get({"id":String(id)});

        if(model !== undefined){
            alert('Este producto ya esta registrado con el codigo de barra: ' + id);
            return;
        }

	var producto = new productoModel({id:id, name:name});
        producto.save({}, {
        success: function (model, response) {
            if(response == "1"){
                App.productos.add(model);
                alert("Se ha agregado el producto a la base de datos");
            }
        },
        error: function (model, response) {
            alert('Error: ' + response.responseText);
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