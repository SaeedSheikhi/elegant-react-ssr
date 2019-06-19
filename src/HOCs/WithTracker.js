import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import GoogleAnalytics from "react-ga";

GoogleAnalytics.initialize(process.env.REACT_APP_UA_TRACKING_NUMBER); // Unique Google Analytics tracking number

class WithTracker extends Component {
  constructor(props) {
    super(props);
    this.trackPage = this.trackPage.bind(this);
  }
  trackPage(page) {
    const { options = {} } = this.props;
    GoogleAnalytics.set({
      page,
      ...options
    });
    GoogleAnalytics.pageview(page);
  }
  componentDidMount() {
    const page = this.props.location.pathname;
    this.trackPage(page);
  }

  componentWillReceiveProps(nextProps) {
    const currentPage = this.props.location.pathname;
    const nextPage = nextProps.location.pathname;

    if (currentPage !== nextPage) {
      this.trackPage(nextPage);
    }
  }

  render() {
    return this.props.children;
  }
}

export default withRouter(WithTracker);
