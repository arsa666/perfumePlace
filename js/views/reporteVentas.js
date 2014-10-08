var reporteVentas = Backbone.View.extend({
    initialize: function(options) {
        this.options = options;
        this.listenTo(this, 'afterRender', this.afterRender);
    },
	className:'content',
	events:{
	'click .template': 'templateFunc'
	},
	templateFunc: function(){
	},
    afterRender: function() {
        var el = this.$el;
        var formData = {};
        var result = '<table class="entrada-table"><tr class="entrada-header"><td>Codigo</td><td>Nombre</td><td>Precio</td><td>Cant.</td><td>Total</td><td>Forma de Pago</td></tr>';
        $.get(this.options.url, formData, function(obj) {
            obj = JSON.parse(obj);
            var total = 0;
            _.each(obj, function (row) {
                result += '<tr><td>'+row.coid+'</td><td>'+row.nombre+'</td><td>'+row.precioVenta+'</td><td>'+row.cantidad+'</td><td>'+row.total+'</td><td>'+row.formaPago+'</td></tr>';
                if (row.formaPago !== 'OtroAlmacen' || row.formaPago !== 'Credito') {
                    total +=  parseFloat(row.total);
                }
            });

            result += '</table>';
            el.find('#tabla-diaria').html(result);
            el.find('#tabla-stats-diario').html('$'+ total);


        });

            el.find('#tabla-diaria').html(result);

    },
    render:function() {
    	self = this;
    	 $.get('js/templates/reporteVentasTemplate.html', function (data) {
            template = _.template($(data).html(), {almacen: self.options.almacen});
            self.$el.html(template);
            self.trigger('afterRender');
        }, 'html');

        return this;
    }
});