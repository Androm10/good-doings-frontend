import { UserEntity } from "@/core/entities/user.entity";
import RequireUser from "@/shared/components/require-user";
import { FC } from "react";

const ProfilePage: FC = () => {
  return (
    <RequireUser>
      <div></div>
    </RequireUser>
  );
};

export default ProfilePage;
