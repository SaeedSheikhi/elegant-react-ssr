import React from "react";
import { connect } from "react-redux";
import InfiniteScroll from "react-infinite-scroller";
import { frontloadConnect } from "react-frontload";

import AppList from "../../components/AppList";
import LoadingLine from "../../components/LoadingLine";
import SEO from "../../helpers/SEO";

import { fetchApplications, fetchMoreApplications } from "./services/actions";
import LoadingSpinner from "../../components/LoadingSpinner";

const frontload = async props => {
  const {
    ssr: { applications }
  } = props;
  let {
    ssr: { query, options }
  } = props;

  return props.fetchApplications(query, {
    ...options,
    size: (applications && applications.length) || 6
  });
};

class SSR extends React.Component {
  loadMore = () => {
    const {
      ssr: { applications, query, options }
    } = this.props;

    this.props.fetchMoreApplications(query, {
      ...options,
      from: applications.length,
      size: 10
    });
  };

  render() {
    const {
      ssr: { applications, total }
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
        <SEO title="Server Side Render" />
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

function mapStateToProps({ ssr }) {
  return { ssr };
}

export default connect(
  mapStateToProps,
  { fetchApplications, fetchMoreApplications }
)(frontloadConnect(frontload)(SSR));
