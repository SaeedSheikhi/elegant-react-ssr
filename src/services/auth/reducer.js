import isEmpty from "lodash/isEmpty";
import { SET_CURRENT_USER } from "./actions";

const initialState = {
  isAuthenticated: false,
  user: null
};
export default function(state = initialState, action = {}) {
  switch (action.type) {
    case SET_CURRENT_USER: {
      const { user } = action;
      return {
        isAuthenticated: !isEmpty(user),
        user
      };
    }
    default:
      return state;
  }
}
