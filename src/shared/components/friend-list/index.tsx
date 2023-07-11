import { UserEntity } from "@/core/entities/user.entity";
import { Paginated } from "@/core/types/paginated";
import { ApiService } from "@/shared/services/api.service";
import { buildQuery } from "@/shared/utils/build-query";
import { FC, useEffect, useState } from "react";
import AddFriend from "../add-friend";
import DoingList from "../doing-list";
import Button from "../ui/button";
import Input from "../ui/input";
import Modal from "../ui/modal";
import Spinner from "../ui/spinner";
import s from "./friend-list.module.scss";

interface FriendListProps {
  userId: number;
}

function fetchFriends(userId: number, page: number) {
  return ApiService.Instance.get<Paginated<UserEntity>>(
    `/user/${userId}/friends?${buildQuery({
      page,
    })}`
  );
}

const FriendList: FC<FriendListProps> = (props: FriendListProps) => {
  const { userId } = props;
  const [page, setPage] = useState(0);
  const [friends, setFriends] = useState<UserEntity[]>([]);
  const [isModal, setModal] = useState(false);

  const [isDoingModal, setDoingModal] = useState(false);
  const [friendId, setFriendId] = useState<number>();

  useEffect(() => {
    reloadFriends();
  }, [userId]);

  const reloadFriends = async () => {
    setPage(0);
    const data = await fetchFriends(userId, 0);
    setFriends(data.result);
  };

  const friendAddedHandler = (friend: UserEntity) => {
    setFriends((prev) => [...prev, friend]);
    setModal(false);
  };

  const clickDoingsHandler = (friendId: number) => {
    setFriendId(friendId);
    setDoingModal(true);
  };

  return (
    <div className={s["friend-list"]}>
      <Button as="button" onClick={() => setModal(!isModal)}>
        Add friend
      </Button>
      {friends.length ? (
        <div>
          {friends.map((friend) => (
            <div key={friend.id} className={s["friend-list__item"]}>
              <div> {friend.username}</div>
              <Button as="button" onClick={() => clickDoingsHandler(friend.id)}>
                Doings
              </Button>
            </div>
          ))}
        </div>
      ) : (
        <div>No friends was found</div>
      )}
      <Modal isVisible={isModal} setVisible={setModal} title="Add friend">
        <AddFriend onFriendAdded={friendAddedHandler} />
      </Modal>
      <Modal
        isVisible={isDoingModal}
        setVisible={setDoingModal}
        title="Friend's doings"
      >
        {!!friendId && <DoingList userId={friendId} />}
      </Modal>
    </div>
  );
};

export default FriendList;
