const ElasticAppSearch = require('@elastic/app-search-javascript');

export const client = ElasticAppSearch.createClient({
  searchKey: 'search-i7d2p71wv2kyuf99qvfjrf4u',
  endpointBase: 'https://project-zone.ent.asia-south1.gcp.elastic-cloud.com',
  engineName: 'project-zone',
});

export const options = {
  search_fields: {
    skills: {},
    description: {},
    name: {},
  },
  page: {
    current: 1,
    size: 100,
  },
};