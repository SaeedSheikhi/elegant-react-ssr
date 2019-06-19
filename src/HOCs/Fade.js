import React from "react";
import { css } from "glamor";
import classnames from "classnames";

const fadeIn = css.keyframes("fadeIn", {
  from: {
    opacity: "0"
  },
  to: {
    opacity: "1"
  }
});

const Fade = ({ className, children }) => (
  <div
    className={classnames(
      `${css({
        animation: `${fadeIn} 0.5s`
      })}`,
      {
        [className]: className
      }
    )}
  >
    {children}
  </div>
);

export default Fade;
