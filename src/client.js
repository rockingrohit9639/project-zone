var ElasticAppSearch = require("@elastic/app-search-javascript");

var client = ElasticAppSearch.createClient({
    searchKey: "search-i7d2p71wv2kyuf99qvfjrf4u",
    endpointBase: "https://project-zone.ent.asia-south1.gcp.elastic-cloud.com",
    engineName: "project-zone"
});

module.exports = client;