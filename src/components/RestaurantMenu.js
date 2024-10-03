import React, { useState } from "react";
import { useParams } from "react-router-dom";
import RestaurantMenuCard from "./RestaurantMenuCard";
import Shimmer from "./Shimmer";
import useRestaurantMenuData from "../Hooks/useRestaurantMenuData";

const RestaurantMenu = () => {
  const { resId } = useParams();
  const [restaurantData, restaurantMenuList] = useRestaurantMenuData(resId);
  const [showIndexItems, setShowIndexItems] = useState(0);

  if (restaurantMenuList?.length == 0) {
    return <Shimmer />;
  }

  const handleAccordianClick = (index) => {
    if (showIndexItems == index) {
      setShowIndexItems(null);
    } else {
      setShowIndexItems(index);
    }
  };

  return (
    <div className="restaurant-menu-wrapper">
      <div className="restaurant-menu-top-div">
        <div className="restaurant-menu-name">{restaurantData?.name}</div>
        <div className="restaurant-menu-details">
          <div className="restaurant-menu-rating">
            <img
              className="restaurant-menu-rating-icon"
              src="https://img.icons8.com/?size=100&id=enP6M_u0BXV3&format=png&color=1D923D"
            />
            {`${restaurantData?.avgRating} (${restaurantData?.totalRatingsString})`}
          </div>
          <div className="restaurant-menu-cuisines">
            {restaurantData?.cuisines?.join(", ")}
          </div>
          <div className="restaurant-menu-time">
            {restaurantData?.sla?.slaString}
          </div>
          <hr className="restaurant-menu-line" />
          <div className="restaurant-menu-distance-fee">
            <img
              className="restaurant-menu-distance-fee-image"
              src="https://img.icons8.com/?size=100&id=GDiFk6WOVIf4&format=png&color=02060C99"
            />
            {`${restaurantData?.sla?.lastMileTravelString} | ₹${
              restaurantData?.feeDetails?.totalFee / 100
            } delivery fee will apply`}
          </div>
        </div>
      </div>

      <div className="restaurant-menu-bottom-div">
        {restaurantMenuList?.map((item, index) => {
          return (
            <div className="accordian" key={index}>
              <div
                className="accordian-header"
                onClick={() => handleAccordianClick(index)}
              >
                <div className="accordian-name">{`${item?.card?.card?.title} (${item?.card?.card?.itemCards?.length})`}</div>
                <img
                  className="accordian-icon"
                  src={`https://img.icons8.com/?size=100&id=${
                    showIndexItems == index ? 40025 : 40021
                  }&format=png&color=000000`}
                />
              </div>

              {showIndexItems == index && (
                <div className="accordian-items">
                  {item?.card?.card?.itemCards.map((item, index) => {
                    return (
                      <RestaurantMenuCard key={index} data={item?.card?.info} />
                    );
                  })}
                </div>
              )}

              <hr className="accordian-hr" />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RestaurantMenu;