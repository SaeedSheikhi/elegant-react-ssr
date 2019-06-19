import { SET_MODAL_PARAMS, HIDE_MODAL } from './actions';

const initialState = {
  props: null,
  visible: null,
  onProcessDone: null,
  lastSubmission: null,
};
export default (state = initialState, action) => {
  switch (action.type) {
  case SET_MODAL_PARAMS:
    return {
      props: action.props,
      visible: action.target,
      onProcessDone: action.onProcessDone,
    };

  case HIDE_MODAL:
    return { ...state, visible: initialState.visible };
  default:
    return state;
  }
};
