(function() {
    function get(query_parameters, selected_fields, options, fwk, cb) {
        fwk.getDbClient().then((client) => {
            var websites = client.collection('websites');
            websites.find(query_parameters, selected_fields).toArray(function(err, websites) {
                if (err) {
                    console.error('Error occurred while getting websites details. Query parameters: ', query_parameters, " Error: ", err);
                    fwk.endDbClient(client);
                    fwk.execute(cb, [err, null]);
                } else {
                    fwk.endDbClient(client);
                    if (websites && websites.length > 0) {
                        fwk.execute(cb, [null, websites]);
                    } else {
                        fwk.execute(cb, [err, null]);
                    }
                }
            });
        }, (error) => {
            fwk.endDbClient(client);
            console.error("Mongodb Client Error: db.websites: get: Error Message: Error occurred while getting mongodb client: Error: " + err);
            fwk.execute(cb, [error, null]);
        }).catch((exc) => {})
    }

    return exports.Websites = {
        get: get
    }
})();