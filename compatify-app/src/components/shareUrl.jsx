import React, { Component } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import sptfy from "../services/spotifyService";
import CompatifyButton from "./common/compatifyButton";

class ShareUrl extends Component {
  state = { url: this.props.shareUrl, loading: false };

  newShareUrl = async () => {
    this.setState({ loading: true });
    const { data } = await sptfy.getNewShareUrl();
    this.setState({ url: data.share_url, loading: false });
  };

  render() {
    const { url, loading } = this.state;
    const shareUrl = `compatify.io/p${url}`;

    return (
      <>
        <div>
          <span className="border border-white rounded-0 p-1">
            <Link className="text-white" to={`p${url}`}>
              {shareUrl}
            </Link>
          </span>
          <CopyToClipboard
            text={shareUrl}
            onCopy={() => toast.success("Copied!")}
          >
            <CompatifyButton classes="btn-sm ml-3">
              <i className="fa fa-copy"></i>
            </CompatifyButton>
          </CopyToClipboard>
        </div>
        <div>
          Copy this link to let others see your partial profile and Compatify
          with you.
        </div>
        <CompatifyButton onClick={this.newShareUrl} disabled={loading}>
          {!loading ? "Get a new share URL" : "Getting new URL..."}
        </CompatifyButton>
      </>
    );
  }
}

export default ShareUrl;
