import React from "react";

const ArtistsCard = props => {
  const { titleText, artists } = props;
  return (
    <>
      <h4>{titleText}</h4>
      <div className="card-columns">
        {artists.map((a, index) => {
          return (
            <div key={index} className="card">
              <img
                src={a.images[0] && a.images[0].url}
                className="card-img-top"
                style={{
                  maxWidth: "50%",
                  height: "auto",
                  display: "block",
                  marginLeft: "auto",
                  marginRight: "auto"
                }}
              />
              <div className="card-body">
                <h5 className="card-title">{a.name}</h5>
                <p className="card-text">
                  <b>Popularity:</b> {a.popularity}/100
                </p>
                <p className="card-text">
                  <b>Genres</b>
                  <ul className="list-group">
                    {a.genres.map(g => (
                      <li className="list-group-item">{g}</li>
                    ))}
                  </ul>
                </p>
                <a href={a.external_urls.spotify} className="btn btn-primary">
                  View on Spotify
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ArtistsCard;
