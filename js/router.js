window.App = {

};

var MessageRouter = Backbone.Router.extend({
    initialize:function(){
        App.productos = new productoCollection();
        App.productos.fetch();
        App.views = new Array();
        App.currentView;
        $('#main').empty();   
        var menu = new menuView({});
        $('#main').html(menu.render().el);     
    },
    routes:{
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
