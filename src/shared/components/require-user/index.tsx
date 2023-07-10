"use client";

import { useUser } from "@/shared/hooks/use-user.hook";
import { FC, PropsWithChildren, ReactNode, useEffect } from "react";

interface RequireUserOwnProps {
  fallback?: ReactNode;
}

type RequireUserProps = RequireUserOwnProps & PropsWithChildren;

const RequireUser: FC<RequireUserProps> = ({
  children,
  fallback,
}: RequireUserProps) => {
  const { user, isLoading, error } = useUser();

  return <>{user ? <>{children}</> : <>{fallback}</>}</>;
};

export default RequireUser;
