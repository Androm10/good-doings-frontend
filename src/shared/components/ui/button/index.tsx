import { classNames } from '@shared/utils/class-names';
import { ReactNode, ElementType } from 'react';
import s from './button.module.scss';

interface ButtonOwnProps<T extends keyof JSX.IntrinsicElements = 'button'> {
  fullWidth?: boolean;
  children?: ReactNode;
  size?: 'medium' | 'default';
  round?: boolean;
  as: T;
}
type asTypes<T extends keyof JSX.IntrinsicElements> = JSX.IntrinsicElements[T];

type ButtonProps<T extends keyof JSX.IntrinsicElements> = ButtonOwnProps<T> & Omit<asTypes<T>, keyof ButtonOwnProps<T>>;

function Button<T extends keyof JSX.IntrinsicElements>(props: ButtonProps<T>) {
  const { fullWidth = false, children, size = 'default', round, as, className, ...other } = props;

  const Component = as as ElementType;

  return (
    <Component
      {...other}
      className={[
        classNames({
          [s.button]: true,
          [s['button_full-width']]: fullWidth,
          [s[`button_${size}`]]: true,
          [s['button_round']]: !!round,
        }),
        className,
      ].join(' ')}
    >
      {children}
    </Component>
  );
}

Button.displayName = 'Button';

export default Button;
