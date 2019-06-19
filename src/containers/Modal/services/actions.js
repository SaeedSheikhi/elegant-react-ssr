export const SET_MODAL_PARAMS = 'set_modal_params';
export const HIDE_MODAL = 'hide_modal';

export const setModalParams = params => ({
  type: SET_MODAL_PARAMS,
  ...params,
});

export const hideModal = () => ({ type: HIDE_MODAL });
