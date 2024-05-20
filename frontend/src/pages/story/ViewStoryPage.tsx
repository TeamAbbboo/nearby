import Story from '@/components/story/Story';
import { useLocation } from 'react-router-dom';

interface IRouteState {
  state: {
    year?: number;
    month?: number;
    day?: number;
    isSaved: boolean;
  };
}

const ViewStoryPage = () => {
  const {
    state: { isSaved, year, month, day },
  } = useLocation() as IRouteState;

  return (
    <div className="relative w-full h-full bg-white">
      <Story year={year} month={month} day={day} isSaved={isSaved} />
    </div>
  );
};

export default ViewStoryPage;
