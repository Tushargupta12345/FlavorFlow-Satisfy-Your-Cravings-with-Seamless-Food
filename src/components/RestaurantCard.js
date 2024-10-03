import { CDN_URL } from "../utils/constants";

const RestaurantCard = ({ data }) => {
  let { cuisines, name, cloudinaryImageId, avgRating, sla } = data?.info;
  let cuisine = cuisines.join(", ");

  if (cuisine.length > 32) {
    cuisine = `${cuisine.substring(0, 30)}...`;
  }
  if (name.length > 30) {
    name = `${name.substring(0, 25)}...`;
  }

  return (
    <div className="res-card">
      <img
        alt="res-logo"
        className="res-logo"
        src={`${CDN_URL}${cloudinaryImageId}`}
      />
      <div className="res-details">
        <p className="res-name">{name}</p>
        <div className="res-rating-time-div">
          <p className="res-avg-rating">
            <img
              className="restaurant-menu-rating-icon"
              src="https://img.icons8.com/?size=100&id=enP6M_u0BXV3&format=png&color=1D923D"
            />
            {avgRating}
          </p>
          <p className="res-delivery-time">{sla.slaString}</p>
        </div>
        <p className="res-cuisine">{cuisine}</p>
      </div>
    </div>
  );
};

// Higher order component
export const withOffer = (RestaurantCard) => {
  return ({ data }) => {
    const { header, subHeader } = data.info.aggregatedDiscountInfoV3;
    return (
      <div className="withoffer-div">
        <div className="withoffer-text">{`${
          header != undefined ? header : ""
        } ${subHeader != undefined ? subHeader : ""}`}</div>
        <RestaurantCard data={data} />
      </div>
    );
  };
};

export default RestaurantCard;