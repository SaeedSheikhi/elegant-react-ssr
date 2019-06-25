import React from "react";
import { connect } from "react-redux";
import InfiniteScroll from "react-infinite-scroller";

import AppList from "../../components/AppList";
import LoadingLine from "../../components/LoadingLine";
import SEO from "../../helpers/SEO";

import { fetchApplications, fetchMoreApplications } from "./services/actions";
import LoadingSpinner from "../../components/LoadingSpinner";

class SSR extends React.Component {
  componentDidMount() {
    this.loadAsyncData();
  }

  loadAsyncData = () => {
    const {
      csr: { applications }
    } = this.props;
    let {
      csr: { query, options }
    } = this.props;

    return this.props.fetchApplications(query, {
      ...options,
      size: (applications && applications.length) || 6
    });
  };

  loadMore = () => {
    const {
      csr: { applications, query, options }
    } = this.props;

    this.props.fetchMoreApplications(query, {
      ...options,
      from: applications.length,
      size: 10
    });
  };

  render() {
    const {
      csr: { applications, total }
    } = this.props;
    if (!applications)
      return (
        <div className="centered">
          <LoadingSpinner style={{ width: "32px", height: "32px" }} />
          <h2 className="mt-2 mb-0">Loading Content</h2>
        </div>
      );
    return (
      <div className="container mt-3">
        <SEO title="Client Side Render" />
        <InfiniteScroll
          loadMore={this.loadMore}
          hasMore={applications && total > applications.length}
          loader={
            <div className="d-flex justify-content-center py-5" key="loading">
              <LoadingLine />
            </div>
          }
        >
          <AppList applications={applications} showLastUpdate />
        </InfiniteScroll>
      </div>
    );
  }
}

function mapStateToProps({ csr }) {
  return { csr };
}
export default connect(
  mapStateToProps,
  { fetchApplications, fetchMoreApplications }
)(SSR);
