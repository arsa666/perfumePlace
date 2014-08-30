var menuView = Backbone.View.extend({
    initialize: function () {

    },
    events: {
    	'click .menuItem': 'selectItem',
    },
    className: 'menu-view',
    selectItem: function (event) {
        debugger;
    },
    render:function (eventName) {
    	self = this;
    	 $.get('js/templates/menuTemplate.html', function (data) {
            template = _.template($(data).html(), {});//Option to pass any dynamic values to template
            self.$el.html(template);//adding the template content to the main template.
            $('#menu').html(self.$el.html());
        }, 'html');

        return this;
    }
});