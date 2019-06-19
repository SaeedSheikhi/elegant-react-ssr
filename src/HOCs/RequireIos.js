import React, { Component } from "react";
import { connect } from "react-redux";
import { UserAgentProvider, UserAgent } from "@quentin-sommer/react-useragent";

const vendorRegExp = new RegExp(/Apple Computer, Inc./);

class RequireIos extends Component {
  state = {
    vendorIsApple: false
  };

  componentDidMount() {
    // eslint-disable-next-line
    this.setState({
      vendorIsApple:
        process.env.NODE_ENV === "development" ||
        vendorRegExp.test(navigator.vendor)
    });
  }

  render() {
    const { vendorIsApple } = this.state;
    return (
      <UserAgentProvider ua={this.props.userAgent}>
        <UserAgent ios>
          {uaIsIos =>
            (uaIsIos && vendorIsApple && this.props.children) ||
            (this.props.placeholder || <div />)
          }
        </UserAgent>
      </UserAgentProvider>
    );
  }
}

const mapStateToProps = ({ agent: { userAgent } }) => ({ userAgent });

export default connect(mapStateToProps)(RequireIos);
