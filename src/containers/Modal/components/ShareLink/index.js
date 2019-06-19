import React, { Component } from "react";
import { css } from "glamor";
import Rodal from "rodal";
import classnames from "classnames";
import { connect } from "react-redux";
import { CopyToClipboard } from "react-copy-to-clipboard";
//
import FacebookIcon from "../../../../assets/svg/Facebook";
import TwitterIcon from "../../../../assets/svg/Twitter";
import TelegramIcon from "../../../../assets/svg/Telegram";
import LinkedinIcon from "../../../../assets/svg/Linkedin";
import CopyIcon from "../../../../assets/svg/Copy";
//
import { setModalParams } from "../../services/actions";

const modalStyle = {
  mask: {
    padding: "0"
  },
  dialog: {
    width: "500px"
  }
};

const rules = {
  rodal: css({
    padding: "0 !important"
  }),
  dialog: css({
    " .rodal-dialog": {
      width: "100%",
      borderRadius: "0",
      top: "unset",
      position: "absolute !important",
      padding: "0 0 5px 0",
      boxShadow: "none",
      backgroundColor: "transparent"
    }
  }),

  button: css({
    border: "none",
    borderRadius: "15px",
    ":focus": {
      outline: "none"
    }
  })
};

class ModalShareLink extends Component {
  state = { normalLinkCopied: false, referralLinkCopied: false };
  render() {
    const { url, text, via, hash_tags, auth } = this.props;

    return (
      <Rodal
        visible={this.props.visible}
        onClose={this.props.onClose}
        duration={350}
        showCloseButton={false}
        className={`${rules.rodal} ${rules.dialog}`}
        animation="slideUp"
        customMaskStyles={modalStyle.mask}
        customStyles={modalStyle.dialog}
      >
        <div className={`${rules.button} bg-light-3 mx-2 my-1`}>
          <button
            className="d-flex justify-content-between align-items-center btn-ahref btn-block font-weight-medium p-3"
            onClick={() => {
              window.open(
                "https://t.me/share/url?url=" + url + "&text=" + text
              );
            }}
          >
            <span>تلگرام</span>
            <TelegramIcon
              className="font-svg lg"
              fill="currentColor"
              fillRule="evenodd"
            />
          </button>
          <div className="divider-bottom" />
          <button
            className="d-flex justify-content-between align-items-center btn-ahref btn-block font-weight-medium p-3"
            onClick={() => {
              window.open(
                "https://twitter.com/intent/tweet?url=" +
                  url +
                  "&text=" +
                  text +
                  "&via=" +
                  via +
                  "&hashtags=" +
                  hash_tags
              );
            }}
          >
            <span>توییتر</span>
            <TwitterIcon
              className="font-svg lg"
              fill="currentColor"
              fillRule="evenodd"
            />
          </button>
          <div className="divider-bottom" />
          <button
            className="d-flex justify-content-between align-items-center btn-ahref btn-block font-weight-medium p-3"
            onClick={() => {
              window.open("http://www.facebook.com/sharer.php?u=" + url);
            }}
          >
            <span>فیسبوک</span>
            <FacebookIcon
              className="font-svg lg"
              fill="currentColor"
              fillRule="evenodd"
            />
          </button>
          <div className="divider-bottom" />
          <button className="d-flex justify-content-between align-items-center btn-ahref btn-block font-weight-medium p-3">
            <span>لینکداین</span>
            <LinkedinIcon
              className="font-svg lg"
              fill="currentColor"
              fillRule="evenodd"
            />
          </button>

          {auth.isAuthenticated && (
            <React.Fragment>
              <div className="divider-bottom" />
              <CopyToClipboard
                text={`${url}?referrer=${auth.user.id}`}
                onCopy={() => this.setState({ referralLinkCopied: true })}
              >
                <button
                  className={classnames(
                    "d-flex justify-content-between align-items-center btn-ahref btn-block font-weight-medium p-3",
                    {
                      "text-success": this.state.referralLinkCopied
                    }
                  )}
                >
                  <span>
                    {this.state.referralLinkCopied && "کپی شده"}
                    {!this.state.referralLinkCopied &&
                      "کپی کردن لینک با کد دعوت"}
                  </span>
                  <CopyIcon
                    className="font-svg lg"
                    fill="currentColor"
                    fillRule="evenodd"
                  />
                </button>
              </CopyToClipboard>
            </React.Fragment>
          )}

          <div className="divider-bottom" />
          <CopyToClipboard
            text={`${text}\n${url}`}
            onCopy={() => this.setState({ normalLinkCopied: true })}
          >
            <button
              className={classnames(
                "d-flex justify-content-between align-items-center btn-ahref btn-block font-weight-medium p-3",
                {
                  "text-success": this.state.normalLinkCopied
                }
              )}
            >
              <span>
                {this.state.normalLinkCopied && "کپی شده"}
                {!this.state.normalLinkCopied && "کپی کردن لینک"}
              </span>
              <CopyIcon
                className="font-svg lg"
                fill="currentColor"
                fillRule="evenodd"
              />
            </button>
          </CopyToClipboard>
        </div>

        <button
          className={`${
            rules.button
          } text-primary font-weight-bold bg-light-3 p-3 mx-2 my-1`}
          onClick={this.props.onClose}
        >
          بستن
        </button>
      </Rodal>
    );
  }
}

function mapStateToPros({ auth, modal: { props } }) {
  return { auth, ...props };
}

export default connect(
  mapStateToPros,
  { setModalParams }
)(ModalShareLink);
