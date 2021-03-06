import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import WhiteBottomTransCard from "./common/whiteBottomTransCard";
import CompatifyButton from "./common/compatifyButton";
import NavTab from "./navTab";
import ShareUrl from "./shareUrl";

class BioCard extends Component {
  state = { activeTab: "Info" };

  handleChangeTab = tabTitle => {
    this.setState({ activeTab: tabTitle });
  };

  handleDeleteData = () => {
    confirmAlert({
      title: "Delete My Data",
      message: "Are you sure? This cannot be undone.",
      buttons: [
        {
          label: "Yes",
          onClick: () => this.props.history.push("/delete-data")
        },
        {
          label: "No",
          onClick: () => {}
        }
      ]
    });
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
      <WhiteBottomTransCard>
        <div>
          <ul className="nav nav-tabs bg-transparent">
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
              <CompatifyButton>
                <a
                  style={{ color: "inherit", textDecoration: "inherit" }}
                  href={external_urls.spotify}
                >
                  View on Spotify
                </a>
              </CompatifyButton>
            </>
          )}
          {activeTab === sharing && (
            <ShareUrl userId={id} shareUrl={data.share_url} />
          )}
          {activeTab === options && (
            <>
              <p className="card-text">
                <Link to="/create-profile">
                  <CompatifyButton>Update Profile</CompatifyButton>
                </Link>
              </p>
              <p className="card-text">
                <CompatifyButton onClick={this.handleDeleteData}>
                  Delete My Data
                </CompatifyButton>
              </p>
            </>
          )}
        </div>
      </WhiteBottomTransCard>
    );
  }
}

export default withRouter(BioCard);
