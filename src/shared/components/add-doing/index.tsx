import { DoingEntity } from "@/core/entities/doing.entity";
import { ApiService } from "@/shared/services/api.service";
import { FC, useState } from "react";
import Button from "../ui/button";
import Input from "../ui/input";
import Spinner from "../ui/spinner";
import s from "./add-doing.module.scss";

function addDoing(name: string, description: string) {
  return ApiService.Instance.post<DoingEntity>(`doing`, {
    name,
    description,
  });
}

interface AddDoing {
  onDoingAdded: (doing: DoingEntity) => void;
}

const AddDoing: FC<AddDoing> = ({ onDoingAdded }: AddDoing) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [addDoingError, setAddDoingError] = useState("");
  const [isAddDoingLoading, setAddDoingLoading] = useState(false);

  const addDoingHandler = async () => {
    try {
      setAddDoingLoading(true);
      const addedFriend = await addDoing(name, description);
      onDoingAdded(addedFriend);
    } catch (error: any) {
      setAddDoingError(error.message);
    } finally {
      setAddDoingLoading(false);
    }
  };

  return (
    <div className={s["add-doing"]}>
      {isAddDoingLoading ? (
        <Spinner />
      ) : (
        <>
          <div>
            <label>Enter name of your doing</label>
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div>
            <label>Enter description to your doing</label>
            <Input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <Button size="medium" as="button" onClick={addDoingHandler}>
            Add doing
          </Button>
          <div className={s["add-doing__error"]}>{addDoingError}</div>
        </>
      )}
    </div>
  );
};

export default AddDoing;
