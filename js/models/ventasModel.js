var ventasModel = Backbone.Model.extend({
	initialize: function(options){
		this.url = 'api/ventasModel.php';
		this.coid = options.coid;
		this.nombre = options.nombre;
		this.precioVenta = options.precioVenta;
		this.cantidad = options.cantidad;
		this.tipoVenta = options.tipoVenta;
		this.nombreCliente = options.nombreCliente;
		this.numeroCliente = options.numeroCliente;
		this.total = options.total;	
		this.formaPago = options.formaPago;
		this.otroAlmacen = options.otroAlmacen;	
	}    
});