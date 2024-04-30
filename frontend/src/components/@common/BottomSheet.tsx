import { useState } from 'react';

interface IBottomSheetProps {
  height?: string;
  onClose: () => void;
  children: React.ReactNode;
}

const BottomSheet = ({ height, onClose, children }: IBottomSheetProps) => {
  const [isRendering, setIsRendering] = useState<boolean>(true);

  const handleClose = () => {
    setIsRendering(false);

    setTimeout(() => {
      onClose();
    }, 250);
  };

  return (
    <>
      <div
        className={`absolute w-full h-full top-0 left-0 right-0 bottom-0 z-20 ${isRendering && 'bg-black/30'}`}
        onClick={handleClose}
      ></div>
      <div
        className={`w-full absolute bottom-0 rounded-t-[2.2rem] z-20 bg-white ${isRendering ? 'animate-sheetOn' : 'animate-sheetOff'}`}
      >
        <div
          className={`w-full ${height}`}
          onClick={e => {
            e.stopPropagation();
          }}
        >
          <div className="flex justify-center items-center h-12">
            <div className="w-20 bg-[#D9D9D9] h-1"></div>
          </div>
          {children}
        </div>
      </div>
    </>
  );
};

export default BottomSheet;
