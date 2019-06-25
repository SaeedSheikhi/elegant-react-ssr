import { combineReducers } from "redux";
import { reducer as reduxForm } from "redux-form";
import { loadingBarReducer } from "react-redux-loading-bar";
import authReducer from "./auth/reducer";
import agentReducer from "./agent/reducer";
import ssrReducer from "../screens/SSR/services/reducer";
import csrReducer from "../screens/CSR/services/reducer";
import modalReducer from "../containers/Modal/services/reducer";

export default combineReducers({
  auth: authReducer,
  agent: agentReducer,
  form: reduxForm,
  loadingBar: loadingBarReducer,
  ssr: ssrReducer,
  csr: csrReducer,
  modal: modalReducer
});
