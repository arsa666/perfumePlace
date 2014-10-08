var inventarioTotalView = Backbone.View.extend({
    initialize: function(options) {
        this.options = options;
    },
    className: "content",
	buscarEntrada: function(){
        var el = this.$el;
        var formData = {};
        var result = '<table class="entrada-table"><tr class="entrada-header"><td>Codigo</td><td>Nombre</td><td>Cant.</td><td>Precio</td><td>Tipo</td><td>Lugar</td></tr>';
        $.get(this.options.url, formData, function(obj) {
            obj = JSON.parse(obj);
            var total_cantidad = 0;
            var total_precio = 0;
            var total_cantidad_perfume = 0;
            var total_precio_perfume = 0;
            var total_cantidad_sabana = 0;
            var total_precio_sabana = 0;
            var total_cantidad_sobrecama = 0;
            var total_precio_sobrecama = 0;
            var total_cantidad_toalla = 0;
            var total_precio_toalla = 0;
            var total_cantidad_cortina = 0;
            var total_precio_cortina = 0;
            var total_cantidad_otro = 0;
            var total_precio_otro = 0;
            _.each(obj, function (entrada) {
                total_cantidad += parseInt(entrada.cantidad, 10);
                total_precio += (parseFloat(entrada.precio) * parseInt(entrada.cantidad, 10));
                if (entrada.type === 'perfume') {
                    total_cantidad_perfume += parseInt(entrada.cantidad, 10);
                    total_precio_perfume += (parseFloat(entrada.precio) * parseInt(entrada.cantidad, 10));
                } else if(entrada.type === 'sabana') {
                    total_cantidad_sabana += parseInt(entrada.cantidad, 10);
                    total_precio_sabana += (parseFloat(entrada.precio) * parseInt(entrada.cantidad, 10));
                } else if(entrada.type === 'sobrecama') {
                    total_cantidad_sobrecama += parseInt(entrada.cantidad, 10);
                    total_precio_sobrecama += (parseFloat(entrada.precio) * parseInt(entrada.cantidad, 10));
                } else if(entrada.type === 'toalla') {
                    total_cantidad_toalla += parseInt(entrada.cantidad, 10);
                    total_precio_toalla += (parseFloat(entrada.precio) * parseInt(entrada.cantidad, 10));
                } else if(entrada.type === 'cortina') {
                    total_cantidad_cortina += parseInt(entrada.cantidad, 10);
                    total_precio_cortina += (parseFloat(entrada.precio) * parseInt(entrada.cantidad, 10));
                } else if(entrada.type === 'otro') {
                    total_cantidad_otro += parseInt(entrada.cantidad, 10);
                    total_precio_otro += (parseFloat(entrada.precio) * parseInt(entrada.cantidad, 10));
                }
                result = result + "<tr><td>" + entrada.id + "</td><td>" + entrada.name + "</td><td>" + entrada.cantidad + "</td><td>" + entrada.precio + "</td><td>" + entrada.type + "</td><td>" + entrada.lugar+ '</td></tr>';
            });
            result += '</table>';
            var total = "Total Cantidad de Perfumes: <span>" + total_cantidad_perfume.toLocaleString() + "</span><BR/>Total Valor Perfumes: $<span>" + total_precio_perfume.toLocaleString() + "</span><BR/><HR>";
            total += "Total Cantidad de Sabanas: <span>" + total_cantidad_sabana.toLocaleString() + "</span><BR/>Total Valor Sabanas: $<span>" + total_precio_sabana.toLocaleString() + "</span><BR/><HR>";
            total += "Total Cantidad de Sobre Cama: <span>" + total_cantidad_sobrecama.toLocaleString() + "</span><BR/>Total Valor Sobre Cama: $<span>" + total_precio_sobrecama.toLocaleString() + "</span><BR/><HR>";
            total += "Total Cantidad de Toalla: <span>" + total_cantidad_toalla.toLocaleString() + "</span><BR/>Total Valor Toalla: $<span>" + total_precio_toalla.toLocaleString() + "</span><BR/><HR>";
            total += "Total Cantidad de Cortinas: <span>" + total_cantidad_cortina.toLocaleString() + "</span><BR/>Total Valor Cortinas: $<span>" + total_precio_cortina.toLocaleString() + "</span><BR/><HR>";
            total += "Total Cantidad de Otros: <span>" + total_cantidad_otro.toLocaleString() + "</span><BR/>Total Valor Otros: $<span>" + total_precio_otro.toLocaleString() + "</span><BR/><HR>";
            total += "Total Cantidad de Piezas: <span>" + total_cantidad.toLocaleString() + "</span><BR/>Total Valor: $<span>" + total_precio.toLocaleString() + "</span><BR/><HR>";


            el.find('#entrada-resultado').html(result);
            el.find('#inventario-total').html(total);
        });
    },
    render:function() {
    	self = this;
        var title = 'Sala de Venta';
        if (this.options.url === 'api/inventario.php?lugar=Bodega') {
            title = 'Bodega';
        } else if (this.options.url === 'api/inventario.php?lugar=Pueblos') {
            title = 'Los Pueblos';
        } else if (this.options.url === 'api/inventario.php?lugar=Afuera') {
            title = 'Sala de Venta';
        }


    	$.get('js/templates/inventarioTotalTemplate.html', function (data) {
            template = _.template($(data).html(), {title: title});
            self.$el.html(template);
            self.buscarEntrada();
        }, 'html');

        return this;
    }
});