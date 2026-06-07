import classNames from 'classnames';
import { type LinkProps } from 'next/link';
import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  CSSProperties,
  ReactNode,
} from 'react';
import { TransitionLink } from './TransitionLink';

type ButtonVariant = 'primary' | 'secondary' | 'accent' | 'surface' | 'unstyled';
type ButtonSize = 'md' | 'lg';

interface ButtonClassNameProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  className?: string;
}

const baseButtonClasses =
  'inline-flex items-center justify-center font-semibold transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blueSecondary focus-visible:ring-offset-2 focus-visible:ring-offset-darkPrimary disabled:cursor-not-allowed';

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'border-2 border-blueSecondary bg-blueSecondary text-darkPrimary hover:bg-bluePrimary/50 hover:text-white/90',
  secondary:
    'border-2 border-blueSecondary text-white/90 hover:bg-blueSecondary hover:text-darkPrimary',
  accent: 'bg-blueSecondary text-darkPrimary hover:opacity-90 transition-opacity',
  surface: 'bg-darkPrimary text-white hover:bg-darkSecondary',
  unstyled: '',
};

const sizeClasses: Record<ButtonSize, string> = {
  md: 'px-5 py-2',
  lg: 'h-14 px-6 text-lg',
};

export const getButtonClassName = ({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className,
}: ButtonClassNameProps = {}) =>
  classNames(
    baseButtonClasses,
    variantClasses[variant],
    sizeClasses[size],
    fullWidth && 'w-full',
    className
  );

type NativeButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  href?: never;
};

type LinkButtonProps = LinkProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> & {
    href: LinkProps['href'];
  };

type ButtonProps = ButtonClassNameProps &
  (NativeButtonProps | LinkButtonProps) & {
    children: ReactNode;
    style?: CSSProperties;
  };

export const Button: React.FC<ButtonProps> = ({
  children,
  className,
  fullWidth,
  size,
  variant,
  ...props
}) => {
  const resolvedClassName = getButtonClassName({ variant, size, fullWidth, className });

  if ('href' in props && props.href) {
    const linkProps = props as LinkButtonProps;

    return (
      <TransitionLink {...linkProps} className={resolvedClassName}>
        {children}
      </TransitionLink>
    );
  }

  const buttonProps = props as NativeButtonProps;

  return (
    <button {...buttonProps} className={resolvedClassName}>
      {children}
    </button>
  );
};
