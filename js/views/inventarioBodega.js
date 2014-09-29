var inventarioTotalView = Backbone.View.extend({
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
	var result = '<table class="entrada-table"><tr class="entrada-header"><td>Codigo</td><td>Nombre</td><td>Cantidad</td><td>Precio</td><td>Lugar</td></tr>';
        $.get(this.options.url, formData, function(obj) {
            obj = JSON.parse(obj);
            _.each(obj, function (entrada) {
                result = result + "<tr><td>" + entrada.id + "</td><td>" + entrada.name + "</td><td>" + entrada.cantidad + "</td><td class='v-hidden'>" + entrada.precio + "</td><td>" + entrada.lugar+ '</td></tr>';
            });
            el.find('#entrada-resultado').html(result);
        });
      	},
    render:function() {
    	self = this;
        var title = 'Sala de Venta';
        if (this.options.url === 'api/inventario.php?lugar=Bodega') {
            title = 'Bodega';
        } else if (this.options.url === 'api/entradaPueblosModel.php') {
            title = 'Los Pueblos';
        }


    	$.get('js/templates/inventarioTotalTemplate.html', function (data) {
            template = _.template($(data).html(), {title: title});
            self.$el.html(template);
        }, 'html');

        return this;
    }
});