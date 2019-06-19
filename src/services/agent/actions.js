export const SET_CURRENT_USER_AGENT = "agent/SET_CURRENT_USER_AGENT";
export const SET_NAVIGATOR_METADATA = "agent/SET_NAVIGATOR_METADATA";

export const setCurrentUserAgent = userAgent => ({
  type: SET_CURRENT_USER_AGENT,
  userAgent
});

export const setNavigatorMetadata = navigator => ({
  type: SET_NAVIGATOR_METADATA,
  navigator
});
