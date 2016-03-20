App.filter('active', function() {
    return function(active) {
    	if (active) {
            return '<span class="badge badge-success">Oui</span>';

        } else {
        	return '<span class="badge badge-danger">Non</span>';
        }
    }
});