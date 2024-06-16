import { useEffect } from "react";
import "./App.css";
import { RouterProvider } from "react-router-dom";
import router from "./router.jsx";
import { useDispatch } from "react-redux";
import { setUserInState } from "../src/reducers/userReducers";
import { setIsLoading } from "../src/reducers/userReducers";
// App.js ou index.js ou un autre fichier principal
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { me } from "./api";
function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        dispatch(setIsLoading(true));
        const response = await me();
        setTimeout(() => {
          dispatch(setIsLoading(false));
        }, 3000);

        console.log(response);

        if (response.status === 200) {
          const userData = response.data;
          console.log(userData);
          dispatch(setUserInState(userData));
        } else {
          console.error("Failed to fetch user data");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [dispatch]);

  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
