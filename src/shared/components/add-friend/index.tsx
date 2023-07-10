import { UserEntity } from "@/core/entities/user.entity";
import { ApiService } from "@/shared/services/api.service";
import { FC, useState } from "react";
import Button from "../ui/button";
import Input from "../ui/input";
import Spinner from "../ui/spinner";
import s from "./add-friend.module.scss";

function addFriend(publicId: string) {
  return ApiService.Instance.post<UserEntity>(
    `/user/profile/add-friend/${publicId}`
  );
}

interface AddFriendProps {
  onFriendAdded: (friend: UserEntity) => void;
}

const AddFriend: FC<AddFriendProps> = ({ onFriendAdded }: AddFriendProps) => {
  const [publicId, setPublicId] = useState("");
  const [addFriendLoading, setAddFriendLoading] = useState(false);
  const [addFriendError, setAddFriendError] = useState("");

  const addFriendHandler = async () => {
    try {
      setAddFriendLoading(true);
      const addedFriend = await addFriend(publicId);
      onFriendAdded(addedFriend);
    } catch (error: any) {
      console.log(JSON.stringify(error));
      setAddFriendError(error.message);
    } finally {
      setAddFriendLoading(false);
    }
  };

  return (
    <>
      {addFriendLoading ? (
        <>
          <Spinner />
        </>
      ) : (
        <div className={s["add-friend"]}>
          <label>Enter public id of your friend</label>
          <Input
            value={publicId}
            onChange={(e) => setPublicId(e.target.value)}
          />

          <Button as="button" onClick={addFriendHandler}>
            Add
          </Button>
          <div className={s["add-friend__error"]}>{addFriendError}</div>
        </div>
      )}
    </>
  );
};

export default AddFriend;
