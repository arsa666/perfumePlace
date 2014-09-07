var entradaView = Backbone.View.extend({
    initialize: function(options) {
        this.options = options;
    },
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
            var result = '<table class="entrada-table"><tr><td>Codigo</td><td>Nombre</td><td>Cantidad</td><td>Precio</td><td>Lugar</td></tr>';
            $.get(this.options.url, formData, function(obj) {
                obj = JSON.parse(obj);
                _.each(obj, function (entrada) {
                    result = result + "<tr><td>" + entrada.id + "</td><td>" + entrada.name + "</td><td>" + entrada.cantidad + "</td><td class='v-hidden'>" + entrada.precio + "</td><td>" + entrada.lugar+ '</td></tr>';
                });
                el.find('#entrada-resultado').html(result);
            });
        }else{
                el.find("#productoName").html("Ponga un codigo para buscar");
        }
	},
    render:function() {
    	self = this;
        var title = 'Sala de Venta';
        if (this.options.url === 'api/entradaBodegaModel.php') {
            title = 'Bodega';
        } else if (this.options.url === 'api/entradaPueblosModel.php') {
            title = 'Los Pueblos';
        }


    	$.get('js/templates/entradaViewTemplate.html', function (data) {
            template = _.template($(data).html(), {title: title});
            self.$el.html(template);
        }, 'html');

        return this;
    }
});