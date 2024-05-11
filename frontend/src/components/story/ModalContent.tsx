import { useModal } from '@/components/story/ModalContext';
import Story from '@/components/story/Story';

const ModalContent = () => {
  const { isModalOpen, isSaved } = useModal();

  return <>{isModalOpen && <Story isSaved={isSaved} />}</>;
};

export default ModalContent;
