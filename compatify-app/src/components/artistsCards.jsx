import React from "react";
import shortid from "shortid";
import CardColumn from "./common/cardColumn";
import WhiteBottomTransCard from "./common/whiteBottomTransCard";

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
            <WhiteBottomTransCard key={shortid.generate()}>
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

export default ArtistsCards;
