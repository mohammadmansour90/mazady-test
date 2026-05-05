import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getLogInStatus, selectIsLoggedIn } from "../redux/features/authSlice";

export const useRedirectLoggedOutUser = (path) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);

  useEffect(() => {
    // Check login status when hook mounts
    dispatch(getLogInStatus());
  }, [dispatch]);

  useEffect(() => {
    // Redirect only if Redux says NOT logged in
    if (isLoggedIn === false) {
      navigate(path);
    }
  }, [isLoggedIn, path, navigate]);
};
