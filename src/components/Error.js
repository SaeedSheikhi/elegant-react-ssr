import React from "react";
import { css } from "glamor";

const rules = {
  button: css({
    border: "1px solid #a1a1a1",
    borderRadius: "50%",
    display: "flex",
    padding: "15px",
    background: "none"
  }),
  svg: css({
    fontSize: "2em"
  })
};

function Error(props) {
  return (
    <div className="centered">
      <button onClick={props.retry} className={rules.button}>
        <svg viewBox="0 0 64 64" width="1em" height="1em" className={rules.svg}>
          <path d="M32 0C14.355 0 0 14.355 0 32s14.355 32 32 32v-2C15.458 62 2 48.542 2 32S15.458 2 32 2s30 13.458 30 30c0 6.266-1.91 12.263-5.524 17.352L52 53.828V45h-2v11l1 1h11v-2h-8.344l4.292-4.293.106-.126C61.944 45.137 64 38.712 64 32 64 14.355 49.645 0 32 0z" />
        </svg>
      </button>
    </div>
  );
}

export default Error;
