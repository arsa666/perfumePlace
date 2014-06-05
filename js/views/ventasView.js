var ventasView = Backbone.View.extend({
    events:{
	'keyup #ventasCod': 'loadName',
	'keyup #cedulaCliente': 'loadCliente',
	'keyup #ventasPrecio': 'loadTotal',
	'keyup #ventasCantidad': 'loadTotal',
	'click input:radio[name=ventaPago]:checked': 'toggleOptions',
	'click input:radio[name=ventaCategory]:checked': 'loadTotal',
	'click input:submit': 'submitForm'
    },
    className: "content",
    submitForm: function (e) {
	e.preventDefault();
	e.stopPropagation();
	var el = this.$el;
	
	var cod = el.find("#ventasCod").val();
	var nombre = el.find("#ventasNombre").text();
	var precio = el.find("#ventasPrecio").val();
	var cantidad = el.find("#ventasCantidad").val();
	var categoria = el.find("[name=ventaCategory]:checked").val();
	var ventaPago = el.find("[name=ventaPago]:checked").val();
	var otroAlmacen = el.find("input[name='nombreAlmacen']").val();
	var cedulaCliente = '';
	
	if(ventaPago === "Credito"){
	    cedulaCliente = el.find("#cedulaCliente").val();
	    
	    if(cedulaCliente === ""){
		alert('No puede dejar la cedula del cliente en blanco en venta de Credito');
		return;
	    }
	}
	if(ventaPago === "OtroAlmacen"){
	    nombreAlmacen = el.find("input[name='nombreAlmacen']").val();
	    
	    if(nombreAlmacen === ""){
		alert('No puede dejar el nombre del almacen al que le transfirio el perfume en blanco, ingrese un nombre');
		return;
	    }
	}
	
	var total = el.find("#ventasTotal").val();
	
	if(cod === "" || nombre ==="" || precio === "" || cantidad === "" || categoria === ""
	   || total === ""){
	    alert('No puede dejar espacios en blanco');
	    return;
	}
	
	var ventas = new ventasModel({coid:cod, nombre:nombre, precioVenta:precio, cantidad:cantidad, tipoVenta:categoria, cedulaCliente: cedulaCliente, total:total, formaPago: ventaPago, otroAlmacen: otroAlmacen });
	
	ventas.save({}, {
	    success: function (model, response) {
	            if(response === 0){
	            	el.find('form').trigger('reset');
	            	alert('Venta Registrada Correctamente');
	            	//var ultimaVenta = new ultimaVentaView({model:model});
	                //el.find("#ultimaVenta").html(ultimaVenta.render().el);
	            }else if (response === 10){
	            	alert('"Cliente con cedula: ' + cedulaCliente + ' no existe, porfavor registre el cliente en la seccion de registrar cliente. "');
			
	            }else{
	            	alert('Solo quedan: ' +response+ ' piezas en la sala de venta con codigo de barra: ' +model.coid);
	            }
        	},
	    error: function (model, response) {
	        alert('Error al insertar venta, contacte administrador: '+response.responseText+ " con codigo de barra: " +model.coid);
	    }
	});
    },
    toggleOptions: function () {
	
	var el  = this.$el;
	var val = el.find("[name=ventaPago]:checked").val();
	if(val === "Credito"){
	    el.find(".credito").show();
	    el.find("#nombreAlmacen").hide();
	    
	}else if(val === "OtroAlmacen"){
	    el.find(".credito").hide();
	    el.find(":radio[value='B']").click();
	    el.find("#nombreAlmacen").show();
	}else{
	    el.find(".credito").hide();
			el.find("#nombreAlmacen").hide();
	}
    },
    loadTotal: function () {
	el = this.$el;
	var precio = el.find("#ventasPrecio").val();
	var cantidad = el.find("#ventasCantidad").val();
	var tipoVenta = el.find('input:radio[name=ventaCategory]:checked').val();
	var ventasTotal = el.find('#ventasTotal');
	
	var total = precio * cantidad;
	if(tipoVenta === "A"){
	    total = (total * 0.07) + total;
	}
	
	ventasTotal.val(total);
    },
    loadCliente: function () {
	self = this;
	el = this.$el;
	
	id = el.find("#cedulaCliente").val();
	
	if(id !== ""){
	    model = App.clientesCredito.where({"cedula":String(id)});
	    if (model !== undefined && model.length > 0){
		
		el.find("#ventasCliente").html(model.nombre);
		el.find("#numeroCliente").html(model.celular);
		debugger;
			}else{
			    el.find("#ventasCliente").html("Este Cliente no existe");
			}
	}else{
            el.find("#ventasCliente").html("");
	    el.find("#numeroCliente").html("");
	}
    },
    loadName: function (){
	    self = this;
	el = this.$el;

	id = el.find("#ventasCod").val();
	
	if(id !== ""){
	    var model = new productoModel({id: id});
	    fetchAndDisplayProduct(model, el, false);
	}else{
            el.find("#productoName").html("Ponga un codigo para buscar");                
	}
    },
    render:function() {
	self = this;
	var d = new Date();
	var month = d.getMonth() + 1;
	var day = d.getDate();
	var year = d.getFullYear();
	
    	$.get('js/templates/ventasViewTemplate.html', function (data) {
	    template = _.template($(data).html(), {month:month, day:day, year:year});
            self.$el.html(template).hide().fadeIn("slow");
        }, 'html');
	
	
        return this;
    }
});