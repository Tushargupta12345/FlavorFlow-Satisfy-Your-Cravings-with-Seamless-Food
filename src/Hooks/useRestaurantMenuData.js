import { useEffect, useState } from "react";
import {
  RESTAURANT_MENU_API_URL,
  RESTAURANT_MENU_TYPE_KEY,
} from "../utils/constants";

const useRestaurantMenuData = (resId) => {
  const [restaurantData, setRestaurantData] = useState(null);
  const [restaurantMenuList, setRestaurantMenuList] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await fetch(RESTAURANT_MENU_API_URL + resId);
      const json = await data.json();

      setRestaurantMenuList(
        json?.data.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards?.filter(
          (card) => card?.card?.card["@type"] == RESTAURANT_MENU_TYPE_KEY
        )
      );
      setRestaurantData(json?.data?.cards[2]?.card?.card?.info);
    } catch (error) {
      setRestaurantData(null);
      setRestaurantMenuList([]);
      console.log(error);
    }
  };

  return [restaurantData, restaurantMenuList];
};

export default useRestaurantMenuData;