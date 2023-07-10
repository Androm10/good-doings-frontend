import { UserEntity } from "@/core/entities/user.entity";
import { FC } from "react";

const ProfilePage: FC = () => {
  const user: UserEntity = {
    id: 1,
    username: "Oleg123",
    login: "tuyre@fdsf.com",
    publicId: "fdsfsw2r432xcvvx>fdsfds",
  };

  return <div></div>;
};

export default ProfilePage;
