import React from "react";
import CardColumn from "./common/cardColumn";
import WhiteBottomTransCard from "./common/whiteBottomTransCard";

const Tracks = props => {
  const { tracks } = props;
  const style = {
    maxWidth: "100%",
    height: "auto",
    display: "block",
    marginLeft: "auto",
    marginRight: "auto"
  };
  return (
    <CardColumn>
      {tracks &&
        tracks.map((t, index) => {
          return (
            <WhiteBottomTransCard key={index}>
              <img
                src={t.album.images[0] && t.album.images[0].url}
                className="card-img-top"
                alt=""
                style={style}
              />
              <div className="card-body">
                <h5 className="card-title">{t.name}</h5>
                <h6 className="card-title">{t.artists[0].name}</h6>
                <p className="card-text">
                  <b>Popularity: </b>
                  {t.popularity}/100
                </p>
                <a
                  href={t.external_urls.spotify}
                  className="btn btn-outline-light"
                >
                  View on Spotify
                </a>
              </div>
            </WhiteBottomTransCard>
          );
        })}
    </CardColumn>
  );
};

export default Tracks;
