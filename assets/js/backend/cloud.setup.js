/**
 * cloud.setup.js
 *
 * Configuration for this Sails app's generated browser SDK ("Cloud").
 *
 * Above all, the purpose of this file is to provide endpoint definitions,
 * each of which corresponds with one particular route+action on the server.
 *
 * > This file was automatically generated.
 * > (To regenerate, run `sails run rebuild-cloud-sdk`)
 */
Cloud.setup({
    methods: {
        //LOGIN
        "login": {
            "verb": "PUT",
            "url": "/api/entrance/login",
            "args": ["emailAddress", "password"]
        },
        //-------------------------LOGIN---------------- 
        "buyProduct": {
            "verb": "POST",
            "url": "/api/product/buy",
            "args": []
        },
        "addCart": {
            "verb": "GET",
            "url": "/api/addCart/:id",
            "args": ["id"]
        },
        "checkCart": {
            "verb": "GET",
            "url": "/api/checkCart",
            "args": []
        },
        "delCart": {
            "verb": "GET",
            "url": "/api/delCart/:id",
            "args": ["id"]
        },
    }
})