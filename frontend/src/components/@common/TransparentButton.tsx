import { ButtonHTMLAttributes, PropsWithChildren } from 'react';

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  width?: string;
  height?: string;
  text?: string;
  rounded?: string;
  shadow?: string;
}

const TransparentButton = ({
  width = 'w-16',
  height = 'h-16',
  text,
  rounded,
  shadow,
  children,
  ...props
}: PropsWithChildren<IButtonProps>) => {
  return (
    <button
      className={`text-center font-bold ${width} ${height} ${rounded} ${shadow} bg-white/40 text-black `}
      {...props}
    >
      {text}
      {children}
    </button>
  );
};

export default TransparentButton;
