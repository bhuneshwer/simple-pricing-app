(function() {

    /*
    Expected Parameters:
    
    */

    function execute(rqst, q, fwk) {
        if (rqst.body.name && rqst.body.website_id) {
            let brand_data = {
                "name": rqst.body.name,
                "website_id": rqst.body.website_id,
                "created_date": new Date()
            }

            fwk.db.Brands.create(brand_data, fwk, (err, data) => {
                fwk.resolveResponse(q, 0, 200, {
                    "_id": data && data.insertedId ? data.insertedId : null
                }, "Success");
            })
        } else {
            fwk.resolveResponse(q, 1, 200, { error_message: "Required Parameters are not available" }, "Required Parameters are not available");

        }
        exports.execute = execute;
    }
})()