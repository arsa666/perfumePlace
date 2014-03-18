var mercanciaBodegaView = Backbone.View.extend({
	events:{
	    'click input:submit': 'insertMercanciaBodega',
	    'keyup #coid-bodega': 'displayProductoName',	 	   	
	},
	className: "content",
	displayProductoName: function () {
		el = this.$el;
		id = el.find("#coid-bodega").val();
		
		if(id !== ""){
			model = this.collection.get({"id":String(id)});
			if (model !== undefined){
				el.find("input[name='nombre']").val(model.get("name"));
			}else{
                el.find("input[name='nombre']").val("Este codigo no existe");
            }
		}else{
                el.find("input[name='nombre']").val("");
		}
	},
    insertMercanciaBodega: function () {
	var self = this;
	var el = this.$el;

	var id = el.find('input[name="id"]').val();
	var name = el.find('input[name="nombre"]').val();
	var cantidad = el.find('input[name="cantidad"]').val();	
	
	var mercancia = new mercanciaBodegaModel({id:id, name:name, cantidad:cantidad});
	mercancia.save({}, {	    
	    success: function (model, response) {            
			if(response === 0){	                    
			    el.find("#bodegaResponse").html("Producto Insertado Correctamente");
			}else{
			    if(response === 1452){
					var r = confirm('Este producto no existe en el inventario, desea agregarlo? ');
					if (r === true){			   
					    window.location.href='#/agregar';
					}else{
						alert('Error al insertar inventario a la bodega, contacte administrador: ' + response);
					}
			    }
			}
	    },
	    error: function (model, response) {		
				alert('Error al insertar inventario a la bodega, contacte administrador: ' + response);
            }});
    },
    render:function() {
    	self = this;
    	 $.get('js/templates/mercanciaBodegaViewTemplate.html', function (data) {
            template = _.template($(data).html(), {});
            self.$el.html(template).hide().fadeIn("slow");
        }, 'html');

        return this;
    }
});