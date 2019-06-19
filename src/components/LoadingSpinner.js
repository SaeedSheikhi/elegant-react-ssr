import React from "react";
import { css } from "glamor";
import classnames from "classnames";

const spin = css.keyframes({
  "0%": {
    transform: "rotate(0deg)"
  },
  to: {
    transform: "rotate(360deg)"
  }
});

const rules = {
  spinner: css({
    backgroundImage:
      'url("data:image/png;base64,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")',
    maxWidth: "32px",
    maxHeight: "32px",
    minHeight: "20px",
    minWidth: "20px",
    backgroundSize: "100%",
    animation: `${spin} 1.2s steps(12) infinite`
  }),

  lg: css({ width: "32px", height: "32px" }),
  paddings: {
    lg: css({ paddingBottom: "12px" })
  }
};

function LoadingSpinner({ containerClass, size, ...props }) {
  return (
    <div
      className={classnames(
        "d-flex align-items-center justify-content-center",
        {
          [containerClass]: containerClass,
          [rules.paddings.lg]: size === "lg"
        }
      )}
    >
      <div
        {...props}
        className={classnames(`${rules.spinner}`, {
          [props.className]: props.className,
          [rules.lg]: size === "lg"
        })}
      />
    </div>
  );
}

export default LoadingSpinner;
