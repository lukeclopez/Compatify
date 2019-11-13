import React from "react";
import shortid from "shortid";
import CardColumn from "./common/cardColumn";

const ArtistsCards = props => {
  const { titleText, artists } = props;
  const style = {
    maxWidth: "100%",
    minWidth: "100%",
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
            <div key={shortid.generate()}>
              <div className="card text-white text-center bg-transparent my-3">
                {a.images[0] ? (
                  <img src={a.images[0].url} alt="" style={style} />
                ) : (
                  <img src="/no-image.png" alt="" style={style} />
                )}
                <div className="card-body">
                  <h5 className="card-title">{a.name}</h5>
                  <p className="card-text">
                    <b>Popularity: </b>
                    {a.popularity}/100
                  </p>
                  {a.genres[0] && (
                    <p className="card-text">
                      <b>Genres: </b>
                      {a.genres.map(g => (
                        <div key={g}>{g}</div>
                      ))}
                    </p>
                  )}
                  <a
                    href={a.external_urls.spotify}
                    className="btn btn-secondary"
                  >
                    View on Spotify
                  </a>
                </div>
              </div>
            </div>
          );
        })}
    </CardColumn>
  );
};

export default ArtistsCards;
