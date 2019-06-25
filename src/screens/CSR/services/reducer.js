import { FETCH_APPLICATIONS, FETCH_MORE_APPLICATIONS } from "./actions";

const initialState = {
  query: { query: { match: { status: "ready-for-sale" } } },
  options: {
    sort: {
      "versions.createdAt": {
        order: "desc",
        mode: "max"
      }
    }
  },
  applications: null,
  total: 0
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case FETCH_APPLICATIONS: {
      return {
        ...state,
        query: action.query,
        options: action.options,
        applications: payload.data.hits.hits,
        total: payload.data.hits.total.value
      };
    }

    case FETCH_MORE_APPLICATIONS: {
      return {
        ...state,
        applications: [...state.applications, ...payload.data.hits.hits]
      };
    }

    default:
      return state;
  }
};
