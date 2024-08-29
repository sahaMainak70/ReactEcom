import React from "react";

const ImageLoader = ({ item }) => {
  return (
    <img
      src={item.thumbnail}
      className="card-img-top"
      alt="Loading..."
      loading="lazy"
    />
  );
};

export default ImageLoader;
