import React from "react";
import Rodal from "rodal";
import { css, after } from "glamor";

const modalStyle = {
  dialog: {
    width: "22em",
    borderRadius: "15px",
    maxWidth: "330px",
    padding: "0",
    marginRight: "20px",
    marginLeft: "20px"
  }
};
const rules = {
  img: css({
    maxWidth: "150px",
    minWidth: "75px",
    marginTop: "-35px",
    border: "5px solid white",
    borderRadius: "50%",
    backgroundColor: "white"
  }),
  divider: css({ borderTop: "1px solid #e6e6e6 !important" })
};

function Alert({
  visible,
  onClose,
  afterOnClose,
  onAccept,
  onCancel,
  icon,
  title,
  cancelText,
  acceptText,
  alert,
  description
}) {
  return (
    <Rodal
      customStyles={modalStyle.dialog}
      visible={visible}
      onClose={() => {
        onClose();
        afterOnClose && afterOnClose();
      }}
      showCloseButton={false}
      duration={350}
    >
      <div className="text-center">
        {visible && <style>{"html, body, .rodal {overflow-y:hidden}"}</style>}
        <img className={`${rules.img} w-25`} src={icon} alt="icon" />

        <div className="py-4">
          <h2 className="text-black mb-3">{title}</h2>
          {alert && <div className="h3 mb-0">{alert}</div>}
          <div className="px-4 h3 mb-0">{description}</div>
        </div>

        {!onCancel && !onAccept && (
          <button
            className={`${
              rules.divider
            } btn-ahref btn-block font-weight-medium`}
            {...css({ padding: "0.6rem 0 0.7rem 0 !important" })}
            onClick={onClose}
          >
            {acceptText || "باشه"}
          </button>
        )}

        {(onCancel || onAccept) && (
          <div>
            <button
              className={`${
                rules.divider
              } btn-clean text-muted font-weight-medium divider-left w-50`}
              {...css({ padding: "0.6rem 0 0.7rem 0 !important" })}
              onClick={() => {
                onClose();
                if (onCancel) onCancel();
              }}
            >
              {cancelText || "بستن"}
            </button>

            <button
              className={`${
                rules.divider
              } btn-clean text-primary font-weight-medium w-50`}
              {...css({ padding: "0.6rem 0 0.7rem 0 !important" })}
              onClick={() => {
                onClose();
                if (onAccept) onAccept();
              }}
            >
              {acceptText || "باشه"}
            </button>
          </div>
        )}
      </div>
    </Rodal>
  );
}

export default Alert;
