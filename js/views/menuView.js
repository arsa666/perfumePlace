var menuView = Backbone.View.extend({
    events: {
    },
    className: 'menu-view',
    render: function (eventName) {
    	self = this;

        $.get('js/templates/menuTemplate.html', function (data) {

            template = _.template($(data).html(), {});//Option to pass any dynamic values to template
            self.$el.html(template);//adding the template content to the main template.
            $('#menu').html(self.$el.html());

        }, 'html');

        return this;
    }
});