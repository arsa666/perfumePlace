var ultimaVentaView = Backbone.View.extend({
    initialize: function (options) {
       // this.model = options.model
    },
    className: 'ultima-venta-view',
	events:{
	'click .template': 'templateFunc'
	},
	templateFunc: function(){
	},
    render:function() {
    	self = this;
    	 $.get('js/templates/ultimaVentaViewTemplate.html', function (data) {
            template = _.template($(data).html(), {model:self.model});
            self.$el.html(template);
        }, 'html');

        return this;
    }
});