import { ReactNode, createContext, useContext, useState } from 'react';

interface IModalContext {
  isModalOpen: boolean;
  isSaved: boolean;
  toggleModal: () => void;
  setIsSaved: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalContext = createContext<IModalContext | undefined>(undefined);

export const useModal = (): IModalContext => {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};

interface IModalProviderProps {
  children: ReactNode;
}

export const ModalProvider: React.FC<IModalProviderProps> = ({ children }: IModalProviderProps) => {
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [isSaved, setIsSaved] = useState<boolean>(false);

  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };

  return (
    <ModalContext.Provider value={{ isModalOpen, toggleModal, isSaved, setIsSaved }}>{children}</ModalContext.Provider>
  );
};
