var reporteVentas = Backbone.View.extend({
    initialize: function(options) {
        this.options = options;
        this.listenTo(this, 'afterRender', this.afterRender);
    },
	className:'content',
    events:{
	'click #reporte-tabla-submit': 'ventasTabla',
	'click #reporte-producto-submit': 'productoTabla',
	'click #reporte-graph-submit': 'ventasGraph'

    },
    afterRender: function () {
        var el = this.$el;
        $(function() {
            el.find( "#from" ).datepicker({
              defaultDate: "+1w",
              changeMonth: true,
              numberOfMonths: 1,
              onClose: function( selectedDate ) {
                el.find( "#to" ).datepicker( "option", "minDate", selectedDate );
              }
            });
            el.find( "#calendar-tabla" ).datepicker({
              defaultDate: "+1w",
              changeMonth: true,
              numberOfMonths: 1,
            });
            el.find( "#to" ).datepicker({
              defaultDate: "+1w",
              changeMonth: true,
              numberOfMonths: 1,
              onClose: function( selectedDate ) {
                el.find( "#from" ).datepicker( "option", "maxDate", selectedDate );
              }
            });
        });
    },
    productoTabla: function(){
        var el = this.$el;
        var formData = {};
        formData.coid = el.find('#producto-ind').val();
        formData.lugar = this.options.almacen;
        var byMonth = {};

        var result = '<table class="entrada-table"><tr class="entrada-header"><td>Codigo</td><td>Nombre</td><td>Precio</td><td>Cant.</td><td>Total</td><td>Forma de Pago</td><td>Cliente</td><td>Fecha</td><td>A/B</td></tr>';
        $.get('api/reporteProducto.php', formData, function(obj) {
            obj = JSON.parse(obj);
            var total = 0;
            _.each(obj, function (row) {
                result += '<tr><td>'+row.coid+'</td><td>'+row.nombre+'</td><td>'+row.precioVenta+'</td><td>'+row.cantidad+'</td><td>'+row.total+'</td><td>'+row.formaPago+'</td><td>'+row.cedulaCliente+'</td><td>'+ row.time +'</td><td>'+row.tipoVenta+'</td></tr>';
                if (row.formaPago !== 'OtroAlmacen' || row.formaPago !== 'Credito') {
                    total +=  parseFloat(row.total);
                    var date = row.time.substring(0, 7);
                    if (_.isUndefined(byMonth[date])) {
                        byMonth[date] = 0;
                    }
                    byMonth[date] += parseInt(row.cantidad, 10);
                }
            });

            result += '</table>';
            el.find('#tabla-producto').html(result);

            var byMonthHtml = '';
            _.each(byMonth, function (v,k) {
                byMonthHtml += '<div><b>'+k+':</b> '+v+'</div>';
            });
            el.find('#producto-x-mes').html(byMonthHtml);
        });
    },
    ventasTabla: function(){
        var el = this.$el;
        var formData = {};
        var from = el.find('#calendar-tabla').val().split('/');
        formData.year = from[2];
        formData.month = from[0];
        formData.day = from[1];
        formData.lugar = this.options.almacen;

        var result = '<table class="entrada-table"><tr class="entrada-header"><td>Codigo</td><td>Nombre</td><td>Precio</td><td>Cant.</td><td>Total</td><td>Forma de Pago</td><td>Cliente</td><td>Tipo</td><td>A/B</td></tr>';
        $.get(this.options.url, formData, function(obj) {
            obj = JSON.parse(obj);
            var total = 0;
            var totalTodo = 0;
    	    var perfumes = 0;
    	    var sabanas = 0;
    	    var sobrecamas = 0;
    	    var cortinas = 0;
    	    var otros = 0;
    	    var toallas = 0;
            var piezas_perfumes = 0;
            var piezas_sabanas = 0;
            var piezas_sobrecamas = 0;
            var piezas_cortinas = 0;
            var piezas_otros = 0;
            var piezas_toallas = 0;
            var totalEfectivo = 0;
            var totalCredito = 0;
            var totalTarjeta = 0;
            var totalOtroAlmacen = 0;
            _.each(obj, function (row) {
                result += '<tr><td>'+row.coid+'</td><td>'+row.nombre+'</td><td>'+row.precioVenta+'</td><td>'+row.cantidad+'</td><td>'+row.total+'</td><td>'+row.formaPago+'</td><td>'+row.cedulaCliente+'</td><td>'+row.type+'</td><td>'+row.tipoVenta+'</td></tr>';
                if (row.formaPago === 'Efectivo') {
                    totalEfectivo += parseFloat(row.total);
                    total +=  parseFloat(row.total);
                } else if (row.formaPago === 'Credito') {
                    totalCredito +=  parseFloat(row.total);
                } else if (row.formaPago === 'OtroAlmacen') {
                    totalOtroAlmacen +=  parseFloat(row.total);
                } else if (row.formaPago === 'TarjetaCredito' || row.formaPago === 'TarjetaClave') {
                    totalTarjeta += parseFloat(row.total);
                    total +=  parseFloat(row.total);
                }

                if (row.type === 'perfume') {
                    perfumes += parseFloat(row.total);
                    piezas_perfumes += parseFloat(row.cantidad);
                } else if (row.type === 'sabana') {
                    sabanas += parseFloat(row.total);
                    piezas_sabanas += parseFloat(row.cantidad);
                } else if (row.type === 'sobrecama') {
                    sobrecamas += parseFloat(row.total);
                    piezas_sobrecamas += parseFloat(row.cantidad);
                } else if (row.type === 'cortina') {
                    cortinas += parseFloat(row.total);
                    piezas_cortinas += parseFloat(row.cantidad);
                } else if (row.type === 'otro') {
                    otros += parseFloat(row.total);
                    piezas_otros += parseFloat(row.cantidad);

                }else if (row.type === 'toalla') {
                    toallas += parseFloat(row.total);
                    piezas_toallas += parseFloat(row.cantidad);

                }
                totalTodo +=  parseFloat(row.total);

            });

            result += '</table>';
            el.find('#tabla-diaria').html(result);
            el.find('#tabla-stats-cortina').html(' $'+ cortinas.toFixed(2));
            el.find('#tabla-stats-perfume').html(' $'+ perfumes.toFixed(2));
            el.find('#tabla-stats-sabana').html(' $'+ sabanas.toFixed(2));
            el.find('#tabla-stats-sobrecama').html(' $'+ sobrecamas.toFixed(2));
            el.find('#tabla-stats-toalla').html(' $'+ toallas.toFixed(2));
            el.find('#tabla-stats-otro').html(' $'+ otros.toFixed(2));
            el.find('#cortina-total').html(piezas_cortinas);
            el.find('#perfume-total').html(piezas_perfumes);
            el.find('#sabana-total').html(piezas_sabanas);
            el.find('#sobrecama-total').html(piezas_sobrecamas);
            el.find('#toalla-total').html(piezas_toallas);
            el.find('#otro-total').html(piezas_otros);
            el.find('#tabla-stats-total-todo').html(' $'+ totalTodo.toFixed(2));
            el.find('#tabla-stats-efectivo').html(' $'+ totalEfectivo.toFixed(2));
            el.find('#tabla-stats-tarjeta').html(' $'+ totalTarjeta.toFixed(2));

            el.find('#tabla-stats-credito').html(' $'+ totalCredito.toFixed(2));
            el.find('#tabla-stats-otro-almacen').html(' $'+ totalOtroAlmacen.toFixed(2));
            el.find('#tabla-stats-diario').html(' $'+ total.toFixed(2));

        });
    },
    ventasGraph: function() {
        var el = this.$el;
        var formData = {};

        var from = el.find('#from').val().split('/');
        var to = el.find('#to').val().split('/');
        var totalEfectivo = 0;
        var totalCredito = 0;
        var totalTarjeta = 0;
        var totalOtroAlmacen = 0;
        var totalEfectivoTarjeta = 0;
        var totalTodo = 0;

        formData.year1 = from[2];
        formData.month1 = from[0];
        formData.day1 = from[1];
        formData.year2 = to[2];
        formData.month2 = to[0];
        formData.day2 = to[1];
        formData.lugar = this.options.almacen;


         $.get('api/reporteVentasTimeRange.php', formData, function(obj) {
            obj = JSON.parse(obj);
            if (!_.isEmpty(obj)) {
                _.each(obj, function (o) {
                    if (o.formaPago === 'Efectivo') {
                        totalEfectivo = parseFloat(o.total);
                        totalEfectivoTarjeta += parseFloat(o.total);
                    }
                    if (o.formaPago === 'TarjetaCredito' || o.formaPago === 'TarjetaClave') {
                        totalTarjeta = parseFloat(o.total);
                        totalEfectivoTarjeta += parseFloat(o.total);
                    }

                    if (o.formaPago === 'Credito') totalCredito = parseFloat(o.total);
                    if (o.formaPago === 'OtroAlmacen') totalOtroAlmacen = parseFloat(o.total);

                    totalTodo += parseFloat(o.total);
                });

                el.find('#timeRange-stats-total-todo').html(' $'+ parseFloat(totalTodo.toFixed(2)).toLocaleString());
                el.find('#timeRange-stats-efectivo').html(' $'+ parseFloat(totalEfectivo.toFixed(2)).toLocaleString());
                el.find('#timeRange-stats-tarjeta').html(' $'+ parseFloat(totalTarjeta.toFixed(2)).toLocaleString());

                el.find('#timeRange-stats-credito').html(' $'+ parseFloat(totalCredito.toFixed(2)).toLocaleString());
                el.find('#timeRange-stats-otro-almacen').html(' $'+ parseFloat(totalOtroAlmacen.toFixed(2)).toLocaleString());
                el.find('#timeRange-stats-efectivoTarjeta').html(' $'+ parseFloat(totalEfectivoTarjeta.toFixed(2)).toLocaleString());

            } else {
                el.find('.timeRage-reset').html('...');
            }

        });

        $.get('api/reporteVentasGraph.php', formData, function(obj) {
            obj = JSON.parse(obj);
    	    if (!_.isEmpty(obj)) {
                var labels = [];
                var data = [];
                _.each(obj, function (single){
                    labels.push(single.time);
                    data.push(parseFloat(single.total).toFixed(2));
                });

                var data = {
                    labels: labels,
                    datasets: [
                        {
                        label: "My First dataset",
                        fillColor: "rgba(151,187,205,0.2)",
                        strokeColor: "rgba(255,0,0,1)",
                        pointColor: "rgba(0,0,0,1)",
                        pointStrokeColor: "#fff",
                        pointHighlightFill: "#fff",
                        pointHighlightStroke: "rgba(151,187,205,1)",
                        data: data
                        }
                    ]
                };

                var ctx = el.find("#myChart").get(0).getContext("2d");
                var myLineChart = new Chart(ctx).Line(data);
            } else {
                el.find('#no-graph').html('No hay Data para este rango de fechas');
            }

        });


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