import { useEffect } from "react";
import { fetchProfile } from "../store/slices/user.slice";
import { useAppDispatch } from "./app-dispatch.hook";
import { useAppSelector } from "./app-selector.hook";

export const useUser = () => {
  const { user, isLoading, error } = useAppSelector(
    (state) => state.userReducer
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!user) {
      console.log("fetch profile");
      dispatch(fetchProfile());
    }
  }, []);

  const retry = async () => {
    return dispatch(fetchProfile()).unwrap();
  };

  return { user, isLoading, error, retry };
};
