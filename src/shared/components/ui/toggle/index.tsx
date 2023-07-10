import { InputHTMLAttributes, ForwardedRef, forwardRef, useId, ChangeEvent, memo } from 'react';
import s from './toggle.module.scss';

interface ToggleOwnProps {
  text?: string;
  checked?: boolean;

  onChange?: any;
}

type ToggleProps = ToggleOwnProps & Omit<InputHTMLAttributes<HTMLInputElement>, keyof ToggleOwnProps>;

const Toggle = forwardRef<HTMLInputElement, ToggleProps>((props: ToggleProps, ref: ForwardedRef<HTMLInputElement>) => {
  const { text, checked, onChange, ...other } = props;
  const toggleId = useId();

  return (
    <div className={s.toggle}>
      <label htmlFor={toggleId} className={s.toggle__label}>
        {text}
      </label>
      <label className={s.toggle__switch}>
        <input
          id={toggleId}
          className={s.toggle__input}
          type="checkbox"
          onChange={(e) => onChange(e)}
          checked={checked}
        />
        <span className={s.toggle__slider} />
      </label>
    </div>
  );
});

Toggle.displayName = 'Toggle';

export default memo(Toggle);
