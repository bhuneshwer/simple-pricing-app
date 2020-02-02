(function() {

    /*
    Expected Parameters:
        -rqst.query.limit - optional - number - limiting the numbers of the data
        -rqst.query.page_number - required - skipping number of data
    */

    function execute(rqst, q, fwk) {

        let query_params = {

        }
        let options = {
            "page_number": !isNaN(rqst.query.page_number) ? rqst.query.page_number : 1,
            "limit": !isNaN(rqst.query.limit) ? parseInt(rqst.query.limit) : 20
        }


        fwk.db.Websites.get(query_params, {}, options, fwk, (err, websites) => {
            if (websites && websites.length) {
                fwk.resolveResponse(q, 0, 200, { "websites": websites }, "Success");
            } else {
                fwk.resolveResponse(q, 0, 200, { "websites": [] }, "Success");
            }
        })
    }

    exports.execute = execute;
})()