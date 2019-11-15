import React from "react";
import shortid from "shortid";

const Genres = props => {
  const { genres } = props;

  return (
    <>
      {genres &&
        genres.map(g => {
          return (
            <span key={shortid()} className="badge badge-light mx-1">
              {g}
            </span>
          );
        })}
    </>
  );
};

export default Genres;
