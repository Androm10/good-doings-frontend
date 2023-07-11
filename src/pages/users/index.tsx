import { UserEntity } from "@/core/entities/user.entity";
import { Paginated } from "@/core/types/paginated";
import { BASE_URL } from "@/shared/constants/api";
import { ApiService } from "@/shared/services/api.service";
import { FC, useState } from "react";

interface UsersPageProps {
  initialUsers: UserEntity[];
}

const UsersPage: FC<UsersPageProps> = ({ initialUsers }: UsersPageProps) => {
  const [users, setUsers] = useState(initialUsers);

  return (
    <div>
      {users.map((user) => (
        <div key={user.id}>
          <div>{user.username}</div>
          <div>{user.publicId}</div>
        </div>
      ))}
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
