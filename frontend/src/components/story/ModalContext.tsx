import { ReactNode, createContext, useContext, useState } from 'react';

interface IModalContext {
  isModalOpen: boolean;
  toggleModal: () => void;
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

  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };

  return <ModalContext.Provider value={{ isModalOpen, toggleModal }}>{children}</ModalContext.Provider>;
};
