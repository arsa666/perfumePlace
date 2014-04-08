var mercanciaAfueraView = Backbone.View.extend({
	events:{
        'click input:submit': 'insertMercanciaAfuera',        
        'keyup #coid-afuera': 'displayProductoName', 	
	},
    className: "content",
    insertMercanciaAfuera: function () {
    var self = this;
    var el = this.$el;

    var id = el.find('input[name="id"]').val();
    var cantidad = el.find('input[name="cantidad"]').val(); 
    
    var mercancia = new mercanciaAfueraModel({id:id, cantidad:cantidad});
    mercancia.save({}, {
        
        success: function (model, response) {            
            if(response === 0){                        
                alert("Se han transferido " + cantidad + "piezas del producto con codigo de barra:  " + model.get('id'));
            }else{                
                if(response === 1452){
                    var r = confirm('Este producto no existe en el inventario, desea agregarlo? ');
                    if (r === true){               
                        window.location.href='#/agregar';
                    }
                }else if(response === -1){
                     alert('No hay mercancia en la bodega de ese codigo');
                }else{
                     alert('Solo quedan: ' + response + " piezas en la bodega, eliga un numero menor o igual a este");
                }
            }
        },
        error: function (model, response) {     
                alert('Error: ' + response.responseText);
            }});
    },
	displayProductoName: function(){
        el = this.$el;
        id = el.find("#coid-afuera").val();
        
        if(id !== ""){
            model = this.collection.get({"id":String(id)});
            if (model !== undefined){
                el.find("#afueraProducto").html(model.get("name"));
            }else{
                el.find("#afueraProducto").html("Este codigo no existe");
            }
        }else{
                el.find("#afueraProducto").html("");
        }
	},
    render:function() {
    	self = this;
    	 $.get('js/templates/mercanciaAfueraViewTemplate.html', function (data) {
            template = _.template($(data).html(), {});
            self.$el.html(template).hide().fadeIn("slow");
        }, 'html');

        return this;
    }
});