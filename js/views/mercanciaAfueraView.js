var mercanciaAfueraView = Backbone.View.extend({
	events:{
        'click input:submit': 'insertMercanciaAfuera',        
        'keyup #coid-afuera': 'displayProductoName', 	
	},
    insertMercanciaAfuera: function () {
    var self = this;
    var el = this.$el;

    var id = el.find('input[name="id"]').val();
    var name = el.find('input[name="nombre"]').val();
    var cantidad = el.find('input[name="cantidad"]').val(); 
    
    var mercancia = new mercanciaAfueraModel({id:id, name:name, cantidad:cantidad});
    mercancia.save({}, {
        
        success: function (model, response) {            
            if(response === 0){                        
                el.find("#afueraResponse").html("Producto Insertado Correctamente");
            }else{                
                if(response === 1452){
                    var r = confirm('Este producto no existe en el inventario, desea agregarlo? ');
                    if (r === true){               
                        window.location.href='#/agregar';
                    }
                }else if(response === -1){
                     alert('No hay mercancia en la bodega de ese codigo');
                }else{
                     alert('Solo quedan: ' + response + " en la bodega, eliga un numero menor o igual a este");
                }
            }
        },
        error: function (model, response) {     
                alert('Error al insertar inventario a la bodega, contacte administrador.' + response.responseText);
            }});
    },
	displayProductoName: function(){
        el = this.$el;
        id = el.find("#coid-afuera").val();
        
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
    render:function() {
    	self = this;
    	 $.get('js/templates/mercanciaAfueraViewTemplate.html', function (data) {
            template = _.template($(data).html(), {});
            self.$el.html(template);
        }, 'html');

        return this;
    }
});