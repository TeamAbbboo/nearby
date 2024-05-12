import { postStoryRegister } from '@/services/story/api';
import { useMutation } from '@tanstack/react-query';

export const useStory = () => {
  const usePostStoryRegister = () => {
    return useMutation({
      mutationKey: ['story', 'register'],
      mutationFn: (req: FormData) => postStoryRegister(req),
    });
  };

  return {
    usePostStoryRegister,
  };
};
