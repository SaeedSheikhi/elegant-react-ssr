import React, { Component } from "react";
import { UserAgentProvider, UserAgent } from "@quentin-sommer/react-useragent";
import { connect } from "react-redux";
import classnames from "classnames";
import { css } from "glamor";
import { Link, withRouter } from "react-router-dom";

import LayersIcon from "../../assets/svg/Layers";

const rules = {
  nav: css({
    backgroundColor: "#fff",
    border: "0",
    bottom: "0",
    height: "49px",
    left: "0",
    position: "fixed",
    right: "0",
    top: "auto",
    userSelect: "none",
    zIndex: "10",
    marginBottom: "env(safe-area-inset-bottom)"
  }),
  buttonsGroup: css({
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    height: "100%",
    ":before": {
      background: "rgba(0,0,0,.0975)",
      content: "''",
      height: "1px",
      left: "0",
      position: "absolute",
      right: "0",
      top: "-1px"
    },
    ":after": {
      backgroundColor: "#fff",
      content: "''",
      height: "env(safe-area-inset-bottom)",
      left: "0",
      position: "absolute",
      top: "48px",
      right: "0"
    }
  }),
  button: css({
    flexGrow: "1",
    height: "100%",
    justifyContent: "center",
    width: "100%"
  }),

  anchor: css({
    alignItems: "flex-end",
    display: "flex",
    height: "100%",
    justifyContent: "center",
    color: "#a1a1a1",
    " h5": {
      lineHeight: "1.2",
      fontSize: "0.7em",
      marginTop: "1.5px",
      marginBottom: "1.5px !important"
    },
    " svg": {
      width: "24px",
      height: "27px",
      fill: "#a1a1a1"
    },
    ".active": { color: "#0982fc", borderTop: "3px solid #0982fc" },
    ".active svg": {
      fill: "#0982fc"
    }
  })
};

const tabs = [
  { path: "/ssr", en: "SSR - سرورساید", fa: "سرور", component: LayersIcon },
  { path: "/csr", en: "CSR - کلاینت ساید", fa: "کلاینت", component: LayersIcon }
];

class Navigation extends Component {
  renderNavigation = () => {
    const {
      location: { pathname }
    } = this.props;

    return (
      <nav className={`navigation ${rules.nav}`}>
        <div className={rules.buttonsGroup}>
          {tabs.map(tab => (
            <div className={rules.button} key={tab.path}>
              <Link
                to={tab.path}
                className={classnames(`${rules.anchor}`, {
                  active: pathname.includes(tab.path)
                })}
              >
                <div>
                  {
                    <tab.component
                      className="d-block mx-auto"
                      fill="currentColor"
                      fillRule="evenodd"
                    />
                  }
                  <h5 className="mx-auto">{tab.en}</h5>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </nav>
    );
  };
  render() {
    return (
      <UserAgentProvider ua={this.props.userAgent}>
        <UserAgent mobile tablet computer>
          {this.renderNavigation()}
        </UserAgent>
      </UserAgentProvider>
    );
  }
}

function mapStateToProps({ agent: { userAgent, metadata } }) {
  return { userAgent, metadata };
}
export default withRouter(connect(mapStateToProps)(Navigation));
