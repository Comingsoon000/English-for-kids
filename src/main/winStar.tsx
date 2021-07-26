import React from "react";

const bgImageLink = "https://res.cloudinary.com/comingsoon/image/upload/v1626608645/njcy5bpdcrn6f76fiaya.svg";

export const WInStar: React.FC = () => {
  return (
    <div
      className="main__star_win"
      style={{
        backgroundImage: `url(${bgImageLink})`,
      }}
    ></div>
  );
};
