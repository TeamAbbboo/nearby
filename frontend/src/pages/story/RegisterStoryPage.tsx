import { useStory } from '@/hooks/story/useStory';
import { dataURLtoFile } from '@/utils/dataURLtoFile';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';

const RegisterStoryPage = () => {
  const navigate = useNavigate();
  const { usePostStoryRegister } = useStory();
  const { mutate: postStory } = usePostStoryRegister();

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [stream, setStream] = useState<MediaStream | null>(null);
  // const [facingMode, setFacingMode] = useState<'environment' | 'user'>('user'); // 카메라 전면, 후면 상태 관리
  const [frontImage, setFrontImage] = useState<string>('');
  const [backImage, setBackImage] = useState<string>('');
  const [captured, setCaptured] = useState<boolean>(false);

  const getMediaPermission = useCallback(async (facingMode: 'environment' | 'user') => {
    try {
      const video = { video: { facingMode: facingMode } };

      const videoStream = await navigator.mediaDevices.getUserMedia(video);
      setStream(videoStream);

      if (videoRef.current) {
        videoRef.current.srcObject = videoStream;
      }
    } catch (err) {
      console.log(err);
    }
  }, []);

  const captureImage = () => {
    const videoElement = videoRef.current;
    const canvasElement = canvasRef.current;

    if (videoElement && canvasElement) {
      canvasRef.current.width = videoElement.videoWidth;
      canvasRef.current.height = videoElement.videoHeight;
      //드로잉 객체를 만든다.
      const context: CanvasRenderingContext2D | null = canvasElement.getContext('2d');

      context!.drawImage(videoElement, 0, 0, canvasElement.width, canvasElement.height); // x좌표, y좌표, 너비, 높이
      //캔버스에 그려진 내용을 URL문자열로 반환해준다.
      const image = canvasElement.toDataURL('image/png');

      setCaptured(true);

      setTimeout(() => {
        if (frontImage) {
          setBackImage(image);
        } else {
          setFrontImage(image);
        }
        setCaptured(false);
      }, 250);
    }

    toggleFacingMode();
  };

  const toggleFacingMode = () => {
    // setFacingMode(facingMode === 'user' ? 'environment' : 'user');
    getMediaPermission('environment');
  };

  const imgRef = useRef<HTMLInputElement>(null);

  const [photos, setPhotos] = useState<File>(); // post로 보낼 이미지 파일 관리
  // 이미지 저장 (갤러리에서 선택)
  const saveImgFile = () => {
    if (imgRef.current && imgRef.current.files) {
      const file: File = imgRef.current.files[0]; // 첫 번째 이미지 파일만 저장

      setPhotos(file);
      console.log(photos);
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onloadend = () => {
        const result: string | null = reader.result as string;
        setBackImage(result);
      };
    }
  };

  const handleRegisterClick = () => {
    const formData = new FormData();

    formData.append('front', dataURLtoFile(frontImage));
    formData.append('rear', dataURLtoFile(backImage));

    postStory(formData);
    navigate(-1);
  };

  useEffect(() => {
    // 아직 media stream이 설정되지 않았다면 호출
    if (!stream) {
      getMediaPermission('user');
    }

    // 페이지 이탈 또는 컴포넌트 언마운트 시 미디어 스트림 정지
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [stream]);

  return (
    <>
      <canvas ref={canvasRef} className="hidden" />

      <div className={`relative w-full h-full ${captured && 'animate-captureEnter'}`}>
        <div className="absolute left-0 right-0 bottom-0 top-0 w-full h-full">
          {backImage && <img src={backImage} className="w-full h-full object-cover" />}
        </div>
        <div className="absolute right-5 bottom-5 bg-black/60 w-28 h-48">
          {frontImage && <img src={frontImage} width={300} height={400} className="w-full h-full object-cover" />}
        </div>

        {frontImage && !backImage && (
          <div className="absolute left-5 bottom-5 z-10">
            <label className="w-14 h-14 bg-black/60 rounded-full flex justify-center items-center" htmlFor="photo">
              <input
                name="photo"
                onChange={saveImgFile}
                ref={imgRef}
                multiple
                type="file"
                accept="image/*"
                id="photo"
                className="hidden w-full h-full cursor-pointer"
              ></input>
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#ffffff" viewBox="0 0 256 256">
                <path d="M216,40H40A16,16,0,0,0,24,56V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40Zm0,16V158.75l-26.07-26.06a16,16,0,0,0-22.63,0l-20,20-44-44a16,16,0,0,0-22.62,0L40,149.37V56ZM40,172l52-52,80,80H40Zm176,28H194.63l-36-36,20-20L216,181.38V200ZM144,100a12,12,0,1,1,12,12A12,12,0,0,1,144,100Z"></path>
              </svg>
            </label>
          </div>
        )}

        <div className="absolute top-0 left-0 w-full">
          <div className="flex justify-between">
            <div
              onClick={() => navigate(-1)}
              className="w-12 h-12 bg-black/60 rounded-full flex justify-center items-center m-3 z-10"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#ffffff" viewBox="0 0 256 256">
                <path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z"></path>
              </svg>
            </div>
            {backImage && (
              <div
                onClick={() => handleRegisterClick()}
                className="w-12 h-12 bg-black/60 rounded-full flex justify-center items-center m-3 z-10"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#ffffff" viewBox="0 0 256 256">
                  <path d="M221.66,133.66l-72,72a8,8,0,0,1-11.32-11.32L196.69,136H40a8,8,0,0,1,0-16H196.69L138.34,61.66a8,8,0,0,1,11.32-11.32l72,72A8,8,0,0,1,221.66,133.66Z"></path>
                </svg>
              </div>
            )}
          </div>
        </div>
        {!stream && <div className="absolute top-0 left-0 right-0 bottom-0 w-full h-full bg-black"></div>}

        <video ref={videoRef} className="w-full h-full object-cover" autoPlay playsInline muted />
        {/* 캡쳐버튼 */}
        {frontImage && backImage ? (
          <></>
        ) : (
          <div onClick={() => captureImage()} className="absolute left-1/2 -translate-x-1/2 bottom-5">
            <div className="w-[60px] h-[60px] border-[5px] border-white rounded-full flex justify-center items-center">
              <div className="w-[50px] h-[50px] bg-[#e34077] rounded-full"></div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default RegisterStoryPage;
