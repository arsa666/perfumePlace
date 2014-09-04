var entradaView = Backbone.View.extend({
	events:{
	'click #entrada-submit': 'buscarEntrada'
	},
    className: "content",
	buscarEntrada: function(){
        var el = this.$el;
        var formData = {};
        formData.year = el.find("#entrada-year").val();
        formData.month = el.find("#entrada-mes").val();
        formData.day = el.find("#entrada-dia").val();

        if(formData.year !== ""){
            // var model = new entradaBodegaModel({year: year, month: month, day: dia});
            // model.fetch({
            //     success: function (m){
            //         debugger;
            //       if(!_.isNull(m.get('name'))){//if exist.
            //          el.find("#productoName").html(m.escape("name"));
            //          el.find("#productoSize").html(m.escape("size"));
            //       } else {
            //          el.find("#productoName").html("No existe este producto");
            //          el.find("#productoSize").html("");
            //       }
            //     }
            // });
            var result = '<table><tr><td>Codigo</td><td>Nombre</td><td>Cantidad</td><td>Precio</td><td>Lugar</td></tr>';
            $.get('api/entradaBodegaModel.php', formData, function(obj) {
                obj = JSON.parse(obj);
                _.each(obj, function (entrada) {
                    result = result + "<tr><td>" + entrada.id + "</td><td>" + entrada.name + "</td><td>" + entrada.cantidad + "</td><td>" + entrada.precio + "</td><td>" + entrada.lugar+ '</td></tr>';
                });
                el.find('#entrada-resultado').html(result);
            });
        }else{
                el.find("#productoName").html("Ponga un codigo para buscar");
        }

	},
    render:function() {
    	self = this;
    	 $.get('js/templates/entradaViewTemplate.html', function (data) {
            template = _.template($(data).html(), {});
            self.$el.html(template);
        }, 'html');

        return this;
    }
});