import { DoingEntity } from "@/core/entities/doing.entity";
import { Paginated } from "@/core/types/paginated";
import { ApiService } from "@/shared/services/api.service";
import { buildQuery } from "@/shared/utils/build-query";
import { FC, useEffect, useState } from "react";
import AddDoing from "../add-doing";
import Button from "../ui/button";
import Modal from "../ui/modal";
import s from "./doing-list.module.scss";

interface DoingListProps {
  userId: number;
}

function fetchDoings(userId: number, page: number) {
  return ApiService.Instance.get<Paginated<DoingEntity>>(
    `/doing?${buildQuery({
      page,
      userId,
    })}`
  );
}

const DoingList: FC<DoingListProps> = (props: DoingListProps) => {
  const { userId } = props;
  const [page, setPage] = useState(0);
  const [doings, setDoings] = useState<DoingEntity[]>([]);

  const [isModal, setModal] = useState(false);

  useEffect(() => {
    reloadDoings();
  }, [userId]);

  const reloadDoings = () => {
    setPage(0);
    fetchDoings(userId, 0).then((data) => setDoings(data.result));
  };

  const addDoingHandler = (doing: DoingEntity) => {
    setDoings((prev) => [...prev, doing]);
  };

  return (
    <>
      <div className={s["doing-list"]}>
        <Button as="button" onClick={() => setModal(!isModal)}>
          Add doing
        </Button>
        {doings.length ? (
          <div>
            {doings.map((doing) => (
              <div key={doing.id}>
                <div>{doing.name}</div>
                <div>{doing.description}</div>
              </div>
            ))}
          </div>
        ) : (
          <div>No doings was found</div>
        )}
      </div>
      <Modal title="Add a good doing" isVisible={isModal} setVisible={setModal}>
        <AddDoing onDoingAdded={addDoingHandler} />
      </Modal>
    </>
  );
};

export default DoingList;
