// window.onload = function () {
//     Backbone.history.navigate("", {trigger:true});
// };

window.App = {};




var MessageRouter = Backbone.Router.extend({
    initialize:function(){
        //App.productos = new productoCollection();
        // App.clientesCredito = new clienteCollection();


        // App.clientesCredito.fetch();
        //App.views = new Array();
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
        "compras": "displayCompras",
        "mercanciaAfuera": "mercanciaAfuera",
	    "mercanciaBodega": "mercanciaBodega",
        "referencias": "displayReferencias",
        "depositos": "displayDepositos",
        "abonos": "displayAbonos",
        "gastos": "displayGastos",
        "agregar": "displayAgregarProductoNuevo",
	    "modificar": "displayModificarProducto",
        "entradaBodega": "entradaBodega",
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
    entradaBodega: function () {
        closeView(App.currentView);
        var entradaBodega = new entradaView({});
        this._attachAndRenderView(entradaBodega);
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
    displayModificarProducto: function () {
        closeView(App.currentView);
	    var modificar = new modificarProductoView({});
        this._attachAndRenderView(modificar);
    },
    displayVentas: function(){
        closeView(App.currentView);
        var ventas = new ventasView({});
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
