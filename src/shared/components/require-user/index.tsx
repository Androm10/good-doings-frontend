"use client";

import { useAppDispatch } from "@/shared/hooks/app-dispatch.hook";
import { useAppSelector } from "@/shared/hooks/app-selector.hook";
import { fetchProfile } from "@/shared/store/slices/user.slice";
import { FC, PropsWithChildren, useEffect } from "react";

const RequireUser: FC<PropsWithChildren> = ({
  children,
}: PropsWithChildren) => {
  const { user } = useAppSelector((state) => state.userReducer);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!user) {
      dispatch(fetchProfile());
    }
  }, []);

  return <>{user ? <>{children}</> : <></>}</>;
};

export default RequireUser;
