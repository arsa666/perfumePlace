window.App = {

};

var MessageRouter = Backbone.Router.extend({
    initialize:function(){
        App.productos = new productoCollection();
        App.productos.fetch();
    },
    routes:{
        "": "displayMenu",
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
    mercanciaBodega: function () {
	$('#main').empty();
        var mercanciaBodega = new mercanciaBodegaView({collection: App.productos});
        $('#main').html(mercanciaBodega.render().el);
    },
    mercanciaAfuera: function () {
        $('#main').empty();
        var mercanciaAfuera = new mercanciaAfueraView({collection: App.productos});
        $('#main').html(mercanciaAfuera.render().el);
    },
    displayModificarProducto: function () {
	$('#main').empty();
	var modificar = new modificarProductoView({collection: App.productos});
	$('#main').html(modificar.render().el);
    },
    displayMenu: function() {
        $('#main').empty();        
        var menu = new menuView({});
        $('#main').html(menu.render().el);        
    },
    displayVentas: function(){
	$('#main').empty();        
        var ventas = new ventasView({collection:App.productos});
        $('#main').html(ventas.render().el);        
    },
    displayReferencias: function(){
        $('#main').empty();        
        var referenciaBuscar = new referenciaBuscarView({collection: App.productos});
        $('#main').html(referenciaBuscar.render().el);
    },
    displayAgregarProductoNuevo: function(){
        $('#main').empty();
        var agregarProducto = new agregarProductoView({collection: App.productos}); 
        $('#main').html(agregarProducto.render().el);
    }

});

var router  = new MessageRouter();

$( document ).ready(function() {
        Backbone.history.start();
});

window.App.router = router;
