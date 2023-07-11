import { DoingEntity } from "@/core/entities/doing.entity";
import { Paginated } from "@/core/types/paginated";
import { useScroll } from "@/shared/hooks/use-scroll";
import { useUser } from "@/shared/hooks/use-user.hook";
import { ApiService } from "@/shared/services/api.service";
import { buildQuery } from "@/shared/utils/build-query";
import { FC, useEffect, useRef, useState } from "react";
import AddDoing from "../add-doing";
import CrossSvg from "../svg/cross-svg";
import PenSvg from "../svg/pen-svg";
import Button from "../ui/button";
import Input from "../ui/input";
import Modal from "../ui/modal";
import Spinner from "../ui/spinner";
import DoingItem from "./doing-item";
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

function deleteDoing(doingId: number) {
  return ApiService.Instance.delete<boolean>(`/doing/${doingId}`);
}

function updateDoing(
  doingId: number,
  data: { name?: string; description?: string }
) {
  return ApiService.Instance.put<DoingEntity>(`/doing/${doingId}`, data);
}

const DoingList: FC<DoingListProps> = (props: DoingListProps) => {
  const { userId } = props;
  const { user } = useUser();
  const [doings, setDoings] = useState<DoingEntity[]>([]);

  const [isModal, setModal] = useState(false);
  const [isUpdateModal, setUpdateModal] = useState(false);
  const [updateDoingId, setUpdateDoingId] = useState<number>();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const listRef = useRef<HTMLDivElement>(null);

  const { reloadPages, isLoading } = useScroll(
    listRef,
    2,
    fetchDoings.bind(this, userId),
    setDoings
  );

  useEffect(() => {
    reloadPages();
  }, [userId]);

  const addDoingHandler = (doing: DoingEntity) => {
    setDoings((prev) => [...prev, doing]);
    setModal(false);
  };

  const deleteDoingHandler = async (doingId: number) => {
    try {
      const result = await deleteDoing(doingId);
      if (result) {
        setDoings((prev) => {
          prev.splice(
            prev.findIndex((doing) => doing.id === doingId),
            1
          );
          return [...prev];
        });
      }
    } catch (error) {
      alert("Delete error");
    }
  };

  const startEditHandler = (doingId: number) => {
    const doing = doings.find((d) => d.id === doingId);
    if (!doing) return;

    setDescription(doing.description);
    setName(doing.name);
    setUpdateModal(true);
    setUpdateDoingId(doingId);
  };

  const editDoingHandler = async (doingId?: number) => {
    if (!doingId) return;

    try {
      const result = await updateDoing(doingId, { description, name });
      if (result) {
        setDoings((prev) => {
          prev.splice(
            prev.findIndex((doing) => doing.id === doingId),
            1,
            result
          );
          return [...prev];
        });
      }
    } catch (error) {
      alert("Edit error");
    } finally {
      setUpdateModal(false);
      setUpdateDoingId(undefined);
    }
  };

  return (
    <>
      <div className={s["doing-list"]} ref={listRef}>
        {!!user && userId == user.id && (
          <Button as="button" onClick={() => setModal(!isModal)}>
            Add doing
          </Button>
        )}
        {doings.length ? (
          <>
            {doings.map((doing) => (
              <div key={doing.id} className={s["doing-list__item"]}>
                <DoingItem doing={doing} />
                {!!user && userId == user.id && (
                  <div className={s["doing-list__actions"]}>
                    <Button
                      as="button"
                      round
                      onClick={() => deleteDoingHandler(doing.id)}
                    >
                      <CrossSvg />
                    </Button>
                    <Button
                      as="button"
                      round
                      onClick={() => startEditHandler(doing.id)}
                    >
                      <PenSvg />
                    </Button>
                  </div>
                )}
                {isLoading && <Spinner />}
              </div>
            ))}
          </>
        ) : (
          <div>No doings was found</div>
        )}
      </div>
      <Modal title="Add a good doing" isVisible={isModal} setVisible={setModal}>
        <AddDoing onDoingAdded={addDoingHandler} />
      </Modal>
      <Modal
        title="Update doing"
        isVisible={isUpdateModal}
        setVisible={setUpdateModal}
      >
        <div>
          <label>Name</label>
          <Input value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label>Description</label>
          <Input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <Button as="button" onClick={() => editDoingHandler(updateDoingId)}>
          Update
        </Button>
      </Modal>
    </>
  );
};

export default DoingList;
