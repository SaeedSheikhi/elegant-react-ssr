import { SET_CURRENT_USER_AGENT, SET_NAVIGATOR_METADATA } from "./actions";

const initialState = {
  userAgent: "",
  metadata: {
    safari: false,
    ios: false,
    standalone: false
  }
};

export default function(state = initialState, action = {}) {
  switch (action.type) {
    case SET_CURRENT_USER_AGENT: {
      return {
        ...state,
        userAgent: action.userAgent
      };
    }
    case SET_NAVIGATOR_METADATA: {
      return {
        ...state,
        metadata: {
          ...state.metadata,
          safari: /safari/i.test(action.navigator.userAgent) || false,
          ios: /iphone|ipod|ipad/i.test(action.navigator.userAgent) || false,
          standalone: action.navigator.standalone || false
        }
      };
    }
    default:
      return state;
  }
}
