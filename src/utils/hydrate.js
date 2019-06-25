const hydrate = hits => hits.map(hit => ({ ...hit._source, _id: hit._id }));

export default hydrate;
