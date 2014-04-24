// window.onload = function () {
//     Backbone.history.navigate("", {trigger:true});
// };

window.App = {};

var MessageRouter = Backbone.Router.extend({
    initialize:function(){
        App.productos = new productoCollection();
        App.productos.fetch();
        App.currentView;
        $('#main').empty();
        this.menuDisplay();
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
	    "modificar": "displayModificarProducto"
    },
    menuDisplay: function () {
        App.menuView = new menuView({});
    },
    clienteCredito: function () {
        var clienteCredito = new clienteCreditoView({});
        this._cleanView(clienteCredito);
    },
    mercanciaBodega: function () {
        var mercanciaBodega = new mercanciaBodegaView({collection: App.productos});
        this._cleanView(mercanciaBodega);
    },
    mercanciaAfuera: function () {
        var mercanciaAfuera = new mercanciaAfueraView({collection: App.productos});
        this._cleanView(mercanciaAfuera);
    },
    displayModificarProducto: function () {
	   var modificar = new modificarProductoView({collection: App.productos});
        this._cleanView(modificar);
    },
    displayVentas: function(){
        var ventas = new ventasView({collection:App.productos});
        this._cleanView(ventas);
    },
    displayReferencias: function(){
        var referenciaBuscar = new referenciaBuscarView({collection: App.productos});
        this._cleanView(referenciaBuscar);
    },
    displayAgregarProductoNuevo: function(){
        var agregarProducto = new agregarProductoView({collection: App.productos});
        this._cleanView(agregarProducto);
    },
    _cleanView: function (view) {
        closeView(App.currentView);
        App.currentView = view;
    }
});

var router  = new MessageRouter();

$( document ).ready(function() {
        Backbone.history.start();
});

window.App.router = router;
