/* components */
import SplashScreen from '@/components/@common/SplashScreen';

const SplashHomePage = () => {
  return <SplashScreen text={'홈으로 이동중'} routerPath={'/home'} imgSrc={'home'} />;
};

export default SplashHomePage;
