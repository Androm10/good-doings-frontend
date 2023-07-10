import { FC, memo, MouseEvent, ReactNode } from "react";
import ReactDOM from "react-dom";
import { classNames } from "@shared/utils/class-names";
import s from "./modal.module.scss";

interface ModalProps {
  title?: string;
  isVisible: boolean;
  setVisible: (value: boolean) => void;
  children: ReactNode;
}

const Modal: FC<ModalProps> = memo((props: ModalProps) => {
  const { title, children, isVisible, setVisible } = props;

  const clickHandler = (event?: MouseEvent) => {
    setVisible(false);
  };

  return ReactDOM.createPortal(
    <div
      className={[
        s.modal,
        classNames({
          [s.modal_hidden]: !isVisible,
        }),
      ].join(" ")}
      onClick={clickHandler}
    >
      <div className={s.modal__body} onClick={(e) => e.stopPropagation()}>
        {title ? (
          <div className={s.modal__title}>
            <label>{title}</label>
          </div>
        ) : (
          <></>
        )}
        <div className={s.modal__content}>{children}</div>
      </div>
    </div>,
    document.body
  );
});

Modal.displayName = "Modal";

export default Modal;
