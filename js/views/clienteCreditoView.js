var clienteCreditoView = Backbone.View.extend({
	events:{
	'click input:submit': 'registarClienteCredito'
	},
    className: "content",
	registarClienteCredito: function() {
    
        var self = this;
        var el = this.$el;

        var cedula = el.find('#creditoCedula').val();
        var name = el.find('#creditoNombre').val();
        var celular = el.find('#creditoCelular').val(); 
        
        var clienteCredito = new clienteCreditoModel({cedula:cedula, name:name, celular:celular});
        clienteCredito.save({}, {        
                success: function (model, response) {            
                        if(response === 0){                     
                            alert('Cliente registrado Correctamente');
                        }else{                      
                            alert('Error al insertar inventario a la cliente credito, contacte administrador: ' + response);
                            }
                },
            error: function (model, response) {     
                    alert('Error al insertar inventario a la cliente credito, contacte administrador: ' + response);
                }
            });	   
    },
    render:function() {
    	self = this;
    	 $.get('js/templates/clienteCreditoViewTemplate.html', function (data) {
            template = _.template($(data).html(), {});
            self.$el.html(template);
        }, 'html');

        return this;
    }
});