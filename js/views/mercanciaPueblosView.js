var mercanciaPueblosView = Backbone.View.extend({
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
    mercancia.url='api/mercanciaPueblosModel.php';
    mercancia.save({}, {

        success: function (model, response) {
            if(response === 0){
                alert("Se han transferido " + cantidad + " piezas del producto con codigo de barra:  " + model.get('id') +" y nombre "+ el.find("#productoName").html() + " y tamano "  + el.find("#productoSize").html());
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
            model = new productoModel({id: id});
        model.fetch({
        success: function (m) {
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
            el.find("#productoName").html("");
        el.find("#productoSize").html("");
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