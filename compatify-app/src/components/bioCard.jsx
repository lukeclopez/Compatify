import React, { Component } from "react";
import { Link } from "react-router-dom";
import NavTab from "./navTab";
import ShareUrl from "./shareUrl";

class BioCard extends Component {
  state = { activeTab: "Info" };

  handleChangeTab = tabTitle => {
    this.setState({ activeTab: tabTitle });
  };

  render() {
    const { currentUser, data } = this.props;
    const { id, images, external_urls } = currentUser;
    const { activeTab } = this.state;

    const tabTitles = {
      info: "Info",
      sharing: "Sharing",
      options: "Options"
    };
    const { info, sharing, options } = tabTitles;

    return (
      <div className="card text-white bg-dark mb-3 text-center">
        <div className="card-header">
          <ul className="nav nav-tabs card-header-tabs">
            <NavTab
              title={info}
              link="#"
              onClick={this.handleChangeTab}
              activeTab={activeTab}
            />
            <NavTab
              title={sharing}
              link="#"
              onClick={this.handleChangeTab}
              activeTab={activeTab}
            />
            <NavTab
              title={options}
              link="#"
              onClick={this.handleChangeTab}
              activeTab={activeTab}
            />
          </ul>
        </div>
        <div className="card-body">
          <h5 className="card-title" style={{ textTransform: "uppercase" }}>
            {id}
          </h5>
          {activeTab === info && (
            <>
              <p className="card-text">
                <img src={images[0] && images[0].url} alt="Profile" />
              </p>
              <a href={external_urls.spotify} className="btn btn-primary">
                View on Spotify
              </a>
            </>
          )}
          {activeTab === sharing && (
            <>
              <p className="card-text">
                <ShareUrl userId={id} shareUrl={data.share_url} />
              </p>
            </>
          )}
          {activeTab === options && (
            <>
              <p className="card-text">
                <Link to="/create-profile">
                  <button className="btn btn-primary">Update Profile</button>
                </Link>
              </p>
            </>
          )}
        </div>
      </div>
    );
  }
}

export default BioCard;
