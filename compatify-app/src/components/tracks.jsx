import React from "react";
import CardColumn from "./common/cardColumn";

const Tracks = props => {
  const { tracks } = props;
  const style = {
    maxWidth: "50%",
    height: "auto",
    display: "block",
    marginLeft: "auto",
    marginRight: "auto"
  };
  return (
    <CardColumn>
      {tracks.map((t, index) => {
        return (
          <div key={index} className="card text-white bg-dark mb-3">
            <img
              src={t.album.images[0] && t.album.images[0].url}
              className="card-img-top"
              style={style}
            />
            <div className="card-body">
              <h5 className="card-title">{t.name}</h5>
              <h6 className="card-title">{t.artists[0].name}</h6>
              <p className="card-text">
                <b>Popularity: </b>
                {t.popularity}/100
              </p>
              <a href={t.external_urls.spotify} className="btn btn-primary">
                View on Spotify
              </a>
            </div>
          </div>
        );
      })}
    </CardColumn>
  );
};

export default Tracks;
