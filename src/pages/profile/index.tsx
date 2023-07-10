import DoingList from "@/shared/components/doing-list";
import FriendList from "@/shared/components/friend-list";
import Button from "@/shared/components/ui/button";
import Modal from "@/shared/components/ui/modal";
import Spinner from "@/shared/components/ui/spinner";
import { routes } from "@/shared/constants/routes";
import { useUser } from "@/shared/hooks/use-user.hook";
import { useRouter } from "next/navigation";
import { FC, useEffect } from "react";
import s from "./profile.module.scss";

const ProfilePage: FC = () => {
  const { user, isLoading, error } = useUser();
  const router = useRouter();
  useEffect(() => {
    if (!user && error) {
      router.push(routes.login);
    }
  }, [user, isLoading]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className={s["profile-page"]}>
      <div className={s["profile-page__content"]}>
        <div>
          <h2>{user?.username}</h2>
          <div className={s["profile-page__info"]}>
            <span>Login</span>
            <label>{user?.login}</label>
          </div>
          <div className={s["profile-page__info"]}>
            <span>Public id</span>
            <label>{user?.publicId}</label>
          </div>
        </div>
        <div className={s["profile-page__relations"]}>
          {!!user && (
            <>
              <div className={s["profile-page__friends"]}>
                <FriendList userId={user?.id} />
              </div>
              <div className={s["profile-page__doings"]}>
                <DoingList userId={user?.id} />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
