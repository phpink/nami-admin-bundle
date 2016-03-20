App.service('paginator', function() {
	"use strict";

	return {
		limit : 20,
		count : 0,
		offset : 0,
		displayed : 4,
        pages: [],

		current : function() {
			return (this.offset / this.limit) + 1;
		},
		nbpage : function() {
			return Math.ceil(this.count / this.limit);
		},
		first : function() {
			return Math.max(1, this.current() - this.displayed)
		},
		last : function() {
			return Math.min(this.nbpage(), this.current() + this.displayed)
		},
        renderPages : function() {
            this.pages = [];
            for (var i=this.first(); i<=this.last(); i++) {
                this.pages.push(i);
            };
        },
        setCount: function(count) {
            this.count = count;
            this.renderPages();
        }
	};

});