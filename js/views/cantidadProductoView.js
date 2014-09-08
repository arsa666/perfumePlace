var cantidadProductoView = Backbone.View.extend({
    className:'content',
	events:{
	"keyup #productoReferencia": "displayProductoDetails",
    'click #cantidad-submit': 'buscarCantidad'
	},
	displayProductoDetails: function(event){
        var el = this.$el;
        var id = el.find("#productoReferencia").val();

        if(id !== ""){
            var model = new productoModel({id: id});
            fetchAndDisplayProduct(model, el, false);
        }else{
                el.find("#productoName").html("Ponga un codigo para buscar");
        }
    },
    buscarCantidad: function () {
        var el = this.$el;
        var formData = {};
        formData.id = el.find("#productoReferencia").val();

        if(formData.id !== ""){
            $.get('api/cantidadProducto.php', formData, function(obj) {
                obj = JSON.parse(obj);
                el.find('#cantidad-bodega').html(obj['cantidad_bodega']);
                el.find('#cantidad-afuera').html(obj['cantidad_afuera']);
                el.find('#cantidad-pueblos').html(obj['cantidad_pueblos']);


            });
        }else{
            el.find("#productoName").html("Ponga un codigo para buscar");
        }
    },
    render:function() {
    	self = this;
    	 $.get('js/templates/cantidadProductoViewTemplate.html', function (data) {
            template = _.template($(data).html(), {});
            self.$el.html(template);
        }, 'html');

        return this;
    }
});