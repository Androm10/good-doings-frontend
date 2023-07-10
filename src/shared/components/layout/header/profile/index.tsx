"use client";

import Button from "@/shared/components/ui/button";
import { useAppSelector } from "@/shared/hooks/app-selector.hook";
import { useUser } from "@/shared/hooks/use-user.hook";
import Link from "next/link";
import { FC } from "react";

const Profile: FC = () => {
  const { user } = useUser();

  if (!user) {
    return (
      <Link href="/login">
        <Button as="button">Login</Button>
      </Link>
    );
  }

  return (
    <div>
      <label>{user?.username}</label>
    </div>
  );
};

export default Profile;
