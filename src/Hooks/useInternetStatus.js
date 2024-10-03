import { useEffect, useState } from "react";

const useInternetStatus = () => {
  const [internetStatus, setInternetStatus] = useState("online");

  useEffect(() => {
    window.addEventListener("offline", () => {
      setInternetStatus("offline");
    });

    window.addEventListener("online", () => {
      setInternetStatus("online");
    });
  }, []);

  return internetStatus;
};

export default useInternetStatus;