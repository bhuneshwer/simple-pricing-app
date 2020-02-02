(function() {

    /*
    Expected Parameters:
        -rqst.query.limit - optional - number - limiting the numbers of the data
        -rqst.query.page_number - required - skipping number of data
        -rqst.query.website_id
    */

    function execute(rqst, q, fwk) {
        if (!rqst.query.website_id) {
            fwk.resolveResponse(q, 1, 200, { error_message: "Required Parameters are not available" }, "Required Parameters are not available");
        } else {

            let query_params = {
                "website_id": new fwk.ObjectID.createFromHexString(rqst.query.website_id.toString()),
            }

            let options = {
                "page_number": !isNaN(rqst.query.page_number) ? rqst.query.page_number : 1,
                "limit": !isNaN(rqst.query.limit) ? parseInt(rqst.query.limit) : 20
            }

            fwk.db.Categories.get(query_params, {}, options, fwk, (err, categories) => {
                if (categories && categories.length) {
                    fwk.resolveResponse(q, 0, 200, { "categories": categories }, "Success");
                } else {
                    fwk.resolveResponse(q, 0, 200, { "categories": [] }, "Success");
                }
            })
        }
    }

    exports.execute = execute;
})()