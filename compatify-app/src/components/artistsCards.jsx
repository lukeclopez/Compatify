import React from "react";
import shortid from "shortid";
import CardColumn from "./common/cardColumn";

const ArtistsCards = props => {
  const { titleText, artists } = props;
  const style = {
    maxWidth: "50%",
    height: "auto",
    display: "block",
    marginLeft: "auto",
    marginRight: "auto"
  };
  return (
    <CardColumn titleText={titleText}>
      {artists &&
        artists.map(a => {
          return (
            <React.Fragment key={shortid.generate()}>
              <div className="card text-white bg-dark mb-3">
                <img
                  src={a.images[0] && a.images[0].url}
                  className="card-img-top"
                  alt=""
                  style={style}
                />
                <div className="card-body">
                  <h5 className="card-title">{a.name}</h5>
                  <p className="card-text">
                    <b>Popularity: </b>
                    {a.popularity}/100
                  </p>
                  <p className="card-text">
                    <b>Genres: </b>
                    {a.genres.map(g => (
                      <li key={g}>{g}</li>
                    ))}
                  </p>
                  <a
                    href={a.external_urls.spotify}
                    className="btn btn-secondary"
                  >
                    View on Spotify
                  </a>
                </div>
              </div>
            </React.Fragment>
          );
        })}
    </CardColumn>
  );
};

export default ArtistsCards;
