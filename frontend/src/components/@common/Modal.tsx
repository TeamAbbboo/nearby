import { useState } from 'react';

interface IModalProps {
  width: string;
  onClose?: () => void;
  children: React.ReactNode;
  backgroundColor?: string;
}

const Modal = ({ width, onClose, children, backgroundColor = 'bg-black/60' }: IModalProps) => {
  const [isRendering, setIsRendering] = useState<boolean>(true);

  const handleClose = () => {
    onClose && setIsRendering(false);

    setTimeout(() => {
      onClose && onClose();
    }, 250);
  };

  return (
    <>
      <div
        className={`absolute w-full h-full top-0 left-0 right-0 bottom-0 ${backgroundColor} z-20`}
        onClick={handleClose}
      ></div>
      <div
        className={` absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 ${width}
          ${isRendering ? 'animate-modalOpen' : 'animate-modalClose'}
        `}
      >
        {children}
      </div>
    </>
  );
};

export default Modal;
