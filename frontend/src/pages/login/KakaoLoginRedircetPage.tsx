/* components */
import { useAuth } from '@/hooks/auth/useAuth';
import userStore from '@/stores/userStore';

/* libraries */
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const KakaoLoginRedircet = () => {
  /* Access 토큰 쿼리 스트링으로 조회 */
  const queryParams = new URLSearchParams(location.search);
  const accessToken = queryParams.get('token');

  /* 사용자 정보 가져오기 */
  const { usePostLogin } = useAuth();
  const { mutate: doPostLoginReq } = usePostLogin();
  const navigate = useNavigate();

  const fetchData = async () => {
    if (accessToken) {
      // AccessToken 저장
      localStorage.setItem('ACCESS_TOKEN', accessToken);

      /* 로그인 */
      doPostLoginReq(undefined, {
        onSuccess: res => {
          const { isFamily, nickname, birthday, mood, decoration } = res.data;

          // 사용자 정보 userStore에 저장
          userStore.setState({
            nickname: nickname,
            birthday: birthday,
            mood: mood,
            decoration: decoration,
          });

          // 초대 코드 확인
          const code = localStorage.getItem('SHARE_FAMILY_CODE');

          // 초대 코드 O
          if (code && code.length === 8) {
            // 가족 그룹 존재 O
            if (isFamily) {
              // 초대한 가족 그룹으로 참여 O
              if (window.confirm('이미 가족이 존재합니다. 초대받은 가족으로 떠나시겠습니까?')) {
                // window.location.replace('/group');
              }
              // 초대한 가족 그룹으로 참여 X
              else {
                localStorage.removeItem('SHARE_FAMILY_CODE');
                window.location.replace(`${import.meta.env.BASE_URL}`);
              }
            }
            // 가족 그룹 존재 X (AND) 초대한 가족 그룹으로 참여 O (AND) 회원가입 O
            else if (nickname && birthday) {
              window.location.replace('/group');
            }
            // 초대한 가족 그룹으로 참여 O (AND) 회원가입 X
            else {
              window.location.replace('/signup');
            }
          }
          // 초대 코드 X
          else {
            // 회원가입 O (OR) 가족 그룹 존재 O
            if ((nickname && birthday) || isFamily) window.location.replace(`${import.meta.env.BASE_URL}`);
            // 회원가입 X (AND) 가족 그룹 존재 X
            else window.location.replace('/register');
          }
        },
        onError: error => {
          console.log('KakaoLoginRedirectPage Error : ' + error);
          navigate('/login');
        },
      });
    } else {
      console.log('KakaoLoginRedirectPage Error : [서버에러] AccessToken이 존재하지 않음.');
      navigate('/login');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center relative bg-LOGIN bg-cover">
      <div role="status">
        <svg
          aria-hidden="true"
          className="inline w-16 h-16 text-gray-200 animate-spin dark:text-gray-600 fill-MAIN1"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default KakaoLoginRedircet;
