import React from "react";

const Shimmer = () => {
  const shimmerCards = Array.from({ length: 8 }).map((_, index) => (
    <div className="shimmer-card" key={index}>
      <div className="shimmer-card-image"></div>
      <div className="shimmer-card-details">
        <div className="shimmer-card-detail-1"></div>
        <div className="shimmer-card-detail-2"></div>
      </div>
    </div>
  ));

  return (
    <div className="shimmer-body">
      <div className="shimmer-container">{shimmerCards}</div>
    </div>
  );
};

export default Shimmer;