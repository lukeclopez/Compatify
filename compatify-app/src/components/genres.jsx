import React from "react";

const Genres = props => {
  const { genres } = props;

  return (
    <>
      {genres.map((g, index) => {
        return (
          <span index={index} class="badge badge-dark mx-1">
            {g}
          </span>
        );
      })}
    </>
  );
};

export default Genres;
