import cn from 'classnames';
import { type ButtonHTMLAttributes, type ReactNode } from 'react';

import styles from './Button.module.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  size?: 'small' | 'large';
  children: ReactNode;
}

export const Button = ({ children, className, variant = 'primary', size, ...props }: ButtonProps) => {
  return (
    <button className={cn(styles.button, styles[variant], size && styles[size], className)} {...props}>
      {children}
    </button>
  );
};
