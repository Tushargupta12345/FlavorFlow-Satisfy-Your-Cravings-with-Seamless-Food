import RestaurantCard, { withOffer } from "./RestaurantCard";
import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import { LOCALHOST_RESTAURANT_DATA_URL } from "../utils/constants";
import useInternetStatus from "../Hooks/useInternetStatus";

const Body = () => {
  const [restaurantList, setRestaurantList] = useState([]);
  const [filteredRestaurant, setFilteredRestaurant] = useState([]);
  const [searchText, setSearchText] = useState("");
  const internetStatus = useInternetStatus();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(LOCALHOST_RESTAURANT_DATA_URL);
    const json = await data.json();
    setRestaurantList(
      json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
    setFilteredRestaurant(
      json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
  };

  const handleFilterByRating = () => {
    let filteredList = restaurantList?.filter(
      (res) => res?.info?.avgRating > 4
    );

    setFilteredRestaurant(filteredList);
  };

  const handleSearch = () => {
    const filteredList = restaurantList?.filter((res) =>
      res?.info?.name?.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredRestaurant(filteredList);
  };

  if (internetStatus == "offline") {
    return (
      <div className="offline-wrapper">
        <div className="offline-div">
          <p className="offline-text-1">OOPS! Looks like you are offline.</p>
          <p className="offline-text-2">
            Please check your internet connection and try again.
          </p>
        </div>
      </div>
    );
  }

  const RestaurantCardWithOffer = withOffer(RestaurantCard);

  return restaurantList && restaurantList?.length == 0 ? (
    <Shimmer />
  ) : (
    <div className="body">
      <div className="body-top">
        <div className="search">
          <input
            type="text"
            className="search-input"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          />
          <button onClick={handleSearch} className="search-btn">
            Search
          </button>
        </div>
        <button className="filter-btn" onClick={handleFilterByRating}>
          Top Rated Restaurants
        </button>
      </div>
      <div className="res-container">
        {filteredRestaurant?.map((restaurant) => {
          return (
            <Link
              key={restaurant.info.id}
              to={"/restaurants/" + restaurant?.info?.id}
            >
              {restaurant?.info?.aggregatedDiscountInfoV3 != undefined ? (
                <RestaurantCardWithOffer data={restaurant} />
              ) : (
                <RestaurantCard data={restaurant} />
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Body;