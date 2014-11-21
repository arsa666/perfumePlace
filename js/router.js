// window.onload = function () {
//     Backbone.history.navigate("", {trigger:true});
// };

window.App = {};


var MessageRouter = Backbone.Router.extend({
    initialize:function(){
        App.currentView;
        $('#main').empty();
        this.menuDisplay();
        Backbone.history.bind("all", function () {
            var url = Backbone.history.fragment;
            if (!_.isUndefined(App.menuView)) {
                $('body').find('.active').removeClass("active");
                var url = "#/" + url;
                $('body').find('a[href="'+url+'"]').addClass("active");
            }
        });
    },
    routes:{
        ""      : "menuDisplay",
      	"inventarioBodega": "inventarioBodega",
      	"inventarioAfuera": "inventarioAfuera",
      	"inventarioPueblos": "inventarioPueblos",
        "reporteVentas": "reporteVentas",
        "reporteVentasPueblos": "reporteVentasPueblos",
        "modificarCantidad" : "modificarCantidad"
    },
    //MENU
     menuDisplay: function () {
        App.menuView = new menuView({});
        App.menuView.render();
    },
    _attachAndRenderView: function (view) {
        App.currentView = view;
        $('#main').append(view.render().el);
    },
    inventarioBodega: function(){
      closeView(App.currentView);
      var url = 'api/inventario.php?lugar=Bodega';
      var inventarioBodega = new inventarioTotalView({url: url});
      this._attachAndRenderView(inventarioBodega);
    },
    inventarioAfuera: function(){
      closeView(App.currentView);
      var url = 'api/inventario.php?lugar=Afuera';
      var inventarioAfuera = new inventarioTotalView({url: url});
      this._attachAndRenderView(inventarioAfuera);
    },
    inventarioPueblos: function(){
      closeView(App.currentView);
      var url = 'api/inventario.php?lugar=Pueblos';
      var inventarioPueblos = new inventarioTotalView({url: url});
      this._attachAndRenderView(inventarioPueblos);
    },
    reporteVentas: function(){
      closeView(App.currentView);
      var reporteVentasView = new reporteVentas({url: 'api/reporteVentasDiarias.php', almacen: 'Central'});
      this._attachAndRenderView(reporteVentasView);
    },
    reporteVentasPueblos: function(){
      closeView(App.currentView);
      var reporteVentasView = new reporteVentas({url: 'api/reporteVentasDiarias.php', almacen: 'Pueblos'});
      this._attachAndRenderView(reporteVentasView);
    },
    modificarCantidad: function(){
      closeView(App.currentView);
      var modificarCantidad = new modificarCantidadView({});
      this._attachAndRenderView(modificarCantidad);
    }


});

var router  = new MessageRouter();

$( document ).ready(function() {
        Backbone.history.start();
});

window.App.router = router;
