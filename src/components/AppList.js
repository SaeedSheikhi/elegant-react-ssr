import React from "react";
import { Link, withRouter } from "react-router-dom";
import classnames from "classnames";
import { lastOfType, css } from "glamor";
import { isNull } from "util";
import moment from "moment";

import isLtr from "../helpers/isLtr";

import Clamper from "./Clamper";
import addSizePrefix from "../utils/addSizePrefix";
import toPersianDigits from "../utils/toPersianDigits";

const rules = {
  icon: css({
    borderRadius: "22.5%",
    border: "1px solid rgba(0,0,0,.1)"
  })
};

const renderDivider = (application, showLastUpdate) => {
  if (!showLastUpdate) {
    return (
      <div className="row no-gutters my-1">
        <div className="col-3" />
        <div className="col-9 divider-bottom" />
      </div>
    );
  }

  if (application.versions[application.versions.length - 1].changes) {
    return (
      <div className="row no-gutters mt-2 mb-3">
        <div className="col-12 divider-bottom" />
      </div>
    );
  }
  return (
    <div className="row no-gutters my-1">
      <div className="col-3" />
      <div className="col-9 divider-bottom" />
    </div>
  );
};

function AppList({
  applications,
  showLastUpdate = false,
  showPurchaseDate = false,
  purchaseDates,
  onClick,
  isResponsive = true,
  match: {
    params: { OSType }
  }
}) {
  if (isNull(applications)) return "loading...";
  return (
    <div className="row">
      {applications.map((application, appIndex) => {
        return (
          <div
            className={classnames("col-12", {
              "col-md-6 col-lg-4": isResponsive
            })}
            key={application.id}
            to={`/${OSType}/app/${application.id}`}
            {...lastOfType({
              " .col-9.divider-bottom": { display: "none" }
            })}
            onClick={e => {
              if (onClick) onClick(e, application);
            }}
          >
            <div className="row no-gutters">
              <div className="col-3">
                <img
                  src={`${
                    process.env.REACT_APP_STATIC_URL
                  }/applications/photos/${application.id}/${
                    application.photos.icon.filename
                  }`}
                  className={`img-fluid w-80 ${rules.icon}`}
                  alt={application.name}
                />
              </div>
              <div className="col-9 d-flex justify-content-between align-items-center">
                <div className="pl-3 overflow-hidden">
                  <h2
                    className={classnames(
                      "text-black mb-0 text-truncate font-weight-normal",
                      {
                        ltr: isLtr(application.name)
                      }
                    )}
                  >
                    {application.name}
                  </h2>

                  {!showLastUpdate && !showPurchaseDate && (
                    <h3 className="text-muted text-truncate mb-0">
                      {application.content.subtitle}
                    </h3>
                  )}
                  {showLastUpdate && (
                    <h3 className="text-muted text-truncate mb-0">
                      {moment(
                        application.versions[application.versions.length - 1]
                          .createdAt
                      ).fromNow()}
                    </h3>
                  )}
                  {showPurchaseDate && (
                    <h3 className="text-muted text-truncate mb-0">
                      {moment(purchaseDates[appIndex]).fromNow()}
                    </h3>
                  )}
                </div>
              </div>
              {showLastUpdate &&
                application.versions[application.versions.length - 1]
                  .changes && (
                  <div className="text-black mt-2 w-100">
                    <Clamper
                      description={
                        <React.Fragment>
                          <p>
                            {
                              application.versions[
                                application.versions.length - 1
                              ].changes
                            }
                          </p>
                          <h3>
                            نسخه{" "}
                            {toPersianDigits(
                              application.versions[
                                application.versions.length - 1
                              ].number
                            )}{" "}
                            •{" "}
                            {
                              addSizePrefix(
                                application.versions[
                                  application.versions.length - 1
                                ].ipa.size
                              ).size
                            }
                          </h3>
                        </React.Fragment>
                      }
                      height="sm"
                    />
                  </div>
                )}
            </div>
            {renderDivider(application, showLastUpdate)}
          </div>
        );
      })}
    </div>
  );
}

export default withRouter(AppList);
