import React, { Component } from "react";
import { connect } from "react-redux";
import Transition from "react-transition-group/Transition";
import Loadable from "react-loadable";

import LoadingBar from "../../../components/LoadingBar";

import { hideModal } from "../services/actions";

const LoadableShareLink = Loadable({
  loader: () => import("./ShareLink"),
  loading: LoadingBar
});

const LoadableAlert = Loadable({
  loader: () => import("./Alert"),
  loading: LoadingBar
});

const transitionWrapper = (children, inProp) => (
  <Transition
    in={inProp}
    mountOnEnter
    unmountOnExit
    timeout={{
      enter: 0,
      exit: 350
    }}
  >
    {children}
  </Transition>
);
class ModalContainer extends Component {
  render() {
    const {
      hideModal,
      modal: { visible, onProcessDone }
    } = this.props;

    return (
      <div>
        {visible && <style>{"html,body {overflow-y:hidden}"}</style>}

        {transitionWrapper(
          <LoadableShareLink
            visible={visible === "shareLink"}
            onClose={hideModal}
            onProcessDone={onProcessDone}
          />,
          visible === "shareLink"
        )}
        {transitionWrapper(
          <LoadableAlert
            visible={visible === "alert"}
            onClose={hideModal}
            onProcessDone={onProcessDone}
          />,
          visible === "alert"
        )}
      </div>
    );
  }
}

function mapStateToProps({ modal }) {
  return { modal };
}
export default connect(
  mapStateToProps,
  { hideModal }
)(ModalContainer);
