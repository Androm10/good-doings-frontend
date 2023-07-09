import { FC } from "react";
import s from "./spinner.module.scss";

interface SpinnerProps {
  size?: "small" | "default";
}

const Spinner: FC<SpinnerProps> = (props: SpinnerProps) => {
  const { size = "default" } = props;

  return (
    <div className={s["spinner-container"]}>
      <div className={[s.spinner, s[`spinner__size-${size}`]].join(" ")}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

Spinner.displayName = "Spinner";

export default Spinner;
