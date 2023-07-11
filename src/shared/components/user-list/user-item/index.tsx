import { UserEntity } from "@/core/entities/user.entity";
import { FC } from "react";
import s from "./user-item.module.scss";

interface UserItemProps {
  user: UserEntity;
}

const UserItem: FC<UserItemProps> = ({ user }: UserItemProps) => {
  return (
    <div className={s["user-item"]}>
      <div className={s["user-item__property"]}>
        <label className={s["user-item__property-name"]}>Name:</label>
        {user.username}
      </div>
      <div className={s["user-item__property"]}>
        <label className={s["user-item__property-name"]}>Public Id:</label>
        {user.publicId}
      </div>
    </div>
  );
};

export default UserItem;
