window.onload = function () {
    Backbone.history.navigate("", {trigger:true});
}; 

window.App = {};

var MessageRouter = Backbone.Router.extend({
    initialize:function(){
        App.productos = new productoCollection();
        App.productos.fetch();
        //App.views = new Array();
        App.currentView;
        $('#main').empty();
        // Backbone.history.bind("all", function () {
        //     var url = Backbone.history.fragment;
        //     if (!_.isUndefined(App.menuView)) {
        //         App.menuView.$el.find('.active').removeClass("active");
        //         var url = "#/" + url;
        //         App.menuView.$el.find('a[href="'+url+'"]').addClass("active");
        //     }

        // });
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
    clienteCredito: function () {
        closeView(App.currentView);
        var clienteCredito = new clienteCreditoView({});
        App.currentView = clienteCredito;
        $('#main').append(clienteCredito.render().el);
    },
    menuDisplay: function () {
        App.menuView = new menuView({});
        $('#main').html(App.menuView.render().el);
    },
    mercanciaBodega: function () {	
        closeView(App.currentView);
        var mercanciaBodega = new mercanciaBodegaView({collection: App.productos});
        App.currentView = mercanciaBodega;
        $('#main').append(mercanciaBodega.render().el);
    },
    mercanciaAfuera: function () {
        closeView(App.currentView);

        var mercanciaAfuera = new mercanciaAfueraView({collection: App.productos});
        App.currentView = mercanciaAfuera;
        $('#main').append(mercanciaAfuera.render().el);
    },
    displayModificarProducto: function () {
        closeView(App.currentView);

	var modificar = new modificarProductoView({collection: App.productos});
        App.currentView = modificar;    
	$('#main').append(modificar.render().el);
    },
    displayVentas: function(){	        
        closeView(App.currentView);

        var ventas = new ventasView({collection:App.productos});
        App.currentView = ventas;        
        $('#main').append(ventas.render().el);        
    },
    displayReferencias: function(){     
        closeView(App.currentView);

        var referenciaBuscar = new referenciaBuscarView({collection: App.productos});
        App.currentView = referenciaBuscar;        
        $('#main').append(referenciaBuscar.render().el);
    },
    displayAgregarProductoNuevo: function(){ 
        closeView(App.currentView);

        var agregarProducto = new agregarProductoView({collection: App.productos});
        App.currentView = agregarProducto;
        $('#main').append(agregarProducto.render().el);
    }

});

var router  = new MessageRouter();

$( document ).ready(function() {
        Backbone.history.start();
});

window.App.router = router;
