import { UserEntity } from "@/core/entities/user.entity";
import { Paginated } from "@/core/types/paginated";
import { useScroll } from "@/shared/hooks/use-scroll";
import { ApiService } from "@/shared/services/api.service";
import { buildQuery } from "@/shared/utils/build-query";
import { FC, useRef, useState } from "react";
import Spinner from "../ui/spinner";
import UserItem from "./user-item";
import s from "./user-list.module.scss";

interface UserListProps {
  initialUsers: UserEntity[];
}

function fetchUsers(page: number) {
  return ApiService.Instance.get<Paginated<UserEntity>>(
    `/user?${buildQuery({ page })}`
  );
}

const UserList: FC<UserListProps> = ({ initialUsers }: UserListProps) => {
  const [users, setUsers] = useState(initialUsers);
  const listRef = useRef<HTMLDivElement>(null);
  const { isLoading } = useScroll(listRef, 2, fetchUsers, setUsers);

  return (
    <div className={s["user-list"]} ref={listRef}>
      <div className={s["user-list__content"]}>
        {users.map((user) => (
          <div key={user.id} className={s["user-list__item"]}>
            <UserItem user={user} />
          </div>
        ))}
        {isLoading && <Spinner />}
      </div>
    </div>
  );
};

export default UserList;
