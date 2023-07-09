import { classNames } from "@shared/utils/class-names";
import {
  InputHTMLAttributes,
  ForwardedRef,
  forwardRef,
  useId,
  ChangeEvent,
  ReactNode,
} from "react";
import s from "./input.module.scss";

interface InputOwnProps {
  fullWidth?: boolean;
  label?: string;
  children?: ReactNode;
  htmlId?: string;
}

type InputProps = InputOwnProps &
  Omit<InputHTMLAttributes<HTMLInputElement>, keyof InputOwnProps>;

const Input = forwardRef<HTMLInputElement, InputProps>(
  (props: InputProps, ref: ForwardedRef<HTMLInputElement>) => {
    const {
      fullWidth = false,
      label,
      children,
      htmlId,
      className,
      ...other
    } = props;
    const id = useId();

    return (
      <div
        className={[
          s.input,
          classNames({
            [s["input_full-width"]]: fullWidth,
          }),
          className,
        ].join(" ")}
      >
        {!!label && (
          <label className={s.input__label} htmlFor={htmlId || id}>
            {label}
          </label>
        )}
        <input
          {...other}
          id={htmlId || id}
          className={s.input__form}
          ref={ref}
        />
        {children}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
