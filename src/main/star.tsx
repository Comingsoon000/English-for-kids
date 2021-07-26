import React from "react";

const bgImageLink = "https://res.cloudinary.com/comingsoon/image/upload/v1626608695/bur4vayniptnok7zktli.svg";

export const Star: React.FC = () => {
  return (
    <div
      className="main__star_win"
      style={{
        backgroundImage: `url(${bgImageLink})`,
      }}
    ></div>
  );
};
