var menuView = Backbone.View.extend({
    initialize: function () {
        var self = this;
        this.render();
        Backbone.history.bind("all", function () {
            self.selectItem();
        });


    },
    events: {
    	//'click .menuItem': 'selectItem',
    },
    selectItem: function (event) {
        var url = Backbone.history.fragment;
        $('.header').find('.active').removeClass("active");
        var url = "#" + url;
        $('.header').find('a[href="'+url+'"]').addClass("active");

    },
    render: function (eventName) {
    	self = this;

        $.get('js/templates/menuTemplate.html', function (data) {

            template = _.template($(data).html(), {});//Option to pass any dynamic values to template
            self.$el.html(template);//adding the template content to the main template.
            $('#main').html(self.$el.html());
        }, 'html');

        return this;
    }
});