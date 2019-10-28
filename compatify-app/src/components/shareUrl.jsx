import React, { Component } from "react";
import sptfy from "../services/spotifyService";

class ShareUrl extends Component {
  state = { url: this.props.shareUrl };

  newShareUrl = async () => {
    const newUrl = await sptfy.getNewShareUrl();
    this.setState({ url: newUrl });
  };

  render() {
    const { url } = this.state;

    return (
      <>
        {url ? (
          <h3>Share: compatify.io/{url}</h3>
        ) : (
          <p>Click the button below to generate a share url.</p>
        )}

        <button className="btn btn-primary" onClick={this.newShareUrl}>
          Get a new share URL
        </button>
      </>
    );
  }
}

export default ShareUrl;
