import React from "react";
import classnames from "classnames";
import { css } from "glamor";
//
import isLtr from "../helpers/isLtr";

const rules = {
  parent: css({
    position: "relative",
    paddingBottom: "2rem",
    " *": {
      transition: "all 0.3s"
    }
  }),
  isClamped: css({
    maxHeight: "6.5em"
  }),
  notClamped: css({
    maxHeight: "1000em"
  }),
  mask: css({
    background:
      "linear-gradient(to top, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.3))",
    position: "absolute",
    bottom: "2rem",
    height: "3em",
    width: "100%",
    left: "0",
    right: "0"
  }),
  more: css({
    position: "absolute",
    padding: "0",
    border: "none",
    background: "none",
    color: "#007bfb",
    bottom: "0",
    left: "0",
    zIndex: "1"
  })
};

class Clamper extends React.Component {
  state = { isClamped: true };

  render() {
    const { isClamped } = this.state;
    const { description, title, height = "md" } = this.props;
    rules.isClamped = css({
      maxHeight:
        (height === "sm" && "3.5em") || (height === "md" && "6.5em") || "15.5em"
    });
    return (
      <div
        className={classnames(`text-pre-line w-100 ${rules.parent}`)}
        dir="auto"
      >
        {title}
        {isClamped && <span className={`mask ${rules.mask}`} />}
        <span
          className={classnames("d-block overflow-hidden", {
            [rules.isClamped]: isClamped,
            [rules.notClamped]: !isClamped
          })}
        >
          {description}
        </span>
        <button
          className={`${rules.more}`}
          onClick={e => {
            e.preventDefault();
            this.setState(prevState => ({ isClamped: !prevState.isClamped }));
          }}
        >
          {isClamped && "بیشتر"}
          {!isClamped && "کمتر"}
        </button>
      </div>
    );
  }
}

export default Clamper;
