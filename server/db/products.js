(function() {
    function get(query_parameters, selected_fields, options, fwk, cb) {
        fwk.getDbClient().then((client) => {
            var products = client.collection('products');
            products.find(query_parameters, selected_fields).toArray(function(err, products) {
                if (err) {
                    console.error('Error occurred while getting products details. Query parameters: ', query_parameters, " Error: ", err);
                    fwk.endDbClient(client);
                    fwk.execute(cb, [err, null]);
                } else {
                    fwk.endDbClient(client);
                    if (products && products.length > 0) {
                        fwk.execute(cb, [null, products]);
                    } else {
                        fwk.execute(cb, [err, null]);
                    }
                }
            });
        }, (error) => {
            fwk.endDbClient(client);
            console.error("Mongodb Client Error: db.products: get: Error Message: Error occurred while getting mongodb client: Error: " + err);
            fwk.execute(cb, [error, null]);
        }).catch((exc) => {})
    }

    return exports.Products = {
        get: get
    }
})();