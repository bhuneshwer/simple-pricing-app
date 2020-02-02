(function() {

    /*
    Expected Parameters:
        -rqst.query.limit - optional - number - limiting the numbers of the data
        -rqst.query.page_number - required - skipping number of data
        -rqst.query.brand_id
        -rqst.query.website_id
        -rqst.query.category_id
    */

    function execute(rqst, q, fwk) {
        console.log(rqst.query)
        if ((rqst.query.brand_id || rqst.query.category_id) && rqst.query.website_id) {
            let query_params = {
                "website_id": new fwk.ObjectID.createFromHexString(rqst.query.website_id.toString())
            }

            if (rqst.query.category_id) {
                query_params.category_id = new fwk.ObjectID.createFromHexString(rqst.query.category_id.toString())
            }

            if (rqst.query.brand_id) {
                query_params.brand_id = new fwk.ObjectID.createFromHexString(rqst.query.brand_id.toString())
            }


            let options = {
                "page_number": !isNaN(rqst.query.page_number) ? rqst.query.page_number : 1,
                "limit": !isNaN(rqst.query.limit) ? parseInt(rqst.query.limit) : 20
            }

            fwk.db.Products.get(query_params, {}, options, fwk, (err, products) => {
                if (products && products.length) {
                    fwk.resolveResponse(q, 0, 200, { "products": products }, "Success");
                } else {
                    fwk.resolveResponse(q, 0, 200, { "products": [] }, "Success");
                }
            })

        } else {
            fwk.resolveResponse(q, 1, 200, { error_message: "Required Parameters are not available" }, "Required Parameters are not available");
        }
    }

    exports.execute = execute;
})()