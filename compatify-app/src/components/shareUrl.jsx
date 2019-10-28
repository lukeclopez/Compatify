import React, { Component } from "react";
import sptfy from "../services/spotifyService";

class ShareUrl extends Component {
  state = { url: this.props.shareUrl, loading: false };

  newShareUrl = async () => {
    this.setState({ loading: true });
    const { data } = await sptfy.getNewShareUrl();
    this.setState({ url: data.share_url, loading: false });
  };

  render() {
    const { url, loading } = this.state;

    return (
      <>
        {url ? (
          <h3>Share: compatify.io/{url}</h3>
        ) : (
          <p>Click the button below to generate a share url.</p>
        )}

        <button
          className="btn btn-primary"
          onClick={this.newShareUrl}
          disabled={loading}
        >
          {!loading ? "Get a new share URL" : "Getting new URL..."}
        </button>
      </>
    );
  }
}

export default ShareUrl;
