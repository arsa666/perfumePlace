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
            model.fetch({
            success:function (m){
                  if(!_.isNull(m.get('name'))){//if exist.
                     el.find("#productoName").html(m.escape("name"));
                     el.find("#productoSize").html(m.escape("size"));
                  } else {
                     el.find("#productoName").html("No existe este producto");
                     el.find("#productoSize").html("");
                  }
                }
            });
        }else{
                el.find("#productoName").html("Ponga un codigo para buscar");
        }
    },
    buscarCantidad: function () {
        var el = this.$el;
        var formData = {};
        formData.id = el.find("#productoReferencia").val();

        if(formData.id !== ""){
            var result = '<table><tr><td>Codigo</td><td>Nombre</td><td>Cantidad</td><td>Precio</td><td>Lugar</td></tr>';
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