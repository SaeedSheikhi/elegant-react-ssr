import { postListApplications } from "./api";
import hydrate from "../../../utils/hydrate";

export const FETCH_APPLICATIONS = "updates/applications/FETCH";
export const FETCH_MORE_APPLICATIONS = "updates/applications/FETCH_MORE";

export const fetchApplications = (query, options) => async dispatch => {
  let value;
  let payload;

  // eslint-disable-next-line
  ({ value } = await dispatch({
    payload: postListApplications({ ...query, ...options })
  }));

  // eslint-disable-next-line
  payload = value;
  payload.data.hits.hits = hydrate(value.data.hits.hits);

  dispatch({
    type: FETCH_APPLICATIONS,
    query,
    options,
    payload
  });
};

export const fetchMoreApplications = (query, options) => async dispatch => {
  let value;
  let payload;

  // eslint-disable-next-line
  ({ value } = await dispatch({
    payload: postListApplications({ ...query, ...options })
  }));

  // eslint-disable-next-line
  payload = value;
  payload.data.hits.hits = hydrate(value.data.hits.hits);

  dispatch({
    type: FETCH_MORE_APPLICATIONS,
    payload
  });
};
