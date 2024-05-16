/* components */
import SplashScreen from '@/components/@common/SplashScreen';

const SplashPlaygroundPage = () => {
  return <SplashScreen text={'마이 페이지로 이동중'} routerPath={'/my'} imgSrc={'playground'} />;
};

export default SplashPlaygroundPage;
