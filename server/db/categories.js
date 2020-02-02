(function() {
    function get(query_parameters, selected_fields, options, fwk, cb) {
        fwk.getDbClient().then((client) => {
            var categories = client.collection('categories');
            categories.find(query_parameters, selected_fields).toArray(function(err, categories) {
                if (err) {
                    console.error('Error occurred while getting categories details. Query parameters: ', query_parameters, " Error: ", err);
                    fwk.endDbClient(client);
                    fwk.execute(cb, [err, null]);
                } else {
                    fwk.endDbClient(client);
                    if (categories && categories.length > 0) {
                        fwk.execute(cb, [null, categories]);
                    } else {
                        fwk.execute(cb, [err, null]);
                    }
                }
            });
        }, (error) => {
            fwk.endDbClient(client);
            console.error("Mongodb Client Error: db.categories: get: Error Message: Error occurred while getting mongodb client: Error: " + err);
            fwk.execute(cb, [error, null]);
        }).catch((exc) => {})
    }

    return exports.Categories = {
        get: get
    }
})();