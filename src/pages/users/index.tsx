import { UserEntity } from "@/core/entities/user.entity";
import { Paginated } from "@/core/types/paginated";
import { BASE_URL } from "@/shared/constants/api";
import s from "./users-page.module.scss";
import { FC, useState } from "react";
import UserList from "@/shared/components/user-list";

interface UsersPageProps {
  initialUsers: UserEntity[];
}

const UsersPage: FC<UsersPageProps> = ({ initialUsers }: UsersPageProps) => {
  return (
    <div className={s["users-page"]}>
      <div className={s["users-page__content"]}>
        <UserList initialUsers={initialUsers} />
      </div>
    </div>
  );
};

export default UsersPage;

export async function getStaticProps() {
  const res = await fetch(`${BASE_URL}/user`);

  const data: Paginated<UserEntity> = await res.json();

  return {
    props: {
      initialUsers: data.result,
    },
  };
}
