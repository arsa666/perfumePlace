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
        "clienteCredito" : "clienteCredito",
        "ventas": "displayVentas",
        "mercanciaAfuera": "mercanciaAfuera",
	    "mercanciaBodega": "mercanciaBodega",
        "referencias": "displayReferencias",
        "depositos": "displayDepositos",
        "abonos": "displayAbonos",
        "gastos": "displayGastos",
        "agregar": "displayAgregarProductoNuevo",
	"modificar": "displayModificarProducto",
        "entradaBodega": "entradaBodega",
        "entradaAfuera": "entradaAfuera",
	"cantidadProducto": "cantidadProducto",
    "mercanciaPueblos": "mercanciaPueblos",
    "ventasPueblos": "displayVentasPueblos",
    "entradaPueblos": "entradaPueblos",



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
    //menu views
    clienteCredito: function () {
        closeView(App.currentView);
        var clienteCredito = new clienteCreditoView({});
        this._attachAndRenderView(clienteCredito);
    },
    cantidadProducto: function () {
        closeView(App.currentView);
        var cantidadProducto = new cantidadProductoView({});
        this._attachAndRenderView(cantidadProducto);
    },
    entradaBodega: function () {
        closeView(App.currentView);
        var url = 'api/entradaBodegaModel.php';
        var entradaBodega = new entradaView({url: url});
        this._attachAndRenderView(entradaBodega);
    },
    entradaPueblos: function () {
        closeView(App.currentView);
        var url = 'api/entradaPueblosModel.php';
        var entradaBodega = new entradaView({url: url});
        this._attachAndRenderView(entradaBodega);
    },
    entradaAfuera: function () {
        closeView(App.currentView);
        var url = 'api/entradaAfueraModel.php';
        var entradaAfuera = new entradaView({url: url});
        this._attachAndRenderView(entradaAfuera);
    },
    mercanciaBodega: function () {
        closeView(App.currentView);
        var mercanciaBodega = new mercanciaBodegaView({});
        this._attachAndRenderView(mercanciaBodega);
    },
    mercanciaAfuera: function () {
        closeView(App.currentView);
        var mercanciaAfuera = new mercanciaAfueraView({});
        this._attachAndRenderView(mercanciaAfuera);
    },
    mercanciaPueblos: function () {
        closeView(App.currentView);
        var mercanciaPueblos = new mercanciaPueblosView({});
        this._attachAndRenderView(mercanciaPueblos);
    },
    displayModificarProducto: function () {
        closeView(App.currentView);
	    var modificar = new modificarProductoView({});
        this._attachAndRenderView(modificar);
    },
    displayVentas: function(){
        closeView(App.currentView);
        var ventas = new ventasView({url: 'api/ventasModel.php'});
        this._attachAndRenderView(ventas);
    },
    displayVentasPueblos: function(){
        closeView(App.currentView);
        var ventas = new ventasView({url: 'api/ventasPueblosModel.php'});
        this._attachAndRenderView(ventas);
    },
    displayReferencias: function(){
        closeView(App.currentView);
        var referenciaBuscar = new referenciaBuscarView({});
        this._attachAndRenderView(referenciaBuscar);
    },
    displayAgregarProductoNuevo: function(){
        closeView(App.currentView);
        var agregarProducto = new agregarProductoView({});
        this._attachAndRenderView(agregarProducto);
    }

});

var router  = new MessageRouter();

$( document ).ready(function() {
        Backbone.history.start();
});

window.App.router = router;
