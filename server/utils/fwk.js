(function() {

    let CONFIG = getConfig();
    const MongoClient = require('mongodb').MongoClient;
    const MongoUrl = getUrlByType('mongodb');
    const Dbname = "test-products";

    const { join } = require('path')


    let MongoConnection = null;

    async function getDbClient(cb) {
        if (MongoConnection) {
            return MongoConnection.db(Dbname)
        }
        MongoConnection = await MongoClient.connect(MongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        return MongoConnection.db(Dbname)
    }

    function getUrlByType(type) {
        try {
            return CONFIG["urls"][type]
        } catch (e) {
            console.error("Exeception occured while getting url by type" + type, e)
            return null;
        }
    }

    function endDbClient() {
        //MongoConnection.close();
    }


    function getConfig() {
        return require(__dirname + '../../config/config.json');
    }


    function execute(cb, params, on_obj) {
        if (cb) {
            setImmediate(function() {
                try {
                    cb.apply(on_obj, params);
                } catch (unhandled_error) {
                    console.error('Unhandled Error while setting Immediate', unhandled_error);
                }
            });
        }
    }

    function isValidObjectId(id) {
        if (id != null && typeof id === 'string' && id.length === 24 && typeof id != undefined) {
            return true;
        } else {
            return false;
        }
    }

    /**

     * @description returns the response to the callee
     *
     * All @params are required
     *
     * @param       {object}        q                 The promise object
     * @param       {number}        response_code     The response_code
     * @param       {number}        http_code         The http code
     * @param       {map object}    response_data_map The response map object
     * @param       {string}        message           The message
     * @return      {object}        response          The response object
     */
    function resolveResponse(q, response_code, http_code, response_data_map, message) {
        var response = {
            status: http_code,
            data: {}
        };
        if (response_data_map) {
            response.data = response_data_map;
        }
        if (response_code == 0) {
            response.data["message"] = message;
        } else {
            response.data["error_message"] = message;
        }
        response.data["code"] = response_code;
        q.resolve(response);
    }

    /**
     * @description returns true if given object contains the given keys otherwise return false
     *
     * All @params are required
     *
     * @param       {object}        obj               Complex object where we need to find the keys
     * @param       {string}        keys              Dot seperated string which contains key which need to find on given complex obj
     * @return      {object}        boolean           Boolean flag(true/false) to indicates if keys found or not
     */
    function hasProperty(obj, keys) {
        return keys.split(".").every(function(key) {
            if (typeof obj != "object" || obj === null || !(key in obj)) {
                return false;
            }
            obj = obj[key];
            return true;
        });
    }



    return exports.fwk = {
        execute: execute,
        ObjectID: require('mongodb').ObjectID,
        getDbClient: getDbClient,
        endDbClient: endDbClient,
        config: CONFIG,
        db: require('../db').db,
        isValidObjectId: isValidObjectId,
        resolveResponse: resolveResponse,
        _: require("underscore")
    };
})();