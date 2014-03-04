var ventasView = Backbone.View.extend({
	events:{
	    'keyup #ventasCod': 'loadName',
	    'keyup #ventasPrecio': 'loadTotal',
	    'keyup #ventasCantidad': 'loadTotal',
	    'click input:radio[name=ventaPago]:checked': 'toggleOptions',
	    'click input:radio[name=ventaCategory]:checked': 'loadTotal',
	    'click input:submit': 'submitForm'
	},
	submitForm: function () {
		var el = this.$el;

		var cod = el.find("#ventasCod").val();
		var nombre = el.find("#ventasNombre").text();
		var precio = el.find("#ventasPrecio").val();
		var cantidad = el.find("#ventasCantidad").val();
		var categoria = el.find("[name=ventaCategory]:checked").val();
		var ventaPago = el.find("[name=ventaPago]:checked").val();
		var otroAlmacen = el.find("input[name='nombreAlmacen']").val();
		var ventasCliente = '';
		var numeroCliente = '';

		if(ventaPago === "Credito"){
			ventasCliente = el.find("#ventasCliente").val();
			numeroCliente = el.find("#numeroCliente").val();

			if(ventasCliente === "" || numeroCliente === ""){
				alert('No puede dejar el nombre del cliente o el numero del cliente en venta de Credito');
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

		var ventas = new ventasModel({coid:cod, nombre:nombre, precioVenta:precio, cantidad:cantidad, tipoVenta:categoria, nombreCliente: ventasCliente, numeroCliente: numeroCliente, total:total, formaPago: ventaPago, otroAlmacen: otroAlmacen });

		ventas.save({}, {
			success: function (model, response) {            
	            if(response === 0){
	            	alert('Venta Registrada Correctamente');
	            	var ultima = "Cod:"+model.coid+" <BR/> Nombre:"+model.nombre+" <BR/> Precio: "+model.precioVenta+"<BR/>Cantidad:"+model.cantidad+" <BR/>Tipo Venta: "+model.tipoVenta+"<BR/>Nombre Cliente:"+model.nombreCliente+" <BR/> Numero Cliente: "+model.numeroCliente+"<BR/> Total:"+model.total+"<BR/> Forma de Pago: "+model.formaPago + "<BR/>Nombre del almacen: "+model.otroAlmacen;
	                el.find("#ultimaVenta").html(ultima);
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
			el.find("#credito").show();
			el.find("#nombreAlmacen").hide();

		}else if(val === "OtroAlmacen"){
			el.find("#credito").hide();
			el.find(":radio[value='B']").click();
			el.find("#nombreAlmacen").show();
		}else{
			el.find("#credito").hide();
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
	loadName: function (){
	    self = this;
	    el = this.$el;

	    id = el.find("#ventasCod").val();

	    if(id !== ""){
		model = this.collection.get({"id":String(id)});
		if (model !== undefined){
		    el.find("#ventasNombre").text(model.get("name"));
		}else{
		    el.find("#ventasNombre").text("Este codigo no existe");
		}
	    }else{
                el.find("#ventasNombre").text("");
	    }
	},
       	load: function(){
	    self = this;
	    this.collection.fetch({
                    success: (function (collection, data) {
			    C('llego collection de productos');
			}),
			error:(function (e) {
				C(' Service request failure: ' + e);
			    }),
			complete:(function (e) {
				//  C(' Service request completed ');

			    })
			});
	},
    render:function() {
	    self = this;
		self.load();
		var d = new Date();
		var month = d.getMonth() + 1;
		var day = d.getDate();
		var year = d.getFullYear();
	
    	 $.get('js/templates/ventasViewTemplate.html', function (data) {
		 template = _.template($(data).html(), {month:month, day:day, year:year});
            self.$el.html(template);
        }, 'html');

        return this;
    }
});