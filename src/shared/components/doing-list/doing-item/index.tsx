import { DoingEntity } from "@/core/entities/doing.entity";
import { FC } from "react";
import s from "./doing-item.module.scss";

interface DoingItemProps {
  doing: DoingEntity;
}

const DoingItem: FC<DoingItemProps> = ({ doing }: DoingItemProps) => {
  return (
    <div className={s["doing-item"]}>
      <div className={s["doing-item__name"]}>
        <label className={s["doing-item__label"]}>Name:</label>
        {doing.name}
      </div>
      <div className={s["doing-item__description"]}>
        <label className={s["doing-item__label"]}>Description:</label>
        {doing.description}
      </div>
    </div>
  );
};

export default DoingItem;
