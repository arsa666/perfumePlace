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
    	    var model = new productoModel({id: id});
    	    fetchAndDisplayProduct(model, el, false);
    	}else{
                el.find("#productoName").html("Ponga un codigo para buscar");
    	}
    },
    insertMercanciaBodega: function () {
    	var self = this;
    	var el = this.$el;

    	var id = el.find('input[name="id"]').val();
    	var cantidad = el.find('input[name="cantidad"]').val();
        var precio = el.find('input[name="precio"]').val();
        var lugar = el.find('input[name="lugar"]').val();


    	var mercancia = new mercanciaBodegaModel({id:id, cantidad:cantidad, precio: precio, lugar: lugar});
    	mercancia.save({}, {
    	    success: function (model, response) {
    		if(response === 0){
    		    alert("Producto Insertado Correctamente");
    		}else{
    		    if(response === 1452){
    			var r = confirm('Este producto no existe en el inventario, desea agregarlo? ');
    			if (r === true){
    			    window.location.href='#/agregar';
    			}
    		    }
    		}
    	    },
    	    error: function (model, response) {
    		alert('Error: ' + response.responseText);
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