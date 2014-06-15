var clienteCreditoView = Backbone.View.extend({
    initialize:function () {
        self = this;
         $.get('js/templates/clienteCreditoViewTemplate.html', function (data) {
            template = _.template($(data).html(), {});
            self.$el.html(template);
            $('#main').append(self.$el.html());//.hide().fadeIn("slow");
        }, 'html');
    },
	events:{
	'click input:submit': 'registarClienteCredito'
	},
    className: "content",
	registarClienteCredito: function(e) {
        stop(e);
        var self = this;
        var el = this.$el;
        var cedula = el.find('#creditoCedula').val();
        var name = el.find('#creditoNombre').val();
        var celular = el.find('#creditoCelular').val();

        var clienteCredito = new clienteCreditoModel({cedula:cedula, name:name, celular:celular});
        clienteCredito.save({}, {
            success: function (model, response) {
                    if(response === 0){
                        el.find('form').trigger('reset');
                        alert('Cliente registrado Correctamente');
                    }else{
                        alertError(response);
                    }
            },
            error: function (model, response) {
                    alertError(response);
            }
        });
    },
    render:function() {
    	self = this;
    	 $.get('js/templates/clienteCreditoViewTemplate.html', function (data) {
            template = _.template($(data).html(), {});
            self.$el.html(template).hide().fadeIn("slow");

        }, 'html');

        return this;
    }
});