(function() {
    function get(query_parameters, selected_fields, options, fwk, cb) {
        fwk.getDbClient().then((client) => {
            var brands = client.collection('brands');
            brands.find(query_parameters, selected_fields).toArray(function(err, brands) {
                if (err) {
                    console.error('Error occurred while getting brands details. Query parameters: ', query_parameters, " Error: ", err);
                    fwk.endDbClient(client);
                    fwk.execute(cb, [err, null]);
                } else {
                    fwk.endDbClient(client);
                    if (brands && brands.length > 0) {
                        fwk.execute(cb, [null, brands]);
                    } else {
                        fwk.execute(cb, [err, null]);
                    }
                }
            });
        }, (error) => {
            fwk.endDbClient(client);
            console.error("Mongodb Client Error: db.brands: get: Error Message: Error occurred while getting mongodb client: Error: " + err);
            fwk.execute(cb, [error, null]);
        }).catch((exc) => {})
    }

    function create(brand, fwk, cb) {
        fwk.getDbClient().then((client) => {
            let brands = client.collection('brands');
            brands.insert(brand, function(err, brands) {
                if (err) {
                    console.error('Error while creating brand', err);
                    fwk.execute(cb, [err, null]);
                } else {
                    fwk.execute(cb, [null, brands]);
                }
            });
        }, (error) => {
            fwk.endDbClient(client);
            console.error('Error getting database client. ${error}');
            fwk.execute(cb, [error, null]);
        }).catch((exc) => {

        })

    }

    return exports.Brands = {
        create: create,
        get: get
    }
})();