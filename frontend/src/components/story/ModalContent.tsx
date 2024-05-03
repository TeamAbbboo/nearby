import { useModal } from '@/components/story/ModalContext';
import Story from '@/components/story/Story';

const ModalContent = () => {
  const { isModalOpen } = useModal();

  return <>{isModalOpen && <Story />}</>;
};

export default ModalContent;
